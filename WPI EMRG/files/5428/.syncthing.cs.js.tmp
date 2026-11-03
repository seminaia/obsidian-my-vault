(function(global, moduleName, subModuleName, factory){
  if(typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory(function(url) {
      return require('url').parse(url);
    }, function(data) {
      var c = require('crypto');
      var md5 = c.createHash('md5');
      md5.update(data, 'utf8');
      return md5.digest('hex');
    });
  }else{
    global[moduleName] = global[moduleName] || {};
    global[moduleName][subModuleName] = factory(
      function(url){
        var ret = document.createElement('a');
        ret.href = url;
        return ret;
      },
      CybozuLabs.MD5.calc.bind(CybozuLabs.MD5)
    );
  }
})(this,"GALFSRAM","content_server",function(urlobjgen,md5gen){
	//URLのhostからデフォルトポートを除外するための正規表現
	var proto2portRegexp = {
		http: /:80$/,
		https:/:443$/
	};

	var content_server = {
		url2awspath: url2awspath,
		awspath2url: awspath2url,
		awspath2datakey: awspath2datakey,
		awspath2skelkey: awspath2skelkey,
		encode_old: encode_old,
		encode_new: encode_new,
		encode: encode_new,
		decode: decode,
		encodeS3: encodeS3
	};
	
	
	function encode_old(baseurl, pageurl, propname){
		var path = url2awspath(pageurl);
		return (baseurl||'') + encodeS3( path +(propname?(' '+ propname):''));
	}
	
	function encode_new(baseurl, pageurl, propname){
		var path = url2awspath(pageurl);
		return (baseurl||'') + encodeS3( awspath2datakey(path, propname) );
	}

	function awspath2skelkey(path, propname){
		return 'skel/'+ path +(propname?(' '+ propname):'');
	}
	function awspath2datakey(path, propname){
		return 'data/'+ md5gen(path).substring(0,4) +'/'+ path +(propname?(' '+ propname):'');
	}
	
	function decode(url, decodeS3Needed){
		//(最初のカッコは後方参照しないように(?:<str>)という書式 )
		var baseurl_path = url.match(/(?:^https?:\/\/[^\/]+\/)?(.*)/);
		var path = baseurl_path[1];

		if ( decodeS3Needed ) {
			path = decodeURIComponent( path );
		}

		var path_prop = path.match(/(?:data\/[0-9a-f][0-9a-f][0-9a-f][0-9a-f]\/)(.*\/)( [^ \/]+)?$/ );
		//↑「data/01fd/<path> <prop>」の場合

		if ( ! path_prop ) path_prop = path.match(/(?:skel\/)?(.*\/)( [^ \/]+)?$/ );
		//↑もしくは「skel/<path> <prop>」または「<path> <prop>」
		
		return {
			baseurl: baseurl_path[1],
			pageurl: awspath2url(path_prop[1]),
			propname: path_prop[2] && path_prop[2].substr(1)
		};
	}

	function encodeS3(s){
		//encodeURIComponentでもいいけど、この方が見やすいURIになる
		return encodeURI(s).replace(/\?/g, '%3F').replace(/\&/g, '%26').replace(/=/g, '%3D').replace(/#/g, '%23');
	}
	
	function url2awspath(url){
		var urlobj = urlobjgen(url);

		var ret = '';

		var proto = urlobj.protocol;
		if ( proto ) {
			// プロトコル内の「:」「/」は削って
			proto = proto.replace(':','').replace(/\//g,'');
			// 末尾に「/」追加
			ret += proto +'/';
		}

		var host = urlobj.host;
		if ( host ) {
			// IEだとデフォルトポートでも番号付きになってるので修正
			host = host.replace(proto2portRegexp[proto], '');
			
			// ホストの末尾に「/」追加
			ret += host +'/';
		}

		var path =  urlobj.pathname;
		if ( path ) {
			// パスの先頭の「/」は削る
			// edgeでfile:///の場合「#」以降もくっついてくるので削る
			// 念のため「?」以降も削る
			ret += path.replace(/^\//,'').replace(/[#?].*/,'');
		}

		//クエリストリングがある場合
		//urlobj.searchのチェックではパラメタが空の時にミスる
		if ( urlobj.href.match(/\?/) ) {
			// クエリストリング内の先頭以外の「?」を「??」へ変換
			// クエリストリング内の「/」を「?$」へ変換
			// クエリストリングの先頭の「?」の後に「/」を挿入
			ret += '?/'+ urlobj.search.substr(1).replace(/\?/g,'??').replace(/\//g,'?$');
		}

		//ハッシュフラグメントがある場合
		//urlobj.hashのチェックではパラメタが空の時にミスる
		if ( urlobj.href.match(/#/) ) {
			// edgeでfile:///の場合はurlobj.hashが空なのでhrefをチェック
			// ハッシュフラグメント内の先頭以外の「#」を「##」へ変換
			// ハッシュフラグメント内の「/」を「#$」へ変換
			// ハッシュフラグメントの先頭の「#」の後に「/」を挿入
			ret += '#/'+ urlobj.href.replace(/[^#]*#/,'').replace(/#/g,'##').replace(/\//g,'#$');
		}

		ret += '/';	//URLをフォルダ名にする。(末尾が「/」のpathもあえて「//」にする)
		
		return ret.replace(/\/(?=\/)/g,'/ ');// 連続する/の間に半角スペースを入れる
	}

	function awspath2url(awspath){
		var url;
		
		url = awspath.replace(/ /g,'');// 半角スペースを削除

		url = url.replace(/\/$/,''); //末尾の「/」を削除

		var hash='';
		if ( url.match(/([^#]*)#\/(.*)/) ) {//ハッシュフラグメントがある場合
			//「#」の後に挿入した「/」を削除
			url = RegExp.$1;
			hash = RegExp.$2;
			
			// ハッシュフラグメント内の「#$」を「/」へ戻す
			// ハッシュフラグメント内の「##」を「#」へ戻す
			hash = '#'+ hash.replace(/#\$/g, '/').replace(/##/g,'#');
		}

		var query='';
		if ( url.match(/([^\?]*)\?\/(.*)/) ) {//クエリストリングがある場合
			//「?」の後に挿入した「/」を削除
			url = RegExp.$1;
			query = RegExp.$2;

			// クエリストリング内の「?$」を「/」へ戻す
			// クエリストリング内の「??」を「?」へ戻す
			query = '?'+ query.replace(/\?\$/g, '/').replace(/\?\?/g,'?');
		}
		
		// プロトコル内の「:」「/」を復元
		url = url.replace(/^(https?)\//,'$1://').replace(/^(file)\//,'$1:///');

		return url + query + hash;
	}

	return content_server;	
});
