


       define(['jquery'],function(){

        var pageIndex=0,
            isOver=false,
            isNewsArrive=true;
        getNews();

        $(window).on('scroll',function(){
                  if (isShow($('.load-more')) && !isOver&& isNewsArrive) {
                     getNews();
                 }
        })

        function getNews(){
            isNewsArrive=false;
            $.ajax({
              url:"/getNews",
              type:'GET',
              dataType:'json',
              data:{
                page:pageIndex,
              },
              success:function(ret){
                isNewsArrive=true;
                if (ret.status===0) {
                  //如果数据到来了，然后....
                 appendHtml(ret.data)
                 pageIndex++;
                 if (isShow($('.load-more')) && !isOver && isNewsArrive) {
                     getNews();
                 }


                }
                

              },
              
              error:function(){
                alert('出错了')
              }
            })
        }




        //判断是否出现在可视窗口
        function isShow($nodes){
          var offsetTop=$nodes.offset().top,
              scrollTop=$(window).scrollTop(),
              windowHeight=$(window).height();
            if (scrollTop+windowHeight>offsetTop&&offsetTop>scrollTop) {
              return true;
            }else{
              return false;
            }  
        }



        function appendHtml(newsData){
            if (newsData.length===0) {
              isOver=true;

              $('.container').append('<p>没有更多数据了</p>')
              return 
            }

            var htmls=''
            $.each(newsData, function(){
              htmls += '<li class="item">';
              htmls += '<a href="' + this.link + '">';
              htmls += '<div class="thumb"> <img src="' + this.img +'"></div>';
              htmls += '<h2>'+this.title+'</h2>';
              htmls += '<p>'+this.brif+'</p>';
              htmls += '</a></li>';
           })

            $('.news').append(htmls);
        }



      })