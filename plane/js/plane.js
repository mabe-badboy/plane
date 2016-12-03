

//我方飞机

var  plane={
	    // 属性ele
	    ele: null,
	 // 获取到的 选取难度的值
     fireInterval: 80,
     // 初始化对象
     init:function(){
     	
     	 this.ele=document.createElement("div");
     	 this.ele.className="plane";
     	 
     	 gameEngine.ele.appendChild(this.ele);    // 追加到游戏区域中
     	 
     	 // 位置     游戏区域的宽度 减去 飞机的一半宽度就是飞机的 left值
     	 this.ele.style.left=gameEngine.ele.offsetWidth - this.ele.offsetWidth/2+"px";
     	 this.ele.style.bottom=0;
     	
     	// 飞机拖拽
     	this.startDrag();
     	
     	 return this;
     },
	
	// 发射子弹
	//this.fireInterval  按照点击给出的困难度控制发射子弹的速度
	fire:function(){
		
		  this.timer=setInterval(function(){
		  	// 调用子弹构造函数   实例化子弹
		  	      var bullet=new Bullet();
		  	       bullet.init().move();
		  	
		  },this.fireInterval);
		
	},
	
	// 飞机拖拽
	startDrag:function(){
		    this.ele.onmousedown=function(e){
		    	   var e= e || event ;
		    	   
		    	   var divX=e.offsetX;
		    	   var divY=e.offsetY;
		    	   
		    	     document.onmousemove=function(e){
		    	     	    var e = e || event ;
		    	     	    
		    	     	    var x=e.clientX-gameEngine.ele.offsetLeft-divX;
		    	     	    var y=e.clientY-divY;
		    	     	    
		    	     	    // 移除游戏区域左边界
		    	     	     if (x<0) {
		    	     	     	   x=0;
		    	     	     }
		    	     	     // 移除游戏区域右边界
		    	     	     else if(x>gameEngine.ele.offsetWidth-plane.ele.offsetWidth){
		    	     	     	     
		    	     	     	     x=gameEngine.ele.offsetWidth-plane.ele.offsetWidth;
		    	     	     }
		    	     	   
		    	     	    plane.ele.style.left=x+"px";
		    	     	    plane.ele.style.top=y+"px";
		    	     }
		    	 
		    	    document.onmouseup=function(){
		    	    	
		    	    	     document.onmousemove=null;
		    	    	     document.onmouseup=null;
		    	    }
		    	  
		   } 	 
		    	 
	  },
		    
	    // 飞机爆炸
	  	boom : function(callback){
	    	      
	    	    clearInterval(this.timer);
	    	    
	    	    var dieImgs=["images/me_die1.png","images/me_die2.png","images/me_die3.png","images/me_die4.png"];
	    	    var index=0;
	    	    
	    	    var dieTimer=setInterval(function(){
	    	    	  
	    	    	      if (index>=dieImgs.length) {
	    	    	      	    clearInterval(dieTimer);
	    	    	      	    // 移除飞机对象
	    	    	      	    gameEngine.ele.removeChild(plane.ele);
	    	    	      	    
	    	    	      	    // 回调函数
	    	    	      	    callback();
	    	    	      	    
	    	    	      }else{
	    	    	      	
	    	    	      	     plane.ele.style.background="url("+dieImgs[index]+") no-repeat";
	    	    	      	     index++;
	    	    	      }
	    	    	    
	    	    	
	    	    },50);
	    	    
	    	
	    }

	
	
	
	
	
}


