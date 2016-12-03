

//游戏引擎(对象)
/*
 * 开始游戏, 加载游戏, 进入游戏主界面
 * 创建敌机, 控制移动我的飞机, 碰撞检测...
 */

		var  gameEngine={
			    
			   // 属性ele  是游戏的主界面 
			  ele:null,
			  bullets: {},    // 在游戏区域中的子弹
			   
			  scoreNode :null,    // 分数是
			   Enemys:{},    // 游戏区域内的敌机
			   
			  isCrashMyPlane:false,
			   init:function(){
			   	 this.ele=document.getElementById("main_body");
			   	  return this;
			   },
			   
			   
			   // 开始游戏
			   
			   start:function(){
			   	
			   			//加载游戏
			   			
		 			gameEngine.loading(function(){
		 				     
		 				       //现在已经加载完毕了
		 				       //1.显示我的飞机   并发射子弹
		 				       
		 				       plane.init().fire();
		 				       
		 				      // 2. 开启键盘监听
		 				      
		 				      gameEngine.keyListening();
		 				      
		 				      //3. 创建敌机
		 				      
		 				      gameEngine.createEnemy();
		 				      
		 				      //4. 检测碰撞
		 				      
		 				      gameEngine.crashListening();
		 				      
		 				      
		 				      //5.显示分数
		 				      
		 				      gameEngine.showScore();
		 				      
		 				      
		 				      // 6. 让背景图移动
		 				       
		 				      gameEngine.move();
		 				
		 			});
		 		
			   	
			   	
			   	
			   },
			   
			   // 加载游戏
			   loading:function(loadCallBack){
			   	  	
			   	  	   // 显示logo
			   	  		var logo=document.createElement("div");
			   	  		logo.className="logo";
			   	       gameEngine.ele.appendChild(logo);
			   	
			   	      // 显示加载的动画图片
			   	    
			   	     var load=document.createElement("div");
			   	     
			   	     load.className="load";
			   	     
			   	     gameEngine.ele.appendChild(load);
			   	     
			   	     // 开始加载动画
			   	     
			   	     var loadImgs=["images/loading1.png","images/loading2.png","images/loading3.png"];
			   	     
			   	     var index=0;
			   	     
			   	     var timer=setInterval(function(){
			   	     	  
			   	     	     // 加载完成
			   	     	  	    if (index>=loadImgs.length) {
			   	     	  	    	     clearInterval(timer);
			   	     	  	    	     
			   	     	  	    	     gameEngine.ele.removeChild(logo);
			   	     	  	    	     gameEngine.ele.removeChild(load);
			   	     	  	    	     
			   	     	  	    	     	//回调
											loadCallBack(); 
			   	     	  	    }
			   	     	 		else{
			   	     	 			
			   	     	 			   load.style.background="url("+loadImgs[index]+") no-repeat";
			   	     	 			   index++;
			   	     	 			   
			   	     	 		}
			   	     	
			   	     },500);
			   	    
			   	
			   },
		
		// 键盘事件监听
			keyListening:function(){
				
				   var speed=0;
				   
				   window.onkeydown=function(e){
				   			 var e = e || event;
				   	   
				   	    var keycode=e.keycode;
				   	    
				   	    if (keycode==37) {
				   	    	   speed=-10;
				   	    }
				   	    if (keycode==39) {
				   	    	  speed=10;
				   	    }
				   	   
				   }
				   window.onkeyup=function(){
				   	
				   			speed=0;
				   	
				   }
				  setInterval(function(){
				  	    var x=plane.ele.offsetLeft+speed;
				  	    
				  	    if (x<0) {
				  	    	 x=0;
				  	    }else if (x>gameEngine.ele.offsetWidth-plane.ele.offsetWidth) {
				  	    	x=gameEngine.ele.offsetWidth-plane.ele.offsetWidth;
				  	    }
				  	  
				  		plane.ele.style.left=x+"px";
				  		
				  },30);
				
				
			},
			
			
			// 创建敌机
			
			createEnemy:function(){
				    
				    //随机出现大型敌机
				    setInterval(createLarge,6000);
					function  createLarge(){
						   // 出现的概率
						   var  flag=Math.random()>0.7 ? true : false ;
						   
						   if (flag) {
						   	    var bigEnemy=new Enemy(Enemy.prototype.Enemy_type_Large);
						   	      console.log("大");
						   	    bigEnemy.init().move();
						   }
					}
					
				
				   
				    //随机出现中型敌机
				    setInterval(createMiddle,1000);
					function  createMiddle(){
						   // 出现的概率
						   var  flag=Math.random()>0.6 ? true : false ;     // 每两秒检测一次 有30%的几率出现中型飞机
						   
						   if (flag) {
						   	    var middleEnemy=new Enemy(Enemy.prototype.Enemy_type_Middle);
						   	     console.log("中");
						   	    middleEnemy.init().move();
						   }
					}
					   
					   
				    //随机出现小型敌机
				    setInterval(createSmall,500);
					function   createSmall(){
						
						   // 出现的概率
						   var  flag=Math.random()>0.5 ? true : false ;
						   
						   if (flag) {
						   	    var smallEnemy=new Enemy(Enemy.prototype.Enemy_type_Small);
						   	      console.log("小");
						   	    smallEnemy.init().move();
						   }
					}
					
			},
			
			   
		  crashListening:function(){
		  	 	
		  	 	// 定时检测是否碰撞
		  	 	
		  	 	setInterval(function(){
		  	 		    
		  	 		     for ( var i  in  gameEngine.Enemys) {
		  	 		     	
		  	 		     	       for ( var j  in gameEngine.bullets) {
		  	 		     	       	             
		  	 		     	       	             if (isCrash(gameEngine.Enemys[i].ele,gameEngine.bullets[j].ele)) {
		  	 		     	       	             	
		  	 		     	       	             	    gameEngine.bullets[j].boom();
		  	 		     	       	             	    delete gameEngine.bullets[j];
		  	 		     	       	             	    
		  	 		     	       	             	    gameEngine.Enemys[i].hurt();
		  	 		     	       	             	
		  	 		     	       	             }
		  	 		     	       	             
		  	 		     	       }
		  	 		     	       
		  	 		     	       if (!gameEngine.isCrashMyPlane && isCrash(gameEngine.Enemys[i].ele,plane.ele)) {
		  	 		     	       	         
		  	 		     	       	         gameEngine.isCrashMyPlane=true;
		  	 		     	       	             
		  	 		     	       	             plane.boom(function(){
		  	 		     	       	             	   alert("你挂了！");
		  	 		     	       	             	   
		  	 		     	       	             	    location.reload();
		  	 		     	       	             });
		  	 		     	       	             
		  	 		     	       }
		  	 		     	
		  	 		     	
		  	 		     }
		  	 		
		  	 		
		  	 	},30);
		  		
		  },
		  
		  
		  // 显示分数
		  
		  showScore:function(){
		  	   
		  	     this.scoreNode=document.createElement("div");
		  	     
		  	     this.scoreNode.className="score";
		  	     
		  	     this.scoreNode.innerHTML="0";
		  	     
		  	     gameEngine.ele.appendChild(this.scoreNode);
		  	
		  },
		  
		  
		  // 让背景图移动
		  
		  move:function(){
		  	
		  	    var y=0 ; 
		  	    
		  	    setInterval(function(){
		  	    	
		  	    	 gameEngine.ele.style.backgroundPositionY=y++ +"px";
		  	    	
		  	    },50);
		  	
		  	
		  	
		  }
			   
			
			   
			
  }




























