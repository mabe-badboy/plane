
// 敌机

//type  敌机的类型  （大    中     小）


function Enemy(type){
	 this.ele=document.createElement("div");
	 
	 this.hp=0;    //血量
	 
	 this.speed=0;   // 速度
	 
	 this.dieImgs=[],   // 爆炸时状态的数组
	 
	 this.score=0;    // 分数
	 
	 // 当前敌机在gameEngine.Enemy中的id
	 this.id=parseInt(Math.random()*100000)+" ";
	 
	 // 敌机初始化的方法
	 
	 this.init=function(){
	 			
	 	    switch(type){
	 	    	// 当传入要创建的是大型敌机的时候
	 	    	 case this.Enemy_type_Large:
	 	    	 
	 	    	 			this.ele.className="enemy-large";
	 	    	 			// 血量
	 	    	 			 this.hp=this.Enemy_HP_Large;
	 	    	 			 // 移动的速度
	 	    	 			 this.speed=this.Enemy_Speed_Large;
	 	    	 			 // 爆炸是的变换图片
	 	    	 			 this.dieImgs=["images/plane3_die1.png","images/plane3_die2.png","images/plane3_die3.png","images/plane3_die4.png","images/plane3_die5.png","images/plane3_die6.png"]
	 	    	 			 this.score=30;
	 	    	 			 
	 	    	 			 break;
	 	    	 	// 当传入要创建的是中型敌机的时候		 
	 	          case this.Enemy_type_Middle:
	 	    	 
	 	    	 			this.ele.className="enemy-middle";
	 	    	 				// 血量
	 	    	 			 this.hp=this.Enemy_HP_Middle;
	 	    	 			 // 移动的速度
	 	    	 			 this.speed=this.Enemy_Speed_Middle;
	 	    	 			 	 // 爆炸是的变换图片
	 	    	 			 this.dieImgs=["images/plane2_die1.png","images/plane2_die2.png","images/plane2_die3.png","images/plane2_die4.png"];
	 	    	 			 this.score=20;
	 	    	 			 
	 	    	 			 break;
	 	    	 			 
	 	    	  	// 当传入要创建的是小型敌机的时候		 			 
	 	    	  case this.Enemy_type_Small:
	 	    	 
	 	    	 			this.ele.className="enemy-small";
	 	    	 			
	 	    	 				// 血量
	 	    	 			 this.hp=this.Enemy_HP_Small;
	 	    	 			  // 移动的速度
	 	    	 			 this.speed=this.Enemy_Speed_Small;
	 	    	 			  	 // 爆炸是的变换图片
	 	    	 			 this.dieImgs=["images/plane1_die1.png","images/plane1_die2.png","images/plane1_die3.png"];
	 	    	 			 this.score=10;
	 	    	 			 
	 	    	 			 break;
	 	    	 			 
	 	    }
	 	   
	 	     gameEngine.ele.appendChild(this.ele);
	 	     
	 	     gameEngine.Enemys[this.id]=this;
	 	
	 	     // 位置
	 	     
	 	     var left=Math.random()*(gameEngine.ele.offsetWidth - this.ele.offsetWidth);
	 	     
	 	     this.ele.style.left=left+"px";
	 	     this.ele.style.top=-gameEngine.ele.offsetHeight+"px";
	 	     
	 	     return this;
	 	
	 }
	 
	 
	 
	 // 被子弹击中的时候
	 this.hurt=function(){
	 	
	 	
	 	     this.hp--;               // 掉一点血
	 	     
	 	     // 当血量没有的时候发生爆炸
	 	     if (this.hp==0) {
	 	     	    this.boom();   // 爆炸
	 	     	    // 添加分数
	 	     	    //gameEngine.scoreNode.innerHTML-0   字符串转化成number 类型
	 	     	    gameEngine.scoreNode.innerHTML=(gameEngine.scoreNode.innerHTML-0)+this.score;
	 	     	    
	 	     }
	 };
	 
	 // 敌机向下移动
	 this.move=function(){
	 	
	 	      var self=this;
	 	      
	 	      this.timer=setInterval(function(){
	 	      	
	 	      	       if (self.ele.offsetTop > gameEngine.ele.offsetHeight-self.ele.offsetHeight) {
	 	      	       	             clearInterval(self.timer);
	 	      	       	             
	 	      	       	             gameEngine.ele.removeChild(self.ele);
	 	      	       	             
	 	      	       	             delete  gameEngine.Enemys[self.id];
	 	      	       }
	 	      	       else{
	 	      	       	
	 	      	       	     self.ele.style.top=self.ele.offsetTop+self.speed+"px";
	 	      	       	 
	 	      	       }
	 	      	
	 	      	
	 	      },30);
	 	
	 };
	 
	 // 敌机发生爆炸
	 this.boom=function(){
	 	    	var self=this;
	 	    	// 清除移动函数中的定时器  让其不在移动
	 	    	clearInterval(this.timer);
	 	    	
	 	    	var index=0;
	 	    
	 	    	var dieTimer=setInterval(function(){
	 	    		    if (index>=self.dieImgs.length) {
	 	    		    	   clearInterval(dieTimer);
	 	    		    	       // 移除子弹
		   	      	    gameEngine.ele.removeChild(self.ele);
		   	      	    
		   	      	    delete gameEngine.Enemys[self.id];
	 	    		    }else{
	 	    		    	
	 	    		    	self.ele.style.background="url("+self.dieImgs[index++]+") no-repeat";
	 	    		    	
	 	    		    }
	 	    		
	 	    		
	 	    	},50);
	 	
	 	
	 };
	 
	
}

 Enemy.prototype={
 	  Enemy_type_Large:1,     // 大型敌机
 	  Enemy_type_Middle:2,    // 中型敌机
 	  Enemy_type_Small:3,    // 小型敌机
 	  
 	  Enemy_HP_Large:8,
 	  Enemy_HP_Middle:4,
 	  Enemy_HP_Small:1,
 	  
 	  Enemy_Speed_Large:2,
 	  Enemy_Speed_Middle:4,
 	  Enemy_Speed_Small:8,
 }
 	
 
 
