window.onload = function(){
	document.addEventListener("touchstart",function(ev){
		ev = ev || event;
		ev.preventDefault();
	});
	//获取摇一摇主要元素
	var result = document.querySelector(".result");
	//设置控制器
	var lastTime = new Date().getTime(),//当年时间
	lastX = "first",//初次摇动
	isShake = false;//是否剧烈摇动
	//重力感应事件
	window.addEventListener("devicemotion",function(ev){
		var currentTime = new Date().getTime();//获取当前时间
		if(currentTime - lastTime > 200){
			ev = ev || event;
			//获取加速度
			var motion = ev.accelerationIncludingGravity;
			var x = Math.round(motion.x);
			//兼容安卓
			if(getAdr()){
				x = -x;
			}
			if(lastX === "first"){
				lastX = x;
				return;
			}
			//判断是否剧烈晃动
			if(Math.abs(x - lastX) > 30){
				isShake = true;
			}
			if(isShake && Math.abs(x - lastX) < 3){
				result.classList.add('show');
				//一次操作完毕初始化控制器
				isShake = false;
				lastX = 'first';
			}
			//同步值
			lastX = x;
			lastTime = currentTime;
		}
		
		function getAdr(){
			var u = navigator.userAgent;
			return u.indexOf('Android') > -1 || u.indexOf('Adr') > 1;
		}
	});
}