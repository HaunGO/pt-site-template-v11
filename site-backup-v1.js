/*
global 
PT:true, SITE:true, 

ScrollMagic:true, 
TimelineMax:true, TweenMax:true, TweenLite:true, SplitText:true, 
Linear:true, Elastic:true, Power1:true, Power2:true, Power3:true, Power4:true, Bounce:true, 

FastClick:true, enquire:true, Justice:true, 
Modernizr:true, jQuery:true, ssm:true

*/
    


// @ codekit-prepend "pt/pt-base-v9.js"  
 
    

    
// @codekit-prepend "pt/pt-base-lib-bundle-v9.js"  





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

    _SITE_NAV: ''//$('#sitenav')

    
    ,_Size:'xs'
    

    // SIMPLE STATE MANAGER.js  
    ,_SSM: ssm



    // THIS IS THE GLOBAL SCROLLMAGIC CONTROLLER FOR ALL SCROLLING INTERACTION IN THIS FILE:
    ,SM_CTRL: new ScrollMagic.Controller()



    ,init: function() {

        // console.log('SITE.init()');
        
        // ADDS BREAKPOINT SIZE INDICATOR :
        $('body').prepend('<div class="pt-sizer"></div>');
        





        // SITE.buildSIDR();


        $('body').prepend('<div class="sidr-cover"></div>');

        TweenMax.set('.sidr-cover', {autoAlpha:0});


        $('.sidr-cover').on('click', function(e){
            $.sidr('close', 'sidr-main');
        });
        

        $('#sidr-close-btn').on('click', function(e){
            $.sidr('close', 'sidr-main');
        });
          

        $('#sidr-main nav ul').navgoco();
 

        $('#sidr-menu-btn').sidr({

          speed: 200
          ,displace:false
          // ,method:'toggle',
          ,name:'sidr-main'
          // ,side:'left'
          // ,body:'.viewport'

          ,onOpen: function () {
            console.log('onOpen');
            // $('body').css('background', 'red');
            // $('body').addClass('sidr-is-open');
            // $('body').removeClass('sidr-is-closed');
            // TweenMax.to('.viewport', 0.2, { left:$('#sidr-main').width() , width:$(window).width() - $('#sidr-main').width() });
            // TweenMax.to('#site-topbar', 0.2, { width:$(window).width() - $('#sidr-main').width() });
          
            // if(SITE._Size != 'lg'){
                TweenMax.to('.sidr-cover', 0.3, {autoAlpha:1});
            // }
            // $('html').removeClass('sidr-is-closed');
            // $('html').addClass('sidr-is-open');
          }

          ,onClose: function () {
            console.log('onClose');
            // $('body').css('background', 'green');
            // $('body').removeClass('sidr-is-open');
            // $('body').addClass('sidr-is-closed');
            // TweenMax.to('.viewport', 0.2, { left:0, width:'100%' });
            // TweenMax.to('#site-topbar', 0.2, { width:'100%' });

            // if(SITE._Size != 'lg'){
                TweenMax.to('.sidr-cover', 0.3, {autoAlpha:0});
            // }
          
            // $('html').removeClass('sidr-is-open');
            // $('html').addClass('sidr-is-closed');
          }

          // ,onOpenEnd: function () {
          //   console.log('onOpenEnd');
          //   // $('body').css('background', 'grey');
          // }

          // ,onCloseEnd: function () {
          //   console.log('onCloseEnd');
          //   // $('body').css('background', '');
          // }

        });





        // $( window ).resize(function () {
        //   if(SITE._Size === 'lg'){

        //   }else{
        //       $.sidr('close', 'sidr-main');
        //   }
        // });
 



        function resizer() {
            // $("#content").width(newWidth);
            // $("#content").height(newHeight);
            // TweenMax.set('#site-topbar', { width:$(window).width() - $('#sidr-main').width() });

            TweenMax.to(['.viewport','#site-topbar'], 0.3, { left:$('#sidr-main').width() , width:$(window).width() - $('#sidr-main').width() });
            // TweenMax.set('.viewport', { width:$(window).width() - $('#sidr-main').width() });
            
        }

        function startResize() {
            console.log('startResize()');
            $(window).resize(resizer);
           
            TweenMax.to(['.viewport','#site-topbar'], 0.3, { left:$('#sidr-main').width() , width:$(window).width() - $('#sidr-main').width() });
            // TweenMax.to('.viewport', 0.2, { width:$(window).width() - $('#sidr-main').width() });
        }

        function endResize() {
            console.log('endResize()');
            $(window).off("resize", resizer);
            TweenMax.to(['.viewport','#site-topbar'], 0.3, { left:0, width:'100%' });

        }




        // MANAGES MEDIA-QUERIES BREAKPOINTS:

        SITE._SSM.addStates([
            {
                id: 'xs',
                query: '(min-width: 300px) and (max-width: 768px)',
                onEnter: function(){
                    // console.log('xs');
                    SITE._Size = 'xs';
                    // SITE._JPM.on();
                },
                onLeave: function(){
                    // SITE._JPM.off();
                }
            },
            {
                id: 'sm',
                query: '(min-width: 768px) and (max-width: 992px)',
                onEnter: function(){
                    // console.log('sm');
                    SITE._Size = 'sm';
                    // SITE._JPM.on();
                }
            },
            {
                id: 'md',
                query: '(min-width: 992px) and (max-width: 1200px)',
                onEnter: function(){
                    // console.log('md');
                    SITE._Size = 'md';
                    // SITE._JPM.close();
                    // SITE._JPM.off();
                }
            },
            {
                id: 'lg',
                // query: '(min-width: 1200px) and (max-width: 1500px)',
                query: '(min-width: 1200px)',
                onEnter: function(){
                    // console.log('lg');
                    SITE._Size = 'lg';
                    // SITE._JPM.off();
                    // SITE._JPM.open();
                    startResize();
                    $.sidr('open', 'sidr-main');
                    // $('#sidr-menu-btn').sidr({displace:false});
                },
                onLeave: function(){
                    endResize();
                    $.sidr('close', 'sidr-main');
                }
            }
            // ,{
            //     id: 'xl',
            //     query: '(min-width: 1500px)',
            //     onEnter: function(){
            //         // console.log('xl');
            //         // SITE._JPM.off();
            //         SITE._Size = 'xl';
            //     }
            // }
        ]);








/*
        // EVENT LISTENERS FOR THE NAVBAR TOGGLE:
        $( ".navbar-collapse" ).on( "show.bs.collapse", function() {
            // console.log( "show collapse" );
            SITE._SITE_NAV.addClass('navopen');
        }).on( "hidden.bs.collapse", function() {
            // console.log( "hide collapse" );
            SITE._SITE_NAV.removeClass('navopen');
        });

*/




/*
        // IF WE'RE ON THE HOME PAGE, SCROLL TO THE TOP, IF NOT, GO TO THE HOME PAGE:
        $('.navbar-brand').on('click', function(e) {
            if($('.page-home').length ){
                e.preventDefault();
                TweenMax.to(window, 0.5, { scrollTo:{ y:0 }, ease:Power4.easeInOut } );                
            }
        });
*/




/*
        // TRIGGER FOR NAVBAR .bg-solid CLASS
        // (SETS BG FOR NAVBAR AND SHOWS NAVBAR LOGO)
        var smScene1 = new ScrollMagic.Scene({
            triggerElement: $('body')
            ,triggerHook: '0'
        })
        .setClassToggle(SITE._SITE_NAV, "bg-solid")
        .offset(100)
        .addIndicators()
        .addTo(SITE.SM_CTRL);


*/








        // SITE.addRandomClass('.header', ['bg-knoxville']);



        SITE.checkPreloader();

        SITE.fastClick();

        SITE.runStickies();
        
        SITE.runImgSwaps();

        // SITE.buildNavSpy();

        SITE.buildTransitions(true);

  




        // SITE.monitorFPS();

    }






    ,newFunction: function() {

    }









    ,addRandomClass: function(_obj, _arr) {
        console.log('addRandomClass()');
        var arr = _arr;
        var obj = $(_obj);
        obj.addClass( arr[ Math.floor(Math.random() * arr.length)  ]  );
    }














































 





    ,buildNavSpy: function() {
        
        // WE MUST WAIT UNTIL THE CONTENT IS DONE LOADING BEFORE 
        // CALCULATING THE HEIGHTS OF THE SCROLL SPY SECTIONS:
        SITE.addOnLoad(
           doNow
        );

        function doNow(){

            // console.log('doNow() buildNavSpy()');

            // var _triggerHook =  ( SITE._QuickContact.outerHeight() + SITE._SITE_NAV.outerHeight() )  / $(window).height() ;
            // var _triggerHook =  ( SITE._SITE_NAV.outerHeight() )  / $(window).height() ;


            // SCROLL SPY USING SCROLLMAGIC:
            $('[data-pt-spy]').each(function (index, element){
                
                $(element).find($('[data-pt-spy-to]')).each(function (index, element){

                    var SpyZoneID = $(element).data('pt-spy-to');
                    
                    // var SpyLink = $(element);
                    var SpyLink = $(element).parent();
                    
                    var SpyZone = $(SpyZoneID);


                    if($(SpyZone).length){

                        var sm_scene = new ScrollMagic.Scene()
                                        .triggerElement(SpyZoneID)
                                        .setClassToggle(SpyLink, "active") // add class toggle
                                        // .addIndicators({name:"nav spy " +SpyZoneID, indent:100}) // add indicators (requires plugin)
                                        .triggerHook(0)
                                        // .trigger('hello')
                                        // DURATION IS THE HEIGHT OF THE ANCHORED ZONE
                                        .duration($(SpyZoneID).outerHeight())  
                                        .addTo(SITE.SM_CTRL);


                        var spyToNumber = (SpyZone.offset().top - SITE._QuickContact.outerHeight() - SITE._SITE_NAV.outerHeight()) + 1 ;

                        SpyZone.attr( 'data-pt-spy-me', spyToNumber );
                        
                    }else{
                        //console.log('There is no matching anchor id for the SpyZone ' + SpyLink);
                    }
        

                    // ANIMATE TO POSITION WHEN CLICKED 
                    $(element).on('click', function(e) {
                        // prevent default anchor click behavior
                        e.preventDefault();

                        var offSet = $(this.hash).offset();
                        var smsTo = $(this.hash).data('pt-spy-me');

                        if (offSet !== undefined){
                            TweenMax.to(window, 0.5, { scrollTo:{ y:smsTo }, ease:Power4.easeInOut } );                
                        }

                        SITE._SITE_NAV.find(".navbar-collapse").collapse('hide');

                    });

                });

            });

        }

    }






































































































