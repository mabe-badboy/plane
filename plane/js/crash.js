	  	
			  	// 碰撞检测
			  	
			  	function isCrash(obj1,obj2){
			  		
					  		  var t1  = obj1.offsetTop;									      // obj1 上边界
					  		  var b1 = obj1.offsetTop+obj1.offsetHeight;          // obj1 下边界
					  		  var l1  = obj1.offsetLeft;										  // obj1 左边界 
					  		  var r1  = obj1.offsetLeft+obj1.offsetWidth;			  // obj1 右边界	
					  		
					  		  var t2  = obj2.offsetTop;										  // obj2 上边界		
					  		  var b2 = obj2.offsetTop+obj2.offsetHeight;          // obj2 下边界
					  		  var l2  = obj2.offsetLeft;										  // obj2 左边界 	
					  		  var r2  = obj2.offsetLeft+obj2.offsetWidth;			  // obj2 右边界		
					  		
					  		//判断是否发生碰撞
					  		if (  t1>b2  ||  b1<t2  ||  l1>r2  ||  r1 <l2  ) {
					  			  return false;
					  		}else{
					  			  return true;
					  		}
			  	}
			  	
