

define(['jquery'],function($){

var goTop=(function(){
		function GoTop($ct){
		  this.ct=$ct
		  this.target=$('<button>顶部</button>')
		  this.target.css({
		    width:'100px',
		    height:'50px',
		    position:'fixed',
		    right:'100px',
		    bottom:'100px',
		    opacity:0.6,

		  })
		  this.bindEvent()
		  this.createNode()
		}

		GoTop.prototype.bindEvent=function(){
		  var _this=this;
		  $(window).on('scroll',function(){
		    if($(window).scrollTop()<150){
		          _this.target.hide()
		    }else{
		      _this.target.show()
		    }

		  })
		  
		  
		  this.target.on('click',function(){
		    $(window).scrollTop(0)
		  })
		}



		GoTop.prototype.createNode=function(){
		  this.ct.append(this.target)
		  this.target.hide()
		}

		return GoTop;

})();
	return goTop;
})






