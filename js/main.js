  



      requirejs.config({
        baseUrl:'js',
        paths:{
          'jquery':'lib/jquery'
        }
      });

      requirejs(['../app/index']);//入口