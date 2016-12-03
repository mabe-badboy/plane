




function Bullet(){
	
	this.ele=document.createElement("div");
	
	//gameEngine.bullets对象中的id
	this.id=parseInt(Math.random()*100000)+" ";
	
	// 子弹对象初始化
	this.init=function(){
	     this.ele.className="bullet";	
	     gameEngine.ele.appendChild(this.ele);
	     //gameEngine.bullets对象中的id   存入到gameEngine.Bullets 里面 它的id就是 this.id
	     gameEngine. bullets[this.id]=this;
	     
	     //位置
	     var left=plane.ele.offsetLeft+plane.ele.offsetWidth/2-this.ele.offsetWidth/2;
	     
	     this.ele.style.left=left+"px";
	     this.ele.style.top=plane.ele.offsetTop-this.ele.offsetHeight+"px";
	     
	     return this;
	     
	};
	
	// 子弹向上移动
	this.move=function(){
		
		  var self=this;
		  
		  this.timer=setInterval(function(){
		  	
		  	    if (self.ele.style.top<-self.ele.offsetHeight) {
		  	    	
		  	    	    clearInterval(self.timer);
		  	    	      // 移除子弹
		   	      	    gameEngine.ele.removeChild(self.ele);
		   	      	    
		   	      	    //删除gameEngine.bullets对象中的id为self.id 的子弹
		   	      	    delete gameEngine.Bullets[self.id];
		   	      	    
		  	    }else{
		  	    	
		  	    	 self.ele.style.top= self.ele.offsetTop-10+"px";
		  	    	
		  	    }
		  	
		  },30);
		
		
	};
	
	// 子弹爆炸
	
	this.boom=function(){
		    
		    // 清除move 方法里面的定时器
		   clearInterval(this.timer);
		   this.ele.className="boom_bullet";
		   
		   var self=this;
		   
		   // 背景图的数组
		   var dieImgs=["images/die1.png","images/die2.png"];
		   // 下标
		   var index=0;
		   // 定时更换图片的定时器
		   var dietimer=setInterval(function(){
		   	      if (index>=dieImgs.length) {
		   	      	      clearInterval(dietimer);
		   	      	      // 移除子弹
		   	      	    gameEngine.ele.removeChild(self.ele);  
		   	      	      
		   	      }else{
		   	      	  self.ele.style.background="url("+dieImgs[index]+") no-repeat";
		   	      	  index++;
		   	      }
		   	      
		   	
		   },30);
		   
	}
}
