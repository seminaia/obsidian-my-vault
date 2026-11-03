
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Auto Filesize : http://auto-filesize.usual.tools
  jQuery plug-in that automatically get the file size.
  (c) 2016 http://usual.tools
  Dual licensed under the MIT and GPL licenses:
  http://www.opensource.org/licenses/mit-license.php
  http://www.gnu.org/licenses/gpl.html
  Version: 2.0.0 - April 21, 2016
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';(o($){$.N.15=o(i){i=$.14({G:\'t\',J:y,F:\'F\',A:\'13\',K:\'12 t\'},i);i.A=i.A.11(/\\s+/g,"");E.L(o(){5 b=$(E);5 c=\'\';9(b.Z(\'a\')){c=$(E)}q{c=$(\'a\',E);9(c.C==0){n}}5 d=c.Y(\'W\');5 e=d.H(".");5 f=e[e.C-1];5 g=$(\'.\'+i.F,b);9(l(d)){9(m(f,i)){9(10 g.z()==="M"||g.z()==\'\'||i.J==D){5 h=$.O({P:\'Q\',R:d,S:o(){5 a=h.T(\'U-V\');9(a){g.z(k(a,i))}},X:o(){g.z(i.K)}})}}}})};5 j=o(a){5 b=\'\'+a;5 c=b.C;5 d=b;9(c>=4&&c<=6){5 r=((r=c%3)==0?3:r);d=b.w(0,r)+\',\'+b.w(r,3)}n d};5 k=o(a,b){9(a<p){n a+\'B\'}9(b.G==\'t\'){a/=p;9(a>=x)n j(u.v(a))+\'t\';q n u.v(a)+\'t\'}q 9(b.G==\'I\'){9(a<(p*p)){a/=p;9(a>=x)n j(u.v(a))+\'t\';q n u.v(a)+\'t\'}q{a/=p;a/=p;9(a>=x){n j(u.v(a))+\'I\'}q{n(u.v(a*x)/x)+\'I\'}}}};5 l=o(a){5 b=\'\';5 c=\'\';5 d=a.H("/");5 e=16.17.18;b=a.w(0,1);9(b==\'#\'){n y}b=a.w(0,7);c=a.w(0,8);9(b==\'19://\'||c==\'1a://\'){9(e==d[2]){n D}q{n y}}n D};5 m=o(a,b){5 c=b.A.H(",");1b(5 d=0;d<c.C;d++){9(c[d]==a){n D}};n y}})(1c);',62,75,'|||||var||||if||||||||||||||return|function|1024|else|||KB|Math|round|substr|100|false|html|extension||length|true|this|size_part|unit|split|MB|force|error_display|each|undefined|fn|ajax|type|HEAD|url|success|getResponseHeader|Content|Length|href|error|attr|is|typeof|replace|XXX|pdf|extend|auto_filesize|window|location|host|http|https|for|jQuery'.split('|'),0,{}))


// file size
$(function(){
	$(".auto_filesize").auto_filesize({});
});




// copyright text_E
$(function(){
	var now = new Date();
	var year = now.getFullYear();
	$('#copyright_text').html("COPYRIGHT &copy; 1997 - " + year + " Hitachi Metals, Ltd. ALL RIGHTS RESERVED.");
});



// Inquiry Form Product
function submitProductSpecialtySteel() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Molds and tool steel" />');
		$form.append('<input type="hidden" name="UM_category" value="1" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProductRoll() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Rolls" />');
		$form.append('<input type="hidden" name="UM_category" value="2" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProductSoftMagneticMaterials() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Soft Magnetic Components and Materials" />');
		$form.append('<input type="hidden" name="UM_category" value="3" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProductNEOMAX() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Magnets" />');
		$form.append('<input type="hidden" name="UM_category" value="4" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProductInformationSystemComponents() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Ceramic components" />');
		$form.append('<input type="hidden" name="UM_category" value="5" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProductAutomotiveComponents() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Casting components for Automobiles" />');
		$form.append('<input type="hidden" name="UM_category" value="6" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProductPipingComponents() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Piping Components" />');
		$form.append('<input type="hidden" name="UM_category" value="7" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProductAircraftEnergy() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Industrial, Areospace &amp; Energy Materials" />');
		$form.append('<input type="hidden" name="UM_category" value="8" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProductElectronicMaterials() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Electronic Materials" />');
		$form.append('<input type="hidden" name="UM_category" value="9" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProductOther() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Other" />');
		$form.append('<input type="hidden" name="UM_category" value="0" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProduct09() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product_cable/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Wire & Cable (for Infrastructure)" />');
		$form.append('<input type="hidden" name="UM_category" value="3" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProduct10() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product_cable/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Wire & Cable (for Electronic Devices)" />');
		$form.append('<input type="hidden" name="UM_category" value="2" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProduct11() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product_cable/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Magnet wire, Electric discharge machining wire" />');
		$form.append('<input type="hidden" name="UM_category" value="4" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}
function submitProduct12() {
	$(function(){
		var $form = $('<form action="https://www8.hitachi.co.jp/inquiry/hitachi-metals/e/product_cable/form.jsp" method="POST" accept-charset="UTF-8"></form>');
		$form.append('<input type="hidden" name="UM_product" value="Automotive products (harness, sensor, brake hose, etc.)" />');
		$form.append('<input type="hidden" name="UM_category" value="1" />');
		$form.appendTo(document.body);
		$form.submit();
		return false;
	});
}


// pdf count Google Analytics
$(function(){
	$("a[href$='.pdf']").attr("onClick", "ga('send', 'event', 'DownloadPDF', 'click', this.href);");
});


// Count Control
;(function($) {
	$.fn.count_control = function(options) {
		options = $.extend({ // options
			count : 6,
			target : 'dt dd' // Split space
		}, options);

		this.each(function() { // count_control
			// Init
			var $targetParent_ = $(this); // count_control
			var targetSplit_ = options.target.split(" ");
			var target_ ='';

			for (var i_ = 0; i_ < targetSplit_.length; i_++) {
				target_ = targetSplit_[i_];
				$(target_, $targetParent_).each(function(index) {
					if ( index >= options.count ) {
						$(this).hide();
					}
				}); // each targetParent_
			} // for
		}); // each count_control
	}; // auto_filesize
})(jQuery);

$(function(){
	$(".count_control").count_control({});
	$(".count_control_li").count_control({target : 'li'});
});
