  







define(['jquery'],function($){
      (function(){
        var $loadmore=$('#loadmore'),
            $ct=$('#ct'),
            pageIndex=0,
            isOver=false


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
                if (ret.status===0&&!isOver) {
                  //如果数据到来了，然后....
                appendHtml(ret.data)
                pageIndex++
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

            function appendHtml(newsData){
                  if (newsData.length===0) {
                    isOver=true;

                    $('#ct').append('<p>没有更多数据了</p>')
                    return 
                  }

                  var htmls=''
                  $.each(newsData, function(){
                    htmls += '<li>';
                    htmls += '<img src="' + this.img +'">';
                    htmls += '<p>'+this.title+'</p>';
                    htmls += '</li>';
                 })

                  $('#ct').append(htmls);
              }

      },

        error:function(){
          alert('出错')
        }
      });
    })

    })()
        



})







