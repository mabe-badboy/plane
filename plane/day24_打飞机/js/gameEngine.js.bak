

//游戏引擎(对象)
/*
 * 开始游戏, 加载游戏, 进入游戏主界面
 * 创建敌机, 控制移动我的飞机, 碰撞检测...
 */
var gameEngine = {
	//属性ele:是游戏的主界面(游戏区域) 
	ele: null,
	
	bullets: {}, //保存所有在游戏区域显示的子弹
	enemys:{}, //保存所有在游戏区域显示的敌机
	isCrashMyPlane: false, //是否碰撞到了我的飞机
	scoreNode: null, //分数的节点对象
	
	//方法:
	//初始化方法init
	init: function(){
		this.ele = document.getElementById("main_body");
		return this;
	},
	
	//开始游戏start
	start: function(){
		
		//加载游戏
		gameEngine.loading(function(){
			//现在已经加载游戏完毕
			//现在可以正式游戏了
			console.log("开始正式游戏");
			
			//1, 显示我的飞机, 并发射子弹
			myPlane.init().fire();
			
			//2, 开启键盘监听
			gameEngine.keyListening();
			
			//3, 创建敌机
			gameEngine.crateEnemy();
			
			//4, 碰撞检测
			gameEngine.crashListening();
			 
			//5, 显示分数
			gameEngine.showScore();
			
			//6, 让背景图移动
			gameEngine.move();
		});
		
	},
	
	//加载游戏
	loading: function(loadCallBack) {
		
		//显示logo
		var logo = document.createElement("div");
		logo.className = "logo";
		gameEngine.ele.appendChild(logo);
		
		//显示加载动画的图片
		var load = document.createElement("div");
		load.className = "loading";
		gameEngine.ele.appendChild(load);
		
		//开始加载动画
		var index = 0;
		var loadImgs = ["images/loading1.png", "images/loading2.png", "images/loading3.png"];
		var timer = setInterval(function(){
			
			//当运动到index==2时, 则游戏加载结束
			if (index >= 2) {
				clearInterval(timer); //关闭定时器
				//移除图片(logo,load)
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//回调
				loadCallBack(); 
			}
			else {
				//切换图片
				index++;
				load.style.background = "url(" + loadImgs[index%3] + ") no-repeat";
			}
		}, 500);
		
	},
	//键盘监听 
 	keyListening : function(){
 		var speed = 0; //初始速度
 		
 		window.onkeydown = function(evt){
 			var oEvent = evt || event;
 			var keycode = oEvent.keyCode;
 			if(keycode == 37){
 				speed = -10;
 			}
 			if(keycode == 39){
 				speed = 10;
 			}
 		}
 		
 		window.onkeyup = function(){
 			speed = 0;
 		}
 		//每隔三十毫秒
 		setInterval(function(){
 			var x = myPlane.ele.offsetLeft +　speed;
 			if(x < 0){
 				x = 0;
 			}
 			else if(x > gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth){
 				x = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
 			}
 			
 			myPlane.ele.style.left = x + "px";
 		},30);
 		
 	},
 	
 	//创建敌机
 	crateEnemy : function(){
 		//随机出现大型敌机
 		setInterval(createBig,6000);
 		function createBig(){
 			var flag = Math.random() > 0.7 ? true : false;    //30%的机会出现大型敌机
 			if(flag){
 				console.log("大型机");
 				var bigEnemy = new Enemy(Enemy.prototype.Enemy_Type_Large);
 				bigEnemy.init().move();
 			}

 		}
 		//随机出现中型敌机
 		setInterval(createMiddle,1000);
 		function createMiddle(){
 			var flag = Math.random() > 0.6 ? true : false;  //40%的机会出现中型敌机
 			if(flag){
 				console.log("中型机");
 				var middleEnemy = new Enemy(Enemy.prototype.Enemy_Type_Middle);
 				middleEnemy.init().move();
 			}
 		}
 		
 		//随机出现小型敌机
 		setInterval(createSmall,500);
 		function createSmall(){
 			var flag = Math.random() > 0.5 ? true : false;  //50%的机会出现小型敌机
 			if(flag){
 				var smallEnemy = new Enemy(Enemy.prototype.Enemy_Type_Small);
 				smallEnemy.init().move();
 			}
 		} 		
 		
 	},
	
	//碰撞检测
	crashListening : function(){
		
		setInterval(function(){
			
			for(var i in gameEngine.enemys){
				
				for(var j in gameEngine.bullets){
					
					if(isCrash(gameEngine.enemys[i].ele,gameEngine.bullets[j].ele)){
						
						gameEngine.bullets[j].boom();
						delete gameEngine.bullets[j];
						
						gameEngine.enemys[i].hurt();
					}
					
					
				}
				
				if(!gameEngine.isCrashMyPlane && isCrash(gameEngine.enemys[i].ele,myPlane.ele)){
					
					isCrashMyPlane = true;
					
					myPlane.boom(function(){
						alert("Game Over!");
						location.reload();

					});
				}
				
			}
			
			
			
			
			
		},30);
 
	},
	
	//显示分数
	showScore : function(){
		
		this.scoreNode = document.createElement("div");
		this.scoreNode.className = "score";
		this.scoreNode.innerHTML = "0";
		gameEngine.ele.appendChild(this.scoreNode);
		
	},
	
	//让背景图移动
	
	move : function(){
		var y = 0;
		setInterval(function(){
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
			
		},30);
		
	}
	
}