// USE:
// <div data-pt-transition="slide-from-left">
// <div data-pt-transition="slide-from-right">
// <div data-pt-transition="slide-from-top">
// <div data-pt-transition="slide-from-bottom">
// <div data-pt-transition="fade-in">

    ,buildTransitions: function(_DURATION) {
        //console.log('SITE.animateEXTRAS()');

        if (SITE._BreakPoint === 'medium') {
        
            SITE.addOnLoad(
               doNow
            );
        
        }

        // WE MUST WAIT UNTIL THE CONTENT IS DONE LOADING BEFORE 
        // CALCULATING THE HEIGHTS OF THE SCROLL SPY SECTIONS:
        function doNow(){

            var _D_ = typeof _DURATION !== 'undefined' ? _DURATION : false;

            // _D_ = false;//FORCE FOR TESTING PURPOSES
            
            var H = $(window).height();


            var SLIDE_FromRight = [];
            var SLIDE_FromLeft = [];
            var SLIDE_FromBottom = [];
            var SLIDE_FromTop = [];
            var FADE_In = [];



            // CHECK THE PAGE FOR ELEMENTS AND LOAD THEM IN THE ARRAYS FOR BUILD:

            $('[data-pt-transition]').each(function(i, val){
                var transitionType = $(this).data('pt-transition');
                // //console.log( transitionType );

                switch(transitionType) {
                    
                    case "slide-from-right":
                        SLIDE_FromRight.push(this);
                        break;
                    
                    case "slide-from-left":
                        SLIDE_FromLeft.push(this);
                        break;
                                    
                    case "slide-from-top":
                        SLIDE_FromTop.push(this);
                        break;
                                    
                    case "slide-from-bottom":
                        SLIDE_FromBottom.push(this);
                        break;
                                                    
                    case "fade-in":
                        FADE_In.push(this);
                        break;
                    
                    default:
                        // default
                        break;

                }

            });
     



            //  .slide-fromLeft
            for (var i2=0; i2 < SLIDE_FromLeft.length; i2++){

                $(SLIDE_FromLeft[i2]).parent().css({'overflow-x':'hidden'});

                var tweenFromLeft = new TweenMax.from(SLIDE_FromLeft[i2], 1, {alpha:0, x:'-=50', ease:Power1.easeOut} );
                  
                var scene_fromLeft = new ScrollMagic.Scene({
                // var SM_Scene = new ScrollMagic.Scene({
                    triggerElement: SLIDE_FromLeft[i2]
                    ,triggerHook:0.9
                })
                // .addTo(SM_CTRL_Extras)
                .addTo(SITE.SM_CTRL)
                .reverse(false)
                // .addIndicators()
                .setTween(tweenFromLeft);

                if(_D_){
                    scene_fromLeft.reverse(true);
                    scene_fromLeft.duration(H/2);
                }else{
                    // MAYBE THIS SHOULD BE DESTROYED AFTER IT RUNS
                    // scene_fromLeft.on('end', function(e){scene_fromLeft.destroy()} );
                }

            }




            //  .slide-fromRight
            for (var i1=0; i1 < SLIDE_FromRight.length; i1++){

                $(SLIDE_FromRight[i1]).parent().css({'overflow-x':'hidden'});

                var tweenFromRight = new TweenMax.from(SLIDE_FromRight[i1], 1, {alpha:0, x:'+=50', ease:Power1.easeOut} );
                  
                var scene_fromRight = new ScrollMagic.Scene({
                // var SM_Scene = new ScrollMagic.Scene({
                    triggerElement: SLIDE_FromRight[i1]
                    ,triggerHook:0.9
                })
                // .addTo(SM_CTRL_Extras)
                .addTo(SITE.SM_CTRL)
                .reverse(false)
                // .addIndicators()
                .setTween(tweenFromRight); 
                
                if(_D_){
                    scene_fromRight.reverse(true);
                    scene_fromRight.duration(H/2);
                }

            }



            //  .slide-fromBottom
            for (var i3=0; i3 < SLIDE_FromBottom.length; i3++){

                $(SLIDE_FromBottom[i3]).parent().css({'overflow-y':'hidden'});

                var tweenFromBottom = new TweenMax.from(SLIDE_FromBottom[i3], 1, {alpha:0, y:'+=50', ease:Power1.easeOut} );
                  
                var scene_fromBottom = new ScrollMagic.Scene({
                    triggerElement: SLIDE_FromBottom[i3]
                    ,triggerHook:0.9
                })
                // .addTo(SM_CTRL_Extras)
                .addTo(SITE.SM_CTRL)
                .reverse(false)
                // .addIndicators()
                .setTween(tweenFromBottom); 
                
                if(_D_){
                    scene_fromBottom.reverse(true);
                    scene_fromBottom.duration(H/2);
                }

            }




            //  .slide-fromTop
            for (var i4=0; i4 < SLIDE_FromTop.length; i4++){

                $(SLIDE_FromTop[i4]).parent().css({'overflow-y':'hidden'});

                var tweenFromTop = new TweenMax.from(SLIDE_FromTop[i4], 1, {alpha:0, y:'-=50', ease:Power1.easeOut} );
                  
                var scene_fromTop = new ScrollMagic.Scene({
                    triggerElement: SLIDE_FromTop[i4]
                    ,triggerHook:0.9
                })
                // .addTo(SM_CTRL_Extras)
                .addTo(SITE.SM_CTRL)
                .reverse(false)
                // .addIndicators()
                .setTween(tweenFromTop); 
                
                if(_D_){
                    scene_fromTop.reverse(true);
                    scene_fromTop.duration(H/2);
                }

            }




            //  .fade-in 
            for (var i5=0; i5 < FADE_In.length; i5++){

                var tweenFadeIn = new TweenMax.from(FADE_In[i5], 1, {alpha:0, ease:Power1.easeIn} );
                // var tweenFadeIn = new TweenMax.from(FADE_In[i5], 1, {alpha:0, ease.Linear.easeNone} );
                
                var scene_f = new ScrollMagic.Scene({
                    triggerElement: FADE_In[i5]
                    ,triggerHook:0.9
                })
                // .addTo(SM_CTRL_Extras)
                .addTo(SITE.SM_CTRL)
                .reverse(true)
                // .addIndicators()
                .setTween(tweenFadeIn); 
                 
                if(_D_){
                    scene_f.reverse(true);
                    scene_f.duration(H/2);
                }

            }




            // THIS MIGHT BE BETTER FOR LOOPING THROUGH THE ITEMS
            // $(SLIDE_FromRight).each(function(i, _thing_){
                
            //     $(_thing_).closest('.row').css({'overflow-x':'hidden'});
                
            //     var tweenFromRight = new TweenMax.from(_thing_, 1, {alpha:0, x:'+=50', ease:Power1.easeOut} );

            //     var scene_fromRight = new ScrollMagic.Scene({
            //         triggerElement: _thing_
            //         ,triggerHook:0.99
            //     })
            //     .addTo(SITE.SM_CTRL)
            //     .setTween(tweenFromRight); 

            //     if(_D_){
            //         scene_fromRight.reverse(true);
            //         scene_fromRight.duration(H/2);
            //     }

            // });







        }

    }










































// CLEAN THESE UP: 







    // SIMPLE STICK / PIN  USING ScrollMagic  
    ,makeSticky: function(item){
        // //console.log('makeSticky() ' + item);
        // var locY  = item.offset().top;

        var scene1 = new ScrollMagic.Scene({
            triggerElement: item
            ,triggerHook: 'onLeave'
        })
        .setPin(item, {pushFollowers: false})
        .addTo(SITE.SM_CTRL);
        // .addIndicators();

    }










    ,runStickies:function(){

        $('[data-pt-sticky]').each(function(i, val){
            SITE.makeSticky( this );
        });

    }









    // COPIES IMG SRC INTO CSS BACKGROUND-IMAGE.
    ,imgSwap: function(_img, _div) {
        //console.log('SITE.imgSwap()');
        var IMG = _img;
        var DIV = _div;
        var IMGurl = IMG.attr('src');

        // IMG.css('visibility', 'hidden');
        IMG.css('display', 'none');

        DIV.css('background-image', 'url("'+IMGurl+'")' )
            .css('background-size', 'cover')
            .css('background-position','center');
    }










    // RUNS SITE.imgSwap ON A PRESET BUNCH OF CLASSSES;
    ,runImgSwaps: function() {
        // //console.log('SITE.runImgSwaps()')

        $('[data-pt-imgswap]').each(function(i, val){

            // check the data attribute value and pass it along to the imgSwap function.
            // var _bgStyle = ;// 'cover' / 'contain' / 

            SITE.imgSwap( $(val).find('img:first'), $(val) );
        });

    }
























    //  ADDS A FPS (FramePerSecond) MONITOR TO THE PAGE:
    ,monitorFPS:function(){

        SITE.addOnLoad(
            doNow
        );

        function doNow(){
            Justice.init(); 
        }
    }















    ,fastClick:function(){
        FastClick.attach(document.body);
    }







    // THIS IS A WAY TO ADD MULTIPLE window.onload FUNCTIONS PER PAGE.
    
    ,onLoadFuncs:[]

    ,addOnLoad: function(func) {
        //console.log('adding func to onLoadFuncs[]');
        // //console.log(func);
        SITE.onLoadFuncs.push(func);

        window.onload = function() {
            //console.log('!!! ON LOAD !!!');
            
            for (var i = 0; i < SITE.onLoadFuncs.length; i++) { 
                var f = SITE.onLoadFuncs[i];
                f();
            }

        };

    }


 





    ,checkPreloader:function(){
        //console.log('SITE.checkPreloader()');
        
        var _pl = $('.pt-preloader');

        if(_pl.length){

            _pl.css({'display':'flex'});
            
            SITE.addOnLoad( 
                fadePreloader
            );

        }else{
            console.log('there was no preloader');
        }

        function fadePreloader(){
            //console.log('fadePreloader()');

            // TweenMax.to(_pl, 0.3, {autoAlpha:0});
            TweenMax.to(_pl, 0.3, {autoAlpha:0, onComplete:function(){
                _pl.css({'display':'none'});
            }});

        }

    } 
 


























































};



















 

