/*
global 
PT:true, SITE:true, 

ScrollMagic:true, 
TimelineMax:true, TweenMax:true, TweenLite:true, SplitText:true, 
Linear:true, Elastic:true, Power1:true, Power2:true, Power3:true, Power4:true, Bounce:true, 

FastClick:true, enquire:true, Justice:true, 
Modernizr:true, jQuery:true, ssm:true

*/
    


// @codekit-prepend "pt/pt-base-v11.js"  
 
    

    
// @ codekit-prepend "pt/pt-base-lib-bundle-v9.js"  





$(function() { 
    // console.log('site specific js file');


	// SITE.addOnLoad(
	// 	sayHi
	// );

	// function sayHi(){
	// 	console.log('!!!!!!! saying Hi !!!!!!');
	//     // SITE.monitorFPS();
	// }

    // SITE.preloader();
    
    SITE.init();

    // if( Modernizr.mq('(min-width: 900px)') ){
    //     console.log('LARGER THAN 900px ')
    // }
    
});

  


var SITE = { 

    _VAR:''
    // ,_SITE_NAV: ''//$('#sitenav')
    



    ,init: function() {

        // console.log('SITE.init()');


        SITE.buildSIDR();


    }




    ,newFunction: function() {

    }




















/*

    <a id="sidr-menu-btn" href="#sidr-main"><i class="fa fa-bars"></i></a>

    <div id="site-topbar">

        <div class="logoholder"><img class="img-responsive" src="assets/img/logo-bci-white.png" alt=""></div>

    </div>


    <div id="sidr-main">
        <a id="sidr-close-btn" href="#"><i class="fa fa-chevron-left"></i></a>

        <nav>
            <ul>
                <li><a href="#">Sample link 1</a></li>
                <li>
                    <a href="#">Sample link 2</a>
                    <ul>
                        <li><a href="#">Child link 1</a></li>
                        <li><a href="#">Child link 2</a></li>
                        <li><a href="#">Child link 3</a></li>
                    </ul>
                </li>
                <li><a href="#">Sample link 3</a></li>
                <li><a href="#">Sample link 4</a></li>
                <li><a href="#">Sample link 5</a></li>
                <li><a href="#">Sample link 6</a></li>
            </ul>
        </nav>


    </div>

*/


    ,buildSIDR: function(){

        console.log('buildSIDR()');


        // ADD A COVER TO THE PAGE TO SHOW WHEN THE MENU IS OPEN:
        $('body').prepend('<div class="sidr-cover"></div>');

        var _sidrCover = $('.sidr-cover');


        // SET THE COVER TINT TO INVISIBLE:
        TweenMax.set(_sidrCover, {autoAlpha:0});



        // ON CLICK, CLOSE THE SIDR MENU:
        _sidrCover.on('click', function(e){
            $.sidr('close', 'sidr-main');
        });
        
        $('#sidr-close-btn').on('click', function(e){
            $.sidr('close', 'sidr-main');
        });
          



        // TURNS THE NESTED <ul>'s INTO ACCORDION NAV:
        $('#sidr-main nav ul').navgoco();
 



        // THE ACTUAL SIDR MENU CODE:
        $('#sidr-menu-btn').sidr({

          speed: 200
          ,displace:false
          ,name:'sidr-main'
          // ,side:'left'
          // ,body:'.viewport'

          ,onOpen: function () {
            console.log('onOpen');
            TweenMax.to(_sidrCover, 0.3, {autoAlpha:1});
            
            // $('html').removeClass('sidr-is-closed');
            // $('html').addClass('sidr-is-open');
          }

          ,onClose: function () {
            console.log('onClose');
            TweenMax.to(_sidrCover, 0.3, {autoAlpha:0});
          
            // $('html').removeClass('sidr-is-open');
            // $('html').addClass('sidr-is-closed');
          }

          // ,onOpenEnd: function () {
          //   console.log('onOpenEnd');
          // }

          // ,onCloseEnd: function () {
          //   console.log('onCloseEnd');
          // }

        });





        function resizer() {
            console.log('resizer()');

            TweenMax.to(['.viewport', '#site-topbar'], 0.3, { left:$('#sidr-main').width() , width:$(window).width() - $('#sidr-main').width() });
            
        }


        function startResize() {
            console.log('startResize()');
            $(window).resize(resizer);
           
            TweenMax.to(['.viewport', '#site-topbar'], 0.3, { left:$('#sidr-main').width() , width:$(window).width() - $('#sidr-main').width() });
        
        }


        function endResize() {
            console.log('endResize()');
            $(window).off("resize", resizer);
            TweenMax.to(['.viewport','#site-topbar'], 0.3, { left:0, width:'100%' });

        }







        PT._SSM.addStates([
            {
                id: 'sidr-show',
                query: '(min-width: 1200px)',
                onEnter: function(){  
                    startResize();
                    $.sidr('open', 'sidr-main');
                },
                onLeave: function(){
                    endResize();
                    $.sidr('close', 'sidr-main');
                }
            }
        ]);





    }





 








};



















 

