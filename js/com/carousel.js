 


 define(['jquery'],function($){

var Carousel = (function(){
    function _Carousel($ct){
      this.$ct = $ct;
      this.init();
      this.bind();
    }
    _Carousel.prototype.init = function(){
      var $imgCt = this.$imgCt = this.$ct.find('.img-ct'),
              $preBtn = this.$preBtn = this.$ct.find('.btn-pre'),
              $nextBtn = this.$nextBtn = this.$ct.find('.btn-next'),
              $bullet = this.$bullet = this.$ct.find('.bullet');
      
      var $firstImg = $imgCt.find('li').first(),
              $lastImg = $imgCt.find('li').last();
      
      this.curPageIndex = 0;
      this.imgLength = $imgCt.children().length;
      this.isAnimate = false;
      this.imgWidth = $firstImg.width();
      
      $imgCt.prepend($lastImg.clone());
      $imgCt.append($firstImg.clone());
      
      $imgCt.width( this.imgWidth * $imgCt.children().length );
      $imgCt.css({"left":0-this.imgWidth});
    };
    
    _Carousel.prototype.bind = function(){
      var _this = this;
      this.$preBtn.on('click',function(e){

        e.preventDefault();
        _this.playPre();
      });
      
      this.$nextBtn.on('click',function(e){
        e.preventDefault();
        _this.playNext();
      });
      
      this.$bullet.on('click','li',function(e){
        var idx = $(this).index();
        if(idx>_this.curPageIndex){
          _this.playNext(idx-_this.curPageIndex);
        }else if (idx<_this.curPageIndex) {
          _this.playPre(_this.curPageIndex-idx);
        }
      })
    };
    
    _Carousel.prototype.playPre = function(idx){
      var _this = this,
              idx = idx || 1;
      if(this.isAnimate) return;
      this.isAnimate = true;
      this.$imgCt.animate({
        left:'+='+this.imgWidth*idx
      },function(){
        _this.curPageIndex = (_this.imgLength+_this.curPageIndex-idx)%_this.imgLength;
        _this.setBullet();
        if(_this.curPageIndex === _this.imgLength-1){
          _this.$imgCt.css({left:0-_this.imgWidth*_this.imgLength});
        }
      });
      this.isAnimate = false;
      
    };
    
    _Carousel.prototype.playNext = function(idx){
      var _this = this,
              idx = idx || 1;
      if(this.isAnimate) return;
      this.isAnimate = true;
      this.$imgCt.animate({
        left:'-='+this.imgWidth*idx
      },function(){
        _this.curPageIndex = (_this.curPageIndex+idx)%_this.imgLength;
        _this.setBullet();
        if(_this.curPageIndex === 0){
          _this.$imgCt.css({left:0-_this.imgWidth});
        }
      });
      this.isAnimate = false;
      
    };
    
    _Carousel.prototype.setBullet = function(){
      this.$bullet.children().removeClass('active')
              .eq(this.curPageIndex).addClass('active')
    };
    
    return {
      init:function($ct){
        $ct.each(function(index,node){
          new _Carousel($(node));
        })
      }


    }






  })();

  return Carousel;





 })
