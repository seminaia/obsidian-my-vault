"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => GoodnotesWorkflowPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian5 = require("obsidian");

// src/core/paths.ts
var SUPPORTED_EXTENSIONS = /* @__PURE__ */ new Set(["pdf", "png", "jpg", "jpeg"]);
function extensionOf(path) {
  const name = path.split("/").at(-1) ?? "";
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
}
function isSupportedExport(path) {
  return SUPPORTED_EXTENSIONS.has(extensionOf(path));
}
function basenameWithoutExtension(path) {
  const name = path.split("/").at(-1) ?? path;
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(0, dot) : name;
}
function sanitizeSegment(value, fallback = "Handwriting") {
  const sanitized = value.replace(/[\\/:*?"<>|\u0000-\u001f]/g, " ").replace(/\s+/g, " ").trim().replace(/[. ]+$/g, "");
  return sanitized || fallback;
}
function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function buildBaseName(captured, artifact, context) {
  return `${captured} \u2014 ${sanitizeSegment(artifact)} \u2014 ${sanitizeSegment(context)}`;
}
function inferDestination(sourcePath, exportPath, settings) {
  const sourceParts = sourcePath.split("/");
  const extension = extensionOf(exportPath);
  const image = extension === "png" || extension === "jpg" || extension === "jpeg";
  const mappings = [
    [settings.projectsFolder, "project"],
    [settings.areasFolder, "area"],
    [settings.resourcesFolder, "resource"]
  ];
  for (const [root, para] of mappings) {
    if (sourceParts[0] !== root) continue;
    const rawContext = sourceParts[1] ?? basenameWithoutExtension(sourcePath);
    const context = sanitizeSegment(basenameWithoutExtension(rawContext));
    const entityRoot = sourceParts.length >= 3 ? `${root}/${rawContext}` : `${root}/${context}`;
    const projectNote = para !== "project" ? null : sourceParts.length >= 3 ? `${entityRoot}/00. ${context}.md` : sourcePath;
    return {
      directory: image ? `${entityRoot}/screens` : `${entityRoot}/Goodnotes/exports`,
      para,
      context,
      projectNote
    };
  }
  return {
    directory: settings.inboxFolder,
    para: "inbox",
    context: sanitizeSegment(basenameWithoutExtension(sourcePath)),
    projectNote: null
  };
}
function chooseUniquePaths(directory, baseName, extension, occupiedPaths) {
  for (let version = 1; version < 1e4; version += 1) {
    const suffix = version === 1 ? "" : ` \u2014 v${String(version).padStart(2, "0")}`;
    const candidateBase = `${directory}/${baseName}${suffix}`;
    const attachmentPath = `${candidateBase}.${extension}`;
    const sidecarPath = `${candidateBase}.md`;
    if (!occupiedPaths.has(attachmentPath) && !occupiedPaths.has(sidecarPath)) {
      return { attachmentPath, sidecarPath };
    }
  }
  throw new Error("Unable to allocate a unique export name");
}

// src/core/edit.ts
function binaryHash(content) {
  let hash = 2166136261;
  for (const byte of new Uint8Array(content)) {
    hash ^= byte;
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}
function normalizeGoodnotesSourceLink(value) {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    if (host !== "goodnotes.com" && !host.endsWith(".goodnotes.com")) return null;
    return url.toString();
  } catch {
    return null;
  }
}
function readSidecarProvenance(content) {
  return {
    sourceLink: readYamlString(content, "source_link"),
    artifactPath: readYamlString(content, "artifact_path"),
    artifactHash: readYamlString(content, "artifact_hash")
  };
}
function updateSidecarAfterEdit(content, metadata) {
  const lines = content.split("\n");
  if (lines[0] !== "---") throw new Error("Sidecar frontmatter is missing");
  const closingIndex = lines.indexOf("---", 1);
  if (closingIndex < 0) throw new Error("Sidecar frontmatter is not closed");
  const fields = /* @__PURE__ */ new Map([
    ["source_link", JSON.stringify(metadata.sourceLink)],
    ["artifact_path", JSON.stringify(metadata.artifactPath)],
    ["artifact_hash", JSON.stringify(metadata.artifactHash)],
    ["edited_at", metadata.editedAt]
  ]);
  for (let index = 1; index < closingIndex; index += 1) {
    const match = /^([a-z_]+):/.exec(lines[index] ?? "");
    const replacement = match === null ? void 0 : fields.get(match[1] ?? "");
    if (replacement !== void 0 && match !== null) {
      lines[index] = `${match[1]}: ${replacement}`;
      fields.delete(match[1] ?? "");
    }
  }
  lines.splice(closingIndex, 0, ...Array.from(fields, ([key, value]) => `${key}: ${value}`));
  return lines.join("\n");
}
function readYamlString(content, field) {
  const match = new RegExp(`^${field}:\\s*(.+)$`, "m").exec(content);
  if (match === null || match[1] === void 0 || match[1].trim() === "null") return null;
  try {
    const value = JSON.parse(match[1]);
    return typeof value === "string" && value.length > 0 ? value : null;
  } catch {
    return null;
  }
}

// src/core/sidecar.ts
function yamlString(value) {
  return JSON.stringify(value);
}
function buildSidecar(input) {
  const projectLine = input.projectNote ? `project: ${yamlString(`[[${input.projectNote.replace(/\.md$/i, "")}]]`)}
` : "";
  return `---
type: handwriting
source_app: Goodnotes
artifact_kind: ${yamlString(input.artifact.toLowerCase())}
para: ${input.para}
${projectLine}source_note: ${yamlString(`[[${input.sourceNote.replace(/\.md$/i, "")}]]`)}
source_link: ${input.sourceLink === null ? "null" : yamlString(input.sourceLink)}
artifact_path: ${yamlString(input.attachmentPath)}
artifact_hash: ${yamlString(input.attachmentHash)}
captured: ${input.captured}
status: processed
---

# ${input.title}

${input.attachmentLink}

## Summary


## Next actions

`;
}

// src/core/shortcut.ts
function buildShortcutUrl(shortcutName, capture) {
  const payload = JSON.stringify({
    captureId: capture.id,
    sourcePath: capture.sourcePath,
    title: capture.title,
    preferredFormat: capture.preferredFormat
  });
  return `shortcuts://run-shortcut?name=${encodeURIComponent(shortcutName)}&input=text&text=${encodeURIComponent(payload)}`;
}

// src/core/text.ts
function contentHash(content) {
  let hash = 2166136261;
  for (let index = 0; index < content.length; index += 1) {
    hash ^= content.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}
function insertAt(content, offset, block) {
  const safeOffset = Math.max(0, Math.min(offset, content.length));
  const before = content.slice(0, safeOffset);
  const after = content.slice(safeOffset);
  const prefix = before.length > 0 && !before.endsWith("\n") ? "\n" : "";
  const suffix = after.length > 0 && !after.startsWith("\n") ? "\n" : "";
  return `${before}${prefix}${block.trim()}${suffix}${after}`;
}
function appendBlock(content, block) {
  if (content.length === 0) return `${block.trim()}
`;
  return `${content.replace(/\s*$/, "")}

${block.trim()}
`;
}

// src/i18n.ts
var import_obsidian = require("obsidian");
var en = {
  ribbonStart: "Start Goodnotes handwriting",
  commandStart: "Start handwriting capture",
  commandResume: "Return to Goodnotes",
  commandFinish: "Finish handwriting capture",
  commandAbandon: "Abandon handwriting capture",
  commandEdit: "Edit saved artifact in Goodnotes",
  commandResumeEdit: "Return to editing in Goodnotes",
  commandFinishEdit: "Replace edited artifact",
  commandAbandonEdit: "Abandon artifact editing",
  settingInbox: "Inbox folder",
  settingInboxDesc: "Goodnotes exports (PDF, PNG, JPEG) arrive here before review.",
  settingProjects: "Projects folder",
  settingProjectsDesc: "Root folder for projects (PARA).",
  settingAreas: "Areas folder",
  settingAreasDesc: "Root folder for areas (PARA).",
  settingResources: "Resources folder",
  settingResourcesDesc: "Root folder for resources (PARA).",
  settingArchives: "Archives folder",
  settingArchivesDesc: "Root folder for archives (PARA).",
  settingShortcut: "Start shortcut name",
  settingShortcutDesc: "Apple Shortcut that runs when a handwriting session starts.",
  noticeExportDetected: "Goodnotes export detected. Opening preview\u2026",
  noticeFinishEditFirst: "Finish or abandon the current artifact edit first.",
  noticeOpenMarkdown: "Open a Markdown note before starting handwriting capture.",
  noticeInboxFailed: (error) => `Could not prepare the Inbox folder: ${error}`,
  noticeSessionSaveFailed: (error) => `Could not save the handwriting session: ${error}`,
  noticeShortcutMissing: "Set the Apple Shortcut name in the plugin settings.",
  noticeCaptureAbandoned: "Handwriting session abandoned. Inbox files were kept.",
  noticeFinishCaptureFirst: "Finish or abandon the current handwriting session first.",
  noticeEditActive: "An edit is already active. Use the return or replace command.",
  noticeInvalidLink: "Enter a valid HTTPS Goodnotes link.",
  noticeEditSaveFailed: (error) => `Could not save the edit session: ${error}`,
  noticeEditAbandoned: "Editing abandoned. The artifact and Inbox files were kept.",
  noticeNoEdit: "No active Goodnotes edit.",
  noticeEditTargetMissing: "The linked artifact or sidecar was not found. The edit session was kept.",
  pickReplacement: "Choose the new export that fully replaces the current file",
  noticeNoReplacement: "No new export with a matching format was found in the Inbox.",
  noticeFormatMismatch: "The new export must use the same format as the current file.",
  noticeSidecarChanged: "The sidecar changed after editing started. Replacement stopped.",
  noticeReplaceFailed: (error) => `Could not replace the export: ${error}`,
  noticeReplaced: (path) => `Goodnotes export replaced: ${path}`,
  noticeReplacedStateFailed: (error) => `Export replaced, but plugin state was not saved: ${error}. Check the Inbox before retrying.`,
  noticeOpenArtifact: "Open a saved export, its sidecar, or a note that embeds it.",
  noticeNoSidecar: "No Markdown sidecar was found for the selected file.",
  pickArtifact: "Choose a saved Goodnotes artifact",
  noticeNoArtifact: "No linked Goodnotes artifact was found in the current note.",
  noticeNoCapture: "No active handwriting session.",
  noticeSourceMissing: "The source note was not found. The session was kept for manual recovery.",
  noticeNoExport: "No PDF, PNG, or JPEG export was found in the Inbox.",
  noticeSourceChanged: "The source note changed after preview. Run finish again.",
  noticeSourceInactive: "The source note is no longer active. Choose another insertion point.",
  noticeCaptureFailed: (error) => `Could not finish the handwriting session: ${error}`,
  noticeCaptureSaved: (path) => `Handwriting export saved: ${path}`,
  noticeCaptureStateFailed: (error) => `Export saved, but plugin state was not saved: ${error}. Check the Inbox before retrying.`,
  pickExport: "Choose a Goodnotes export to review",
  startTitle: "Start handwriting capture",
  sourceNote: (path) => `Source note: ${path}`,
  exportPath: (path) => `Export: ${path}`,
  title: "Title",
  preferredExport: "Preferred export",
  formatPng: "PNG \u2014 a single visual idea",
  formatPdf: "PDF \u2014 full context",
  formatJpeg: "JPEG \u2014 photographic material",
  cancel: "Cancel",
  start: "Start",
  close: "Close",
  existingTitle: "A handwriting session is already active",
  abandonSessionEllipsis: "Abandon session\u2026",
  finish: "Finish",
  returnToGoodnotes: "Return to Goodnotes",
  abandonCaptureTitle: "Abandon handwriting session?",
  abandonCaptureBody: "Only the pending session record is removed. Exported files stay in the Inbox.",
  keepSession: "Keep session",
  abandonSession: "Abandon session",
  finishTitle: "Finish handwriting capture",
  noteChangedWarning: "The source note changed while Goodnotes was open. Choose the insertion point explicitly.",
  artifactType: "Artifact type",
  context: "Context",
  sourceLink: "Goodnotes source link",
  sourceLinkDesc: "Optional. On Goodnotes Essential, anyone with a share link can open the document.",
  insertion: "Insert into source note",
  insertionSavedCursor: "Saved cursor position",
  insertionCurrentCursor: "Current cursor position",
  insertionEnd: "End of note",
  insertionSidecarOnly: "Sidecar only",
  confirm: "Confirm",
  linkTitle: "Link the Goodnotes original",
  linkWarning: "Goodnotes Essential creates a public share link: anyone who has the URL can access the document.",
  shareLink: "Goodnotes share link",
  shareLinkPlaceholder: "Paste a Goodnotes share link",
  openOriginal: "Open original",
  replaceTitle: "Replace Goodnotes export?",
  currentFile: (path) => `Current file: ${path}`,
  newExport: (path) => `New export: ${path}`,
  replaceWarning: "After confirmation the current file is fully replaced. No permanent copy of the previous version is kept.",
  replace: "Replace",
  abandonEditTitle: "Abandon Goodnotes editing?",
  abandonEditBody: "Only the pending edit record is removed. The current artifact and Inbox files stay unchanged."
};
var ru = {
  ribbonStart: "\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u044B\u0439 \u0432\u0432\u043E\u0434 \u0432 Goodnotes",
  commandStart: "\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u044B\u0439 \u0432\u0432\u043E\u0434",
  commandResume: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 Goodnotes",
  commandFinish: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u044B\u0439 \u0432\u0432\u043E\u0434",
  commandAbandon: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u0443\u044E \u0441\u0435\u0441\u0441\u0438\u044E",
  commandEdit: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u0444\u0430\u0439\u043B \u0432 Goodnotes",
  commandResumeEdit: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E \u0432 Goodnotes",
  commandFinishEdit: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u043E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0444\u0430\u0439\u043B",
  commandAbandonEdit: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
  settingInbox: "\u041F\u0430\u043F\u043A\u0430 Inbox",
  settingInboxDesc: "\u0421\u044E\u0434\u0430 \u043F\u043E\u0441\u0442\u0443\u043F\u0430\u044E\u0442 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u044B Goodnotes (PDF, PNG, JPEG) \u0434\u043E review.",
  settingProjects: "\u041F\u0430\u043F\u043A\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432",
  settingProjectsDesc: "\u041A\u043E\u0440\u043D\u0435\u0432\u0430\u044F PARA-\u043F\u0430\u043F\u043A\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432.",
  settingAreas: "\u041F\u0430\u043F\u043A\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0435\u0439",
  settingAreasDesc: "\u041A\u043E\u0440\u043D\u0435\u0432\u0430\u044F PARA-\u043F\u0430\u043F\u043A\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0435\u0439.",
  settingResources: "\u041F\u0430\u043F\u043A\u0430 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432",
  settingResourcesDesc: "\u041A\u043E\u0440\u043D\u0435\u0432\u0430\u044F PARA-\u043F\u0430\u043F\u043A\u0430 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432.",
  settingArchives: "\u041F\u0430\u043F\u043A\u0430 \u0430\u0440\u0445\u0438\u0432\u0430",
  settingArchivesDesc: "\u041A\u043E\u0440\u043D\u0435\u0432\u0430\u044F PARA-\u043F\u0430\u043F\u043A\u0430 \u0430\u0440\u0445\u0438\u0432\u0430.",
  settingShortcut: "\u0418\u043C\u044F \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0433\u043E Shortcut",
  settingShortcutDesc: "Apple Shortcut, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u043D\u0430\u0447\u0430\u043B\u0435 \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u043E\u0439 \u0441\u0435\u0441\u0441\u0438\u0438.",
  noticeExportDetected: "\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D \u044D\u043A\u0441\u043F\u043E\u0440\u0442 Goodnotes. \u041E\u0442\u043A\u0440\u044B\u0432\u0430\u044E preview\u2026",
  noticeFinishEditFirst: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u0435 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430.",
  noticeOpenMarkdown: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 Markdown-\u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u043E\u0433\u043E \u0432\u0432\u043E\u0434\u0430.",
  noticeInboxFailed: (error) => `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u0442\u044C Inbox: ${error}`,
  noticeSessionSaveFailed: (error) => `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u0443\u044E \u0441\u0435\u0441\u0441\u0438\u044E: ${error}`,
  noticeShortcutMissing: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u043C\u044F Apple Shortcut \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u0430.",
  noticeCaptureAbandoned: "\u0420\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430. \u0424\u0430\u0439\u043B\u044B \u0432 Inbox \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B.",
  noticeFinishCaptureFirst: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u0435 \u0442\u0435\u043A\u0443\u0449\u0443\u044E \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u0443\u044E \u0441\u0435\u0441\u0441\u0438\u044E.",
  noticeEditActive: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0443\u0436\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0443 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430 \u0438\u043B\u0438 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F.",
  noticeInvalidLink: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0443\u044E HTTPS-\u0441\u0441\u044B\u043B\u043A\u0443 Goodnotes.",
  noticeEditSaveFailed: (error) => `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C edit-\u0441\u0435\u0441\u0441\u0438\u044E: ${error}`,
  noticeEditAbandoned: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u043E. \u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u0438 \u0444\u0430\u0439\u043B\u044B Inbox \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B.",
  noticeNoEdit: "\u041D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F Goodnotes.",
  noticeEditTargetMissing: "\u0421\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0439 \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u0438\u043B\u0438 sidecar \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D. Edit-\u0441\u0435\u0441\u0441\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430.",
  pickReplacement: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u044D\u043A\u0441\u043F\u043E\u0440\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0437\u0430\u043C\u0435\u043D\u0438\u0442 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0444\u0430\u0439\u043B",
  noticeNoReplacement: "\u0412 Inbox \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u043D\u043E\u0432\u044B\u0439 \u044D\u043A\u0441\u043F\u043E\u0440\u0442 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0435\u0433\u043E \u0444\u043E\u0440\u043C\u0430\u0442\u0430.",
  noticeFormatMismatch: "\u041D\u043E\u0432\u044B\u0439 \u044D\u043A\u0441\u043F\u043E\u0440\u0442 \u0434\u043E\u043B\u0436\u0435\u043D \u0438\u043C\u0435\u0442\u044C \u0442\u043E\u0442 \u0436\u0435 \u0444\u043E\u0440\u043C\u0430\u0442, \u0447\u0442\u043E \u0438 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0444\u0430\u0439\u043B.",
  noticeSidecarChanged: "Sidecar \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043D\u0430\u0447\u0430\u043B\u0430 edit-\u0441\u0435\u0441\u0441\u0438\u0438. \u0417\u0430\u043C\u0435\u043D\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430.",
  noticeReplaceFailed: (error) => `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u044D\u043A\u0441\u043F\u043E\u0440\u0442: ${error}`,
  noticeReplaced: (path) => `\u042D\u043A\u0441\u043F\u043E\u0440\u0442 Goodnotes \u0437\u0430\u043C\u0435\u043D\u0451\u043D: ${path}`,
  noticeReplacedStateFailed: (error) => `\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0437\u0430\u043C\u0435\u043D\u0451\u043D, \u043D\u043E \u0441\u043B\u0443\u0436\u0435\u0431\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043D\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E: ${error}. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 Inbox \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043E\u043C.`,
  noticeOpenArtifact: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u044D\u043A\u0441\u043F\u043E\u0440\u0442, \u0435\u0433\u043E sidecar \u0438\u043B\u0438 \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u0441 embed.",
  noticeNoSidecar: "\u0414\u043B\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D Markdown-sidecar.",
  pickArtifact: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442 Goodnotes",
  noticeNoArtifact: "\u0412 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0437\u0430\u043C\u0435\u0442\u043A\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0439 \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442 Goodnotes.",
  noticeNoCapture: "\u041D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0439 \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u043E\u0439 \u0441\u0435\u0441\u0441\u0438\u0438.",
  noticeSourceMissing: "\u0418\u0441\u0445\u043E\u0434\u043D\u0430\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430. \u0421\u0435\u0441\u0441\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u0434\u043B\u044F \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F.",
  noticeNoExport: "\u0412 Inbox \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u044D\u043A\u0441\u043F\u043E\u0440\u0442 PDF/PNG/JPEG.",
  noticeSourceChanged: "\u0418\u0441\u0445\u043E\u0434\u043D\u0430\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C \u043F\u043E\u0441\u043B\u0435 preview. \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.",
  noticeSourceInactive: "\u0418\u0441\u0445\u043E\u0434\u043D\u0430\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u0430. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0435 \u043C\u0435\u0441\u0442\u043E \u0432\u0441\u0442\u0430\u0432\u043A\u0438.",
  noticeCaptureFailed: (error) => `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u0443\u044E \u0441\u0435\u0441\u0441\u0438\u044E: ${error}`,
  noticeCaptureSaved: (path) => `\u0420\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u044B\u0439 \u044D\u043A\u0441\u043F\u043E\u0440\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D: ${path}`,
  noticeCaptureStateFailed: (error) => `\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D, \u043D\u043E \u0441\u043B\u0443\u0436\u0435\u0431\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043D\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E: ${error}. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 Inbox \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043E\u043C.`,
  pickExport: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u044D\u043A\u0441\u043F\u043E\u0440\u0442 Goodnotes \u0434\u043B\u044F review",
  startTitle: "\u041D\u0430\u0447\u0430\u0442\u044C \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u044B\u0439 \u0432\u0432\u043E\u0434",
  sourceNote: (path) => `\u0418\u0441\u0445\u043E\u0434\u043D\u0430\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430: ${path}`,
  exportPath: (path) => `\u042D\u043A\u0441\u043F\u043E\u0440\u0442: ${path}`,
  title: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
  preferredExport: "\u041F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u044D\u043A\u0441\u043F\u043E\u0440\u0442",
  formatPng: "PNG \u2014 \u043E\u0434\u043D\u0430 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u043C\u044B\u0441\u043B\u044C",
  formatPdf: "PDF \u2014 \u043F\u043E\u043B\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442",
  formatJpeg: "JPEG \u2014 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B",
  cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
  start: "\u041D\u0430\u0447\u0430\u0442\u044C",
  close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
  existingTitle: "\u0420\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F \u0443\u0436\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u0430",
  abandonSessionEllipsis: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E\u2026",
  finish: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C",
  returnToGoodnotes: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 Goodnotes",
  abandonCaptureTitle: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u0443\u044E \u0441\u0435\u0441\u0441\u0438\u044E?",
  abandonCaptureBody: "\u0423\u0434\u0430\u043B\u0438\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E pending-\u0437\u0430\u043F\u0438\u0441\u044C. \u042D\u043A\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F \u0432 Inbox.",
  keepSession: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E",
  abandonSession: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E",
  finishTitle: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0440\u0443\u043A\u043E\u043F\u0438\u0441\u043D\u044B\u0439 \u0432\u0432\u043E\u0434",
  noteChangedWarning: "\u0418\u0441\u0445\u043E\u0434\u043D\u0430\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C, \u043F\u043E\u043A\u0430 Goodnotes \u0431\u044B\u043B \u043E\u0442\u043A\u0440\u044B\u0442. \u042F\u0432\u043D\u043E \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u0432\u0441\u0442\u0430\u0432\u043A\u0438.",
  artifactType: "\u0422\u0438\u043F \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u0430",
  context: "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442",
  sourceLink: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0438\u0441\u0445\u043E\u0434\u043D\u0438\u043A Goodnotes",
  sourceLinkDesc: "\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E. \u041D\u0430 Essential share link \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043B\u044E\u0431\u043E\u043C\u0443, \u0443 \u043A\u043E\u0433\u043E \u0435\u0441\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0430.",
  insertion: "\u0412\u0441\u0442\u0430\u0432\u043A\u0430 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443",
  insertionSavedCursor: "\u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u0430\u044F \u043F\u043E\u0437\u0438\u0446\u0438\u044F \u043A\u0443\u0440\u0441\u043E\u0440\u0430",
  insertionCurrentCursor: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043F\u043E\u0437\u0438\u0446\u0438\u044F \u043A\u0443\u0440\u0441\u043E\u0440\u0430",
  insertionEnd: "\u041A\u043E\u043D\u0435\u0446 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",
  insertionSidecarOnly: "\u0422\u043E\u043B\u044C\u043A\u043E sidecar",
  confirm: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
  linkTitle: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u0441 \u0438\u0441\u0445\u043E\u0434\u043D\u0438\u043A\u043E\u043C Goodnotes",
  linkWarning: "Goodnotes Essential \u0441\u043E\u0437\u0434\u0430\u0451\u0442 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u0443\u044E share link: \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043B\u044E\u0431\u043E\u043C\u0443, \u0443 \u043A\u043E\u0433\u043E \u0435\u0441\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0430.",
  shareLink: "Goodnotes share link",
  shareLinkPlaceholder: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 share link Goodnotes",
  openOriginal: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0438\u0441\u0445\u043E\u0434\u043D\u0438\u043A",
  replaceTitle: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u044D\u043A\u0441\u043F\u043E\u0440\u0442 Goodnotes?",
  currentFile: (path) => `\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0444\u0430\u0439\u043B: ${path}`,
  newExport: (path) => `\u041D\u043E\u0432\u044B\u0439 \u044D\u043A\u0441\u043F\u043E\u0440\u0442: ${path}`,
  replaceWarning: "\u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0444\u0430\u0439\u043B \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0437\u0430\u043C\u0435\u043D\u0451\u043D. \u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u0430\u044F \u043A\u043E\u043F\u0438\u044F \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442\u0441\u044F.",
  replace: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C",
  abandonEditTitle: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 Goodnotes?",
  abandonEditBody: "\u0423\u0434\u0430\u043B\u0438\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E pending-\u0437\u0430\u043F\u0438\u0441\u044C. \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u0438 \u0444\u0430\u0439\u043B\u044B \u0432 Inbox \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F \u0431\u0435\u0437 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439."
};
function messagesFor(language) {
  return language.toLowerCase().startsWith("ru") ? ru : en;
}
var t = messagesFor((0, import_obsidian.getLanguage)());

// src/settings.ts
var import_obsidian2 = require("obsidian");
var DEFAULT_SETTINGS = {
  inboxFolder: "Inbox/Goodnotes",
  projectsFolder: "Projects",
  areasFolder: "Areas",
  resourcesFolder: "Resources",
  archivesFolder: "Archives",
  startShortcutName: "Start Goodnotes Handwriting"
};
var WorkflowSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  plugin;
  display() {
    this.containerEl.empty();
    this.addTextSetting(t.settingInbox, t.settingInboxDesc, "inboxFolder");
    this.addTextSetting(t.settingProjects, t.settingProjectsDesc, "projectsFolder");
    this.addTextSetting(t.settingAreas, t.settingAreasDesc, "areasFolder");
    this.addTextSetting(t.settingResources, t.settingResourcesDesc, "resourcesFolder");
    this.addTextSetting(t.settingArchives, t.settingArchivesDesc, "archivesFolder");
    this.addTextSetting(t.settingShortcut, t.settingShortcutDesc, "startShortcutName");
  }
  addTextSetting(name, description, key) {
    new import_obsidian2.Setting(this.containerEl).setName(name).setDesc(description).addText(
      (text) => text.setValue(this.plugin.settings[key]).onChange(async (value) => {
        this.plugin.settings[key] = value.trim();
        await this.plugin.persistState();
      })
    );
  }
};

// src/transaction.ts
var import_obsidian3 = require("obsidian");
async function executeReviewTransaction(app, input) {
  const vault = app.vault;
  const originalAttachmentPath = input.attachment.path;
  const finalAttachmentPath = validateVaultPath(input.finalAttachmentPath);
  const sidecarPath = validateVaultPath(input.sidecarPath);
  const sourceBefore = await vault.read(input.sourceNote);
  if (sourceBefore !== input.expectedSourceContent) {
    throw new Error("Source note changed after preview. Review it again before confirming.");
  }
  if (vault.getAbstractFileByPath(finalAttachmentPath) !== null) {
    throw new Error(`Target already exists: ${finalAttachmentPath}`);
  }
  if (vault.getAbstractFileByPath(sidecarPath) !== null) {
    throw new Error(`Sidecar already exists: ${sidecarPath}`);
  }
  await ensureParentFolder(app, finalAttachmentPath);
  await ensureParentFolder(app, sidecarPath);
  let moved = false;
  let sidecar = null;
  let sourceAfter = null;
  try {
    await app.fileManager.renameFile(input.attachment, finalAttachmentPath);
    moved = true;
    const attachmentLink = buildAttachmentLink(app, input.attachment, input.sourceNote);
    const sidecarContent = input.buildSidecar(attachmentLink);
    sidecar = await vault.create(sidecarPath, sidecarContent);
    if (input.insertionMode !== "sidecar-only") {
      const offset = input.insertionOffset ?? sourceBefore.length;
      sourceAfter = input.insertionMode === "end" ? appendBlock(sourceBefore, attachmentLink) : insertAt(sourceBefore, offset, attachmentLink);
      const expected = sourceAfter;
      await vault.process(input.sourceNote, (current) => {
        if (current !== sourceBefore) throw new Error("Source note changed during confirmation.");
        return expected;
      });
    }
    return { attachment: input.attachment, sidecar, attachmentLink };
  } catch (error) {
    const rollbackErrors = [];
    if (sourceAfter !== null) {
      try {
        const written = sourceAfter;
        if (!await restoreIfUnchanged(app, input.sourceNote, written, sourceBefore)) {
          rollbackErrors.push("source note changed during rollback and was preserved");
        }
      } catch (rollbackError) {
        rollbackErrors.push(`source note: ${errorMessage(rollbackError)}`);
      }
    }
    if (sidecar !== null) {
      try {
        const current = await vault.read(sidecar);
        if (current === input.buildSidecar(buildAttachmentLink(app, input.attachment, input.sourceNote))) {
          await app.fileManager.trashFile(sidecar);
        } else {
          rollbackErrors.push("sidecar changed during rollback and was preserved");
        }
      } catch (rollbackError) {
        rollbackErrors.push(`sidecar: ${errorMessage(rollbackError)}`);
      }
    }
    if (moved) {
      try {
        if (vault.getAbstractFileByPath(originalAttachmentPath) === null) {
          await app.fileManager.renameFile(input.attachment, originalAttachmentPath);
        } else {
          rollbackErrors.push("original Inbox path is occupied; moved export was preserved");
        }
      } catch (rollbackError) {
        rollbackErrors.push(`attachment: ${errorMessage(rollbackError)}`);
      }
    }
    const rollbackSuffix = rollbackErrors.length > 0 ? ` Rollback warnings: ${rollbackErrors.join("; ")}` : "";
    throw new Error(`${errorMessage(error)}${rollbackSuffix}`);
  }
}
async function executeEditReplacementTransaction(app, input) {
  const vault = app.vault;
  if (input.replacement.path === input.target.path) {
    throw new Error("Replacement and target must be different files");
  }
  const targetBefore = await vault.readBinary(input.target);
  if (binaryHash(targetBefore) !== input.expectedTargetHash) {
    throw new Error("Target artifact changed after the edit session started");
  }
  const sidecarBefore = await vault.read(input.sidecar);
  if (sidecarBefore !== input.expectedSidecarContent) {
    throw new Error("Sidecar changed after the edit session started");
  }
  const replacementContent = await vault.readBinary(input.replacement);
  const replacementHash = binaryHash(replacementContent);
  if (replacementHash !== input.expectedReplacementHash) {
    throw new Error("Replacement export changed after preview");
  }
  if (replacementHash === input.expectedTargetHash) {
    throw new Error("The returned export is identical to the current artifact");
  }
  try {
    await vault.modifyBinary(input.target, replacementContent);
    await vault.process(input.sidecar, (current) => {
      if (current !== sidecarBefore) throw new Error("Sidecar changed during replacement");
      return input.updatedSidecarContent;
    });
    await app.fileManager.trashFile(input.replacement);
  } catch (error) {
    const rollbackErrors = [];
    try {
      const restored = await restoreIfUnchanged(app, input.sidecar, input.updatedSidecarContent, sidecarBefore);
      if (!restored && await vault.read(input.sidecar) !== sidecarBefore) {
        rollbackErrors.push("sidecar changed during rollback and was preserved");
      }
    } catch (rollbackError) {
      rollbackErrors.push(`sidecar: ${errorMessage(rollbackError)}`);
    }
    try {
      const current = await vault.readBinary(input.target);
      const currentHash = binaryHash(current);
      if (currentHash === binaryHash(replacementContent)) {
        await vault.modifyBinary(input.target, targetBefore);
      } else if (currentHash !== input.expectedTargetHash) {
        rollbackErrors.push("target changed during rollback and was preserved");
      }
    } catch (rollbackError) {
      rollbackErrors.push(`target: ${errorMessage(rollbackError)}`);
    }
    const rollbackSuffix = rollbackErrors.length > 0 ? ` Rollback warnings: ${rollbackErrors.join("; ")}` : "";
    throw new Error(`${errorMessage(error)}${rollbackSuffix}`);
  }
}
async function restoreIfUnchanged(app, file, written, previous) {
  let restored = false;
  await app.vault.process(file, (current) => {
    if (current !== written) return current;
    restored = true;
    return previous;
  });
  return restored;
}
async function ensureParentFolder(app, filePath) {
  const parts = filePath.split("/").slice(0, -1);
  let current = "";
  for (const part of parts) {
    current = current.length === 0 ? part : `${current}/${part}`;
    if (app.vault.getAbstractFileByPath(current) === null) await app.vault.createFolder(current);
  }
}
function validateVaultPath(path) {
  if (path.startsWith("/") || path.split("/").includes("..")) {
    throw new Error(`Unsafe vault path: ${path}`);
  }
  const normalized = (0, import_obsidian3.normalizePath)(path);
  if (normalized.length === 0 || normalized === ".") throw new Error("Vault path cannot be empty");
  return normalized;
}
function buildAttachmentLink(app, attachment, sourceNote) {
  const link = app.fileManager.generateMarkdownLink(attachment, sourceNote.path);
  return `!${link}`;
}
function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

// src/ui/modals.ts
var import_obsidian4 = require("obsidian");
var StartCaptureModal = class extends import_obsidian4.Modal {
  constructor(app, sourcePath, initialTitle, resolve) {
    super(app);
    this.sourcePath = sourcePath;
    this.initialTitle = initialTitle;
    this.resolve = resolve;
  }
  sourcePath;
  initialTitle;
  resolve;
  settled = false;
  onOpen() {
    this.setTitle(t.startTitle);
    let title = this.initialTitle;
    let preferredFormat = "png";
    this.contentEl.createEl("p", { text: t.sourceNote(this.sourcePath) });
    new import_obsidian4.Setting(this.contentEl).setName(t.title).addText(
      (text) => text.setValue(title).onChange((value) => {
        title = value;
      })
    );
    new import_obsidian4.Setting(this.contentEl).setName(t.preferredExport).addDropdown(
      (dropdown) => dropdown.addOption("png", t.formatPng).addOption("pdf", t.formatPdf).addOption("jpeg", t.formatJpeg).setValue(preferredFormat).onChange((value) => {
        preferredFormat = value;
      })
    );
    const actions = this.contentEl.createDiv({ cls: "goodnotes-workflow-actions" });
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.cancel).onClick(() => this.finish(null));
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.start).setCta().onClick(() => this.finish({ title: title.trim() || this.initialTitle, preferredFormat }));
  }
  onClose() {
    this.contentEl.empty();
    if (!this.settled) this.resolve(null);
  }
  finish(value) {
    this.settled = true;
    this.resolve(value);
    this.close();
  }
};
var ExistingCaptureModal = class extends import_obsidian4.Modal {
  constructor(app, capture, resolve) {
    super(app);
    this.capture = capture;
    this.resolve = resolve;
  }
  capture;
  resolve;
  settled = false;
  onOpen() {
    this.setTitle(t.existingTitle);
    this.contentEl.createEl("p", { text: this.capture.title });
    this.contentEl.createEl("small", { text: this.capture.sourcePath });
    const actions = this.contentEl.createDiv({ cls: "goodnotes-workflow-actions" });
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.close).onClick(() => this.finish(null));
    warningButton(actions, t.abandonSessionEllipsis).onClick(() => this.finish("abandon"));
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.finish).onClick(() => this.finish("finish"));
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.returnToGoodnotes).setCta().onClick(() => this.finish("resume"));
  }
  onClose() {
    this.contentEl.empty();
    if (!this.settled) this.resolve(null);
  }
  finish(value) {
    this.settled = true;
    this.resolve(value);
    this.close();
  }
};
var ConfirmAbandonModal = class extends import_obsidian4.Modal {
  constructor(app, capture, resolve) {
    super(app);
    this.capture = capture;
    this.resolve = resolve;
  }
  capture;
  resolve;
  settled = false;
  onOpen() {
    this.setTitle(t.abandonCaptureTitle);
    this.contentEl.createEl("p", {
      text: t.abandonCaptureBody
    });
    this.contentEl.createEl("small", { text: this.capture.sourcePath });
    const actions = this.contentEl.createDiv({ cls: "goodnotes-workflow-actions" });
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.keepSession).onClick(() => this.finish(false));
    warningButton(actions, t.abandonSession).onClick(() => this.finish(true));
  }
  onClose() {
    this.contentEl.empty();
    if (!this.settled) this.resolve(false);
  }
  finish(value) {
    this.settled = true;
    this.resolve(value);
    this.close();
  }
};
var ExportPickerModal = class extends import_obsidian4.FuzzySuggestModal {
  constructor(app, files, resolve, placeholder = t.pickExport) {
    super(app);
    this.files = files;
    this.resolve = resolve;
    this.setPlaceholder(placeholder);
  }
  files;
  resolve;
  settled = false;
  getItems() {
    return this.files;
  }
  getItemText(item) {
    return item.path;
  }
  onChooseItem(item) {
    this.settled = true;
    this.resolve(item);
  }
  onClose() {
    super.onClose();
    if (!this.settled) this.resolve(null);
  }
};
var FinishReviewModal = class extends import_obsidian4.Modal {
  constructor(app, sourcePath, exportPath, suggestedContext, noteChanged, canUseCurrentCursor, previewPath, resolve) {
    super(app);
    this.sourcePath = sourcePath;
    this.exportPath = exportPath;
    this.suggestedContext = suggestedContext;
    this.noteChanged = noteChanged;
    this.canUseCurrentCursor = canUseCurrentCursor;
    this.previewPath = previewPath;
    this.resolve = resolve;
  }
  sourcePath;
  exportPath;
  suggestedContext;
  noteChanged;
  canUseCurrentCursor;
  previewPath;
  resolve;
  settled = false;
  onOpen() {
    this.setTitle(t.finishTitle);
    let artifact = "Handwriting";
    let context = this.suggestedContext;
    let sourceLink = "";
    let insertionMode = this.noteChanged ? this.canUseCurrentCursor ? "current-cursor" : "end" : "saved-cursor";
    this.contentEl.createEl("p", { text: t.sourceNote(this.sourcePath) });
    this.contentEl.createEl("p", { text: t.exportPath(this.exportPath) });
    if (this.noteChanged) {
      this.contentEl.createEl("p", {
        cls: "goodnotes-workflow-warning",
        text: t.noteChangedWarning
      });
    }
    const preview = this.contentEl.createDiv({ cls: "goodnotes-workflow-preview" });
    const refreshPreview = () => {
      preview.setText(this.previewPath(artifact, context));
    };
    new import_obsidian4.Setting(this.contentEl).setName(t.artifactType).addText(
      (text) => text.setValue(artifact).onChange((value) => {
        artifact = value;
        refreshPreview();
      })
    );
    new import_obsidian4.Setting(this.contentEl).setName(t.context).addText(
      (text) => text.setValue(context).onChange((value) => {
        context = value;
        refreshPreview();
      })
    );
    new import_obsidian4.Setting(this.contentEl).setName(t.sourceLink).setDesc(t.sourceLinkDesc).addText(
      (text) => text.setPlaceholder(t.shareLinkPlaceholder).onChange((value) => {
        sourceLink = value;
      })
    );
    new import_obsidian4.Setting(this.contentEl).setName(t.insertion).addDropdown((dropdown) => {
      if (!this.noteChanged) dropdown.addOption("saved-cursor", t.insertionSavedCursor);
      if (this.canUseCurrentCursor) dropdown.addOption("current-cursor", t.insertionCurrentCursor);
      dropdown.addOption("end", t.insertionEnd).addOption("sidecar-only", t.insertionSidecarOnly);
      dropdown.setValue(insertionMode).onChange((value) => {
        insertionMode = value;
      });
    });
    refreshPreview();
    const actions = this.contentEl.createDiv({ cls: "goodnotes-workflow-actions" });
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.cancel).onClick(() => this.finish(null));
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.confirm).setCta().onClick(
      () => this.finish({
        artifact: artifact.trim() || "Handwriting",
        context: context.trim() || this.suggestedContext,
        insertionMode,
        sourceLink: sourceLink.trim()
      })
    );
  }
  onClose() {
    this.contentEl.empty();
    if (!this.settled) this.resolve(null);
  }
  finish(value) {
    this.settled = true;
    this.resolve(value);
    this.close();
  }
};
var GoodnotesSourceLinkModal = class extends import_obsidian4.Modal {
  constructor(app, initialValue, resolve) {
    super(app);
    this.initialValue = initialValue;
    this.resolve = resolve;
  }
  initialValue;
  resolve;
  settled = false;
  onOpen() {
    this.setTitle(t.linkTitle);
    let sourceLink = this.initialValue;
    this.contentEl.createEl("p", {
      cls: "goodnotes-workflow-warning",
      text: t.linkWarning
    });
    new import_obsidian4.Setting(this.contentEl).setName(t.shareLink).addText(
      (text) => text.setPlaceholder(t.shareLinkPlaceholder).setValue(sourceLink).onChange((value) => {
        sourceLink = value;
      })
    );
    const actions = this.contentEl.createDiv({ cls: "goodnotes-workflow-actions" });
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.cancel).onClick(() => this.finish(null));
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.openOriginal).setCta().onClick(() => this.finish(sourceLink.trim()));
  }
  onClose() {
    this.contentEl.empty();
    if (!this.settled) this.resolve(null);
  }
  finish(value) {
    this.settled = true;
    this.resolve(value);
    this.close();
  }
};
var ConfirmEditReplacementModal = class extends import_obsidian4.Modal {
  constructor(app, targetPath, replacementPath, resolve) {
    super(app);
    this.targetPath = targetPath;
    this.replacementPath = replacementPath;
    this.resolve = resolve;
  }
  targetPath;
  replacementPath;
  resolve;
  settled = false;
  onOpen() {
    this.setTitle(t.replaceTitle);
    this.contentEl.createEl("p", { text: t.currentFile(this.targetPath) });
    this.contentEl.createEl("p", { text: t.newExport(this.replacementPath) });
    this.contentEl.createEl("p", {
      cls: "goodnotes-workflow-warning",
      text: t.replaceWarning
    });
    const actions = this.contentEl.createDiv({ cls: "goodnotes-workflow-actions" });
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.cancel).onClick(() => this.finish(false));
    warningButton(actions, t.replace).onClick(() => this.finish(true));
  }
  onClose() {
    this.contentEl.empty();
    if (!this.settled) this.resolve(false);
  }
  finish(value) {
    this.settled = true;
    this.resolve(value);
    this.close();
  }
};
var ConfirmAbandonEditModal = class extends import_obsidian4.Modal {
  constructor(app, edit, resolve) {
    super(app);
    this.edit = edit;
    this.resolve = resolve;
  }
  edit;
  resolve;
  settled = false;
  onOpen() {
    this.setTitle(t.abandonEditTitle);
    this.contentEl.createEl("p", {
      text: t.abandonEditBody
    });
    this.contentEl.createEl("small", { text: this.edit.targetPath });
    const actions = this.contentEl.createDiv({ cls: "goodnotes-workflow-actions" });
    new import_obsidian4.ButtonComponent(actions).setButtonText(t.keepSession).onClick(() => this.finish(false));
    warningButton(actions, t.abandonSession).onClick(() => this.finish(true));
  }
  onClose() {
    this.contentEl.empty();
    if (!this.settled) this.resolve(false);
  }
  finish(value) {
    this.settled = true;
    this.resolve(value);
    this.close();
  }
};
function warningButton(container, text) {
  const button = new import_obsidian4.ButtonComponent(container).setButtonText(text);
  button.buttonEl.addClass("mod-warning");
  return button;
}

// src/main.ts
var GoodnotesWorkflowPlugin = class extends import_obsidian5.Plugin {
  settings = DEFAULT_SETTINGS;
  pendingCapture = null;
  pendingEdit = null;
  detectedExportPath = null;
  finishInProgress = false;
  previewTimer;
  async onload() {
    await this.loadState();
    this.register(() => window.clearTimeout(this.previewTimer));
    this.addSettingTab(new WorkflowSettingTab(this.app, this));
    this.addRibbonIcon("pen-tool", t.ribbonStart, () => void this.startCapture());
    this.addCommand({
      id: "start-handwriting-capture",
      name: t.commandStart,
      editorCallback: () => void this.startCapture()
    });
    this.addCommand({
      id: "resume-handwriting-capture",
      name: t.commandResume,
      checkCallback: (checking) => {
        if (this.pendingCapture === null) return false;
        if (!checking) this.openGoodnotes(this.pendingCapture);
        return true;
      }
    });
    this.addCommand({
      id: "finish-handwriting-capture",
      name: t.commandFinish,
      checkCallback: (checking) => {
        if (this.pendingCapture === null) return false;
        if (!checking) void this.finishCapture();
        return true;
      }
    });
    this.addCommand({
      id: "abandon-handwriting-capture",
      name: t.commandAbandon,
      checkCallback: (checking) => {
        if (this.pendingCapture === null) return false;
        if (!checking) void this.abandonCapture();
        return true;
      }
    });
    this.addCommand({
      id: "edit-goodnotes-artifact",
      name: t.commandEdit,
      callback: () => void this.startEdit()
    });
    this.addCommand({
      id: "resume-goodnotes-edit",
      name: t.commandResumeEdit,
      checkCallback: (checking) => {
        if (this.pendingEdit === null) return false;
        if (!checking) this.openGoodnotesSource(this.pendingEdit.sourceLink);
        return true;
      }
    });
    this.addCommand({
      id: "finish-goodnotes-edit",
      name: t.commandFinishEdit,
      checkCallback: (checking) => {
        if (this.pendingEdit === null) return false;
        if (!checking) void this.finishEdit();
        return true;
      }
    });
    this.addCommand({
      id: "abandon-goodnotes-edit",
      name: t.commandAbandonEdit,
      checkCallback: (checking) => {
        if (this.pendingEdit === null) return false;
        if (!checking) void this.abandonEdit();
        return true;
      }
    });
    this.app.workspace.onLayoutReady(() => this.watchInbox());
  }
  watchInbox() {
    const arrived = this.app.vault.getFiles().filter((file) => this.isCandidateForPendingCapture(file) || this.isCandidateForPendingEdit(file)).sort((left, right) => right.stat.ctime - left.stat.ctime)[0];
    if (arrived !== void 0) this.scheduleDetectedExport(arrived);
    this.registerEvent(
      this.app.vault.on("create", (file) => {
        if (file instanceof import_obsidian5.TFile) this.scheduleDetectedExport(file);
      })
    );
  }
  scheduleDetectedExport(file) {
    const captureCandidate = this.isCandidateForPendingCapture(file);
    const editCandidate = this.isCandidateForPendingEdit(file);
    if (!captureCandidate && !editCandidate) return;
    this.detectedExportPath = file.path;
    new import_obsidian5.Notice(t.noticeExportDetected);
    window.clearTimeout(this.previewTimer);
    this.previewTimer = window.setTimeout(() => {
      if (captureCandidate && this.pendingCapture !== null && this.detectedExportPath === file.path) {
        void this.finishCapture();
      } else if (editCandidate && this.pendingEdit !== null && this.detectedExportPath === file.path) {
        void this.finishEdit();
      }
    }, 500);
  }
  async persistState() {
    const data = {
      settings: this.settings,
      pendingCapture: this.pendingCapture,
      pendingEdit: this.pendingEdit
    };
    await this.saveData(data);
  }
  async loadState() {
    const loaded = await this.loadData();
    this.settings = { ...DEFAULT_SETTINGS, ...loaded?.settings ?? {} };
    this.pendingCapture = loaded?.pendingCapture ?? null;
    this.pendingEdit = loaded?.pendingEdit ?? null;
  }
  async startCapture() {
    if (this.pendingEdit !== null) {
      new import_obsidian5.Notice(t.noticeFinishEditFirst);
      return;
    }
    if (this.pendingCapture !== null) {
      const action = await this.openExistingCaptureModal(this.pendingCapture);
      await this.handleExistingCaptureAction(action);
      return;
    }
    const view = this.app.workspace.getActiveViewOfType(import_obsidian5.MarkdownView);
    const sourceNote = view?.file;
    if (view === null || !(sourceNote instanceof import_obsidian5.TFile)) {
      new import_obsidian5.Notice(t.noticeOpenMarkdown);
      return;
    }
    const sourceContent = await this.app.vault.read(sourceNote);
    const input = await this.openStartModal(sourceNote.path, sourceNote.basename);
    if (input === null) return;
    try {
      await this.ensureInboxFolder();
    } catch (error) {
      new import_obsidian5.Notice(t.noticeInboxFailed(errorMessage2(error)));
      return;
    }
    this.pendingCapture = {
      id: createCaptureId(),
      sourcePath: sourceNote.path,
      sourceHash: contentHash(sourceContent),
      cursorOffset: view.editor.posToOffset(view.editor.getCursor()),
      startedAt: Date.now(),
      title: input.title,
      preferredFormat: input.preferredFormat
    };
    this.detectedExportPath = null;
    try {
      await this.persistState();
    } catch (error) {
      this.pendingCapture = null;
      new import_obsidian5.Notice(t.noticeSessionSaveFailed(errorMessage2(error)));
      return;
    }
    this.openGoodnotes(this.pendingCapture);
  }
  async handleExistingCaptureAction(action) {
    if (action === "resume" && this.pendingCapture !== null) this.openGoodnotes(this.pendingCapture);
    else if (action === "finish") await this.finishCapture();
    else if (action === "abandon") await this.abandonCapture();
  }
  openGoodnotes(capture) {
    const name = this.settings.startShortcutName.trim();
    if (name.length === 0) {
      new import_obsidian5.Notice(t.noticeShortcutMissing);
      return;
    }
    window.open(buildShortcutUrl(name, capture), "_blank");
  }
  async abandonCapture() {
    const capture = this.pendingCapture;
    if (capture === null) return;
    const confirmed = await this.openConfirmAbandonModal(capture);
    if (!confirmed) return;
    this.pendingCapture = null;
    this.detectedExportPath = null;
    await this.persistState();
    new import_obsidian5.Notice(t.noticeCaptureAbandoned);
  }
  async startEdit() {
    if (this.pendingCapture !== null) {
      new import_obsidian5.Notice(t.noticeFinishCaptureFirst);
      return;
    }
    if (this.pendingEdit !== null) {
      new import_obsidian5.Notice(t.noticeEditActive);
      return;
    }
    const target = await this.resolveEditTarget();
    if (target === null) return;
    const sidecarContent = await this.app.vault.read(target.sidecar);
    const provenance = readSidecarProvenance(sidecarContent);
    let sourceLink = provenance.sourceLink === null ? null : normalizeGoodnotesSourceLink(provenance.sourceLink);
    if (sourceLink === null) {
      const entered = await this.openSourceLinkModal(provenance.sourceLink ?? "");
      if (entered === null) return;
      sourceLink = normalizeGoodnotesSourceLink(entered);
      if (sourceLink === null) {
        new import_obsidian5.Notice(t.noticeInvalidLink);
        return;
      }
    }
    const targetHash = binaryHash(await this.app.vault.readBinary(target.artifact));
    this.pendingEdit = {
      id: createCaptureId(),
      targetPath: target.artifact.path,
      targetHash,
      sidecarPath: target.sidecar.path,
      sidecarHash: contentHash(sidecarContent),
      startedAt: Date.now(),
      sourceLink
    };
    this.detectedExportPath = null;
    try {
      await this.persistState();
    } catch (error) {
      this.pendingEdit = null;
      new import_obsidian5.Notice(t.noticeEditSaveFailed(errorMessage2(error)));
      return;
    }
    this.openGoodnotesSource(sourceLink);
  }
  openGoodnotesSource(sourceLink) {
    window.open(sourceLink, "_blank");
  }
  async abandonEdit() {
    const edit = this.pendingEdit;
    if (edit === null) return;
    const confirmed = await this.openConfirmAbandonEditModal(edit);
    if (!confirmed) return;
    this.pendingEdit = null;
    this.detectedExportPath = null;
    await this.persistState();
    new import_obsidian5.Notice(t.noticeEditAbandoned);
  }
  async finishEdit() {
    if (this.finishInProgress) return;
    this.finishInProgress = true;
    try {
      await this.finishEditInternal();
    } finally {
      this.finishInProgress = false;
    }
  }
  async finishEditInternal() {
    const edit = this.pendingEdit;
    if (edit === null) {
      new import_obsidian5.Notice(t.noticeNoEdit);
      return;
    }
    const target = this.app.vault.getAbstractFileByPath(edit.targetPath);
    const sidecar = this.app.vault.getAbstractFileByPath(edit.sidecarPath);
    if (!(target instanceof import_obsidian5.TFile) || !(sidecar instanceof import_obsidian5.TFile)) {
      new import_obsidian5.Notice(t.noticeEditTargetMissing);
      return;
    }
    const candidates = this.findEditExportCandidates(edit, target.extension);
    const replacement = await this.selectExport(candidates, t.pickReplacement);
    if (replacement === null) {
      if (candidates.length === 0) new import_obsidian5.Notice(t.noticeNoReplacement);
      return;
    }
    if (!extensionsCompatible(target.extension, replacement.extension)) {
      new import_obsidian5.Notice(t.noticeFormatMismatch);
      return;
    }
    const confirmed = await this.openConfirmEditReplacementModal(target.path, replacement.path);
    if (!confirmed) return;
    const sidecarContent = await this.app.vault.read(sidecar);
    if (contentHash(sidecarContent) !== edit.sidecarHash) {
      new import_obsidian5.Notice(t.noticeSidecarChanged);
      return;
    }
    const replacementHash = binaryHash(await this.app.vault.readBinary(replacement));
    let updatedSidecar;
    try {
      updatedSidecar = updateSidecarAfterEdit(sidecarContent, {
        sourceLink: edit.sourceLink,
        artifactPath: target.path,
        artifactHash: replacementHash,
        editedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      await executeEditReplacementTransaction(this.app, {
        replacement,
        expectedReplacementHash: replacementHash,
        target,
        expectedTargetHash: edit.targetHash,
        sidecar,
        expectedSidecarContent: sidecarContent,
        updatedSidecarContent: updatedSidecar
      });
    } catch (error) {
      new import_obsidian5.Notice(t.noticeReplaceFailed(errorMessage2(error)), 1e4);
      return;
    }
    this.pendingEdit = null;
    this.detectedExportPath = null;
    try {
      await this.persistState();
      new import_obsidian5.Notice(t.noticeReplaced(target.path));
    } catch (error) {
      new import_obsidian5.Notice(t.noticeReplacedStateFailed(errorMessage2(error)), 1e4);
    }
  }
  async resolveEditTarget() {
    const active = this.app.workspace.getActiveFile();
    if (!(active instanceof import_obsidian5.TFile)) {
      new import_obsidian5.Notice(t.noticeOpenArtifact);
      return null;
    }
    if (isSupportedExport(active.path)) {
      const sidecar2 = await this.sidecarForArtifact(active);
      if (sidecar2 !== null) return { artifact: active, sidecar: sidecar2 };
    }
    if (active.extension !== "md") {
      new import_obsidian5.Notice(t.noticeNoSidecar);
      return null;
    }
    const candidates = /* @__PURE__ */ new Map();
    const content = await this.app.vault.read(active);
    const provenance = readSidecarProvenance(content);
    if (provenance.artifactPath !== null) {
      const artifact2 = this.app.vault.getAbstractFileByPath((0, import_obsidian5.normalizePath)(provenance.artifactPath));
      if (artifact2 instanceof import_obsidian5.TFile && isSupportedExport(artifact2.path)) candidates.set(artifact2.path, artifact2);
    }
    for (const extension of ["pdf", "png", "jpg", "jpeg"]) {
      const sibling = this.app.vault.getAbstractFileByPath(`${active.path.slice(0, -3)}.${extension}`);
      if (sibling instanceof import_obsidian5.TFile) candidates.set(sibling.path, sibling);
    }
    const embeds = this.app.metadataCache.getFileCache(active)?.embeds ?? [];
    for (const embed of embeds) {
      const artifact2 = this.app.metadataCache.getFirstLinkpathDest(embed.link, active.path);
      if (artifact2 instanceof import_obsidian5.TFile && isSupportedExport(artifact2.path) && await this.sidecarForArtifact(artifact2) !== null) {
        candidates.set(artifact2.path, artifact2);
      }
    }
    const files = [];
    for (const candidate of candidates.values()) {
      if (await this.sidecarForArtifact(candidate) !== null) files.push(candidate);
    }
    const artifact = await this.selectExport(files, t.pickArtifact);
    if (artifact === null) {
      if (files.length === 0) new import_obsidian5.Notice(t.noticeNoArtifact);
      return null;
    }
    const sidecar = await this.sidecarForArtifact(artifact);
    return sidecar === null ? null : { artifact, sidecar };
  }
  async sidecarForArtifact(artifact) {
    const sidecarPath = `${artifact.path.slice(0, -(artifact.extension.length + 1))}.md`;
    const sidecar = this.app.vault.getAbstractFileByPath(sidecarPath);
    if (!(sidecar instanceof import_obsidian5.TFile) || sidecar.extension !== "md") return null;
    const sourceApp = this.app.metadataCache.getFileCache(sidecar)?.frontmatter?.source_app;
    if (sourceApp === "Goodnotes") return sidecar;
    const content = await this.app.vault.read(sidecar);
    return /^source_app:\s*Goodnotes\s*$/m.test(content) ? sidecar : null;
  }
  async finishCapture() {
    if (this.finishInProgress) return;
    this.finishInProgress = true;
    try {
      await this.finishCaptureInternal();
    } finally {
      this.finishInProgress = false;
    }
  }
  async finishCaptureInternal() {
    const capture = this.pendingCapture;
    if (capture === null) {
      new import_obsidian5.Notice(t.noticeNoCapture);
      return;
    }
    const sourceNote = this.app.vault.getAbstractFileByPath(capture.sourcePath);
    if (!(sourceNote instanceof import_obsidian5.TFile) || sourceNote.extension !== "md") {
      new import_obsidian5.Notice(t.noticeSourceMissing);
      return;
    }
    const candidates = this.findExportCandidates(capture);
    const attachment = await this.selectExport(candidates);
    if (attachment === null) {
      if (candidates.length === 0) new import_obsidian5.Notice(t.noticeNoExport);
      return;
    }
    const sourceContent = await this.app.vault.read(sourceNote);
    const noteChanged = contentHash(sourceContent) !== capture.sourceHash;
    const activeView = this.app.workspace.getActiveViewOfType(import_obsidian5.MarkdownView);
    const activeSourceView = activeView?.file?.path === sourceNote.path ? activeView : null;
    const destination = inferDestination(sourceNote.path, attachment.path, this.settings);
    const captured = formatLocalDate(/* @__PURE__ */ new Date());
    const extension = extensionOf(attachment.path);
    const review = await this.openFinishModal({
      sourcePath: sourceNote.path,
      exportPath: attachment.path,
      context: destination.context,
      noteChanged,
      canUseCurrentCursor: activeSourceView !== null,
      previewPath: (artifact, context) => `${destination.directory}/${buildBaseName(captured, artifact, context)}.${extension}`
    });
    if (review === null) return;
    const sourceLink = review.sourceLink.length === 0 ? null : normalizeGoodnotesSourceLink(review.sourceLink);
    if (review.sourceLink.length > 0 && sourceLink === null) {
      new import_obsidian5.Notice(t.noticeInvalidLink);
      return;
    }
    const currentSourceContent = await this.app.vault.read(sourceNote);
    if (currentSourceContent !== sourceContent) {
      new import_obsidian5.Notice(t.noticeSourceChanged);
      return;
    }
    const insertionOffset = this.resolveInsertionOffset(
      review,
      capture,
      currentSourceContent,
      activeSourceView
    );
    if (review.insertionMode === "current-cursor" && insertionOffset === null) {
      new import_obsidian5.Notice(t.noticeSourceInactive);
      return;
    }
    const occupied = new Set(this.app.vault.getFiles().map((file) => file.path));
    const unique = chooseUniquePaths(
      (0, import_obsidian5.normalizePath)(destination.directory),
      buildBaseName(captured, review.artifact, review.context),
      extension,
      occupied
    );
    const projectNote = destination.projectNote !== null && this.app.vault.getAbstractFileByPath(destination.projectNote) instanceof import_obsidian5.TFile ? destination.projectNote : destination.para === "project" ? sourceNote.path : null;
    const title = basenameWithoutExtension(unique.attachmentPath);
    const attachmentHash = binaryHash(await this.app.vault.readBinary(attachment));
    try {
      await executeReviewTransaction(this.app, {
        attachment,
        finalAttachmentPath: unique.attachmentPath,
        sidecarPath: unique.sidecarPath,
        sourceNote,
        expectedSourceContent: currentSourceContent,
        insertionMode: review.insertionMode,
        insertionOffset,
        buildSidecar: (attachmentLink) => buildSidecar({
          title,
          artifact: review.artifact,
          para: destination.para,
          projectNote,
          captured,
          sourceNote: sourceNote.path,
          attachmentLink,
          attachmentPath: unique.attachmentPath,
          attachmentHash,
          sourceLink
        })
      });
    } catch (error) {
      new import_obsidian5.Notice(t.noticeCaptureFailed(errorMessage2(error)), 1e4);
      return;
    }
    this.pendingCapture = null;
    this.detectedExportPath = null;
    try {
      await this.persistState();
      new import_obsidian5.Notice(t.noticeCaptureSaved(unique.attachmentPath));
    } catch (error) {
      new import_obsidian5.Notice(t.noticeCaptureStateFailed(errorMessage2(error)), 1e4);
    }
  }
  async ensureInboxFolder() {
    const inbox = (0, import_obsidian5.normalizePath)(this.settings.inboxFolder);
    if (inbox.length === 0 || inbox.split("/").includes("..")) {
      throw new Error("Inbox folder is empty or unsafe");
    }
    const parts = inbox.split("/");
    let current = "";
    for (const part of parts) {
      current = current.length === 0 ? part : `${current}/${part}`;
      if (this.app.vault.getAbstractFileByPath(current) === null) {
        await this.app.vault.createFolder(current);
      }
    }
  }
  resolveInsertionOffset(review, capture, sourceContent, activeSourceView) {
    if (review.insertionMode === "sidecar-only") return null;
    if (review.insertionMode === "end") return sourceContent.length;
    if (review.insertionMode === "saved-cursor") return capture.cursorOffset;
    return activeSourceView?.editor.posToOffset(activeSourceView.editor.getCursor()) ?? null;
  }
  findExportCandidates(capture) {
    const inbox = (0, import_obsidian5.normalizePath)(this.settings.inboxFolder);
    const all = this.app.vault.getFiles().filter((file) => file.path.startsWith(`${inbox}/`) && isSupportedExport(file.path)).filter((file) => {
      const sidecar = `${file.path.slice(0, -(file.extension.length + 1))}.md`;
      return this.app.vault.getAbstractFileByPath(sidecar) === null;
    }).sort((left, right) => right.stat.ctime - left.stat.ctime);
    if (this.detectedExportPath !== null) {
      const detected = all.find((file) => file.path === this.detectedExportPath);
      if (detected !== void 0) return [detected];
    }
    const recent = all.filter((file) => file.stat.ctime >= capture.startedAt - 6e4);
    return recent.length > 0 ? recent : all;
  }
  isCandidateForPendingCapture(file) {
    if (this.pendingCapture === null || !isSupportedExport(file.path)) return false;
    const inbox = (0, import_obsidian5.normalizePath)(this.settings.inboxFolder);
    return file.path.startsWith(`${inbox}/`) && file.stat.ctime >= this.pendingCapture.startedAt - 6e4;
  }
  findEditExportCandidates(edit, targetExtension) {
    const inbox = (0, import_obsidian5.normalizePath)(this.settings.inboxFolder);
    const all = this.app.vault.getFiles().filter((file) => file.path.startsWith(`${inbox}/`) && isSupportedExport(file.path)).filter((file) => file.path !== edit.targetPath && extensionsCompatible(targetExtension, file.extension)).sort((left, right) => right.stat.ctime - left.stat.ctime);
    if (this.detectedExportPath !== null) {
      const detected = all.find((file) => file.path === this.detectedExportPath);
      if (detected !== void 0) return [detected];
    }
    const recent = all.filter((file) => file.stat.ctime >= edit.startedAt - 6e4);
    return recent.length > 0 ? recent : all;
  }
  isCandidateForPendingEdit(file) {
    if (this.pendingEdit === null || !isSupportedExport(file.path)) return false;
    const targetExtension = extensionOf(this.pendingEdit.targetPath);
    const inbox = (0, import_obsidian5.normalizePath)(this.settings.inboxFolder);
    return file.path.startsWith(`${inbox}/`) && extensionsCompatible(targetExtension, file.extension) && file.stat.ctime >= this.pendingEdit.startedAt - 6e4;
  }
  async selectExport(files, placeholder = t.pickExport) {
    if (files.length === 0) return null;
    if (files.length === 1) return files[0] ?? null;
    return await new Promise(
      (resolve) => new ExportPickerModal(this.app, files, resolve, placeholder).open()
    );
  }
  async openStartModal(sourcePath, title) {
    return await new Promise((resolve) => new StartCaptureModal(this.app, sourcePath, title, resolve).open());
  }
  async openExistingCaptureModal(capture) {
    return await new Promise((resolve) => new ExistingCaptureModal(this.app, capture, resolve).open());
  }
  async openConfirmAbandonModal(capture) {
    return await new Promise((resolve) => new ConfirmAbandonModal(this.app, capture, resolve).open());
  }
  async openSourceLinkModal(initialValue) {
    return await new Promise(
      (resolve) => new GoodnotesSourceLinkModal(this.app, initialValue, resolve).open()
    );
  }
  async openConfirmEditReplacementModal(targetPath, replacementPath) {
    return await new Promise(
      (resolve) => new ConfirmEditReplacementModal(this.app, targetPath, replacementPath, resolve).open()
    );
  }
  async openConfirmAbandonEditModal(edit) {
    return await new Promise(
      (resolve) => new ConfirmAbandonEditModal(this.app, edit, resolve).open()
    );
  }
  async openFinishModal(input) {
    return await new Promise(
      (resolve) => new FinishReviewModal(
        this.app,
        input.sourcePath,
        input.exportPath,
        input.context,
        input.noteChanged,
        input.canUseCurrentCursor,
        input.previewPath,
        resolve
      ).open()
    );
  }
};
function createCaptureId() {
  return window.crypto?.randomUUID?.() ?? `capture-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function errorMessage2(error) {
  return error instanceof Error ? error.message : String(error);
}
function extensionsCompatible(left, right) {
  const normalize = (value) => {
    const extension = value.toLowerCase();
    return extension === "jpg" || extension === "jpeg" ? "jpeg" : extension;
  };
  return normalize(left) === normalize(right);
}

/* nosourcemap */