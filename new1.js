
let setGroupCss = function(curEle, options = {}) {
	for (ler attr in options) {
		if(！options.hasOwnproperty(attr))break;
		setCss(curEle,attr,potions[attr]);
	}
}setGroupCss(outer, {
		width:400,
		height:400,
		padding:30
	});

