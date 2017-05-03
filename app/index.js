

define(['jquery','com/carousel','com/a','com/goTop','com/loadmore','com/exposure'],function($ , Carousel, a, goTop,loadmore,exposure){
	Carousel.init($('.carousel'));

	new goTop($('body'));

   console.log(1)
    exposure.init($('.timeline-img img'),function($img){
    var imgUrl = $img.attr('data-src');
    $img.attr('src', imgUrl);
    })
var $loadmore=$('#loadmore'),
            $ct=$('#ct'),
            pageIndex=0


         $loadmore.on('click',function(){
              var lock=false;
              $.ajax({
                type: "GET",
                url: "/loadmore",
                data:{
                  index:pageIndex,
                  length:5

          },
                dataType: "JSON",
                success:function(ret){
                  if (!lock) {
                    for(i=0;i<ret.length;i++){
                      var li=$('<li></li>')
                      li.text(ret[i])
                      $ct.append(li)
                      }

                pageIndex=pageIndex+5
            lock=true; //当数据来临完毕的时候，再设为true，下次用户点击时正常
          /*
          var fragment=document.createDocumentFragment()
              for(i=0;i<ret.length;i++){
                var node=document.createElement('li')
                node.innerText=ret[i]
                fragment.appendChild(node);
              }
              $ct.append(fragment)
              pageIndex=pageIndex+5
              lock=true; //当数据来临完毕的时候，再设为true，下次用户点击时正常。
              */
        }else{
          return
        }

      },

    error:function(){
      alert('出错')
    }
  });
})
})

