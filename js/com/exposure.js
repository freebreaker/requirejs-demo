                                                              



 define(['jquery'],function(){

var exposure=(function(){
    function Exposure($target,callback){
  this.$target=$target;
  this.bind();
  this.callback=callback;
  this.show();
}


Exposure.prototype.bind=function(){
  var _this=this;
  $(window).on('scroll',function(){
    _this.show()
  })
}



Exposure.prototype.show=function(){
  if(this.isShow(this.$target)){
    this.callback(this.$target)
  }
}


Exposure.prototype.isShow=function($nodes){
  var windowHeight = $(window).height(),
      scrollTop = $(window).scrollTop(),
      offsetTop = this.$target.offset().top,
      nodeHeight = this.$target.height();
  if(windowHeight + scrollTop > offsetTop && scrollTop < offsetTop + nodeHeight){
    return true;
  }else{
    return false;
  }
}



/*

$('.container img').each(function(idx,img){
  new Exposture($(img),function($img){
    showImg($img);
  })
})
*/
//var Lazy = (function(){

  return {

    init: function($targets, callback){
      $targets.each(function(idx, target){
        new Exposure($(target), callback);
      })

    },
    one: function($targets, callback){
      //如果只要加载一次，那么这里可以用
      $targets.each(function(idx,target){
        new Exposure($(target),callback);
      })
    }

  }
//})


function showImg($img){
    var imgUrl = $img.attr('data-src');
    $img.attr('src', imgUrl);
}


function alreadyShow($img){
      if (!$img.hasClass('alreadyShow')) {
      console.log(true)
      $img.addClass('alreadyShow')
    }
  }

})()

/*
Lazy.init($('.container img'), function($node){
  showImg($node);
});

Lazy.one($('.container img'), function($node){
  alreadyShow($node);
});
*/

return exposure;



})