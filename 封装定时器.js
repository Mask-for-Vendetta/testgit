~function(){
	//操作css样式方法 getCss(获取样式值)/ setCss(设置样式) / setGroupCss(批量设置样式) / css(整体)
	let utils = (function (){
		// 1、获取某个样式属性值
		let getCss = (ele,attr) => {
			let value = null;
			let reg = /^-?\d(.\d)?(px|em|rem)?$/;
			if('getComputedStyle' in window) {
				value = window.getComputer(ele,null)[attr];
				reg.test(value) ? value= paseFloat(value) : null; 
			}
			return value;
		}

		//2、设置某一个样式属性的值
		let setCss = (ele,attr,value) => {
			//检测传进的值是否带有单位
			if(!isNaN(value)){
				let reg = /^(width|height|font-size|((margin|padding)?(top|left|right|bottom)?))$/i;
				reg.test(attr) ? value = value + 'px' : null;
			}
			ele['style'][attr] = value;
		}

		//3、批量设置样式
		let setGroupCss  = (ele,options) => {
			for (let attr in  potions) {
				let value = potions[attr]
				setCss(ele,attr,value);
				
			}
		}

		//和平成一个
		let css = (...arg) => {
			if (arg.length >= 3) {
				setCss(...arg);
				return;
			}
			if (arg.length == 2 && typof arg[1] === 'object' &&  arg[1] !== null) {
				setGroupCss(...arg);
				return;
			}	
			return getCss(...arg);
		}


		return {
			css
		};

	})();
	let effect = {
		linear: (t,b,c,d) => {
			return t/d*c+b;
		}
	}

	//封装一个动画
	animate = (function(ele,target={},duration=1000,){
		//获取起始位置begin的一些值
		let begin = {}；
		let change = {};
		for(let attr in target){
			begin[attr] = utils.css(ele,attr);
			change[attr] = utils.css(ele.attr) - begin[attr];
		}
		//实现动画
		let autoTimer = getInterval(() => {
			let time += 17;
			let cur = {};
			if (time >= duraton){
				utils.css(ele,target);
				clearInterval(animate);

			}

			for(let attr in target) {
				cur[attr] = effect.linear(time,begin[attr],change[attr],duration);
			}
		utils.css(ele,cur);

		},17)


	})()

}();