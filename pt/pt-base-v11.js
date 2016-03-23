// Custom JS Application Code

// If using JSLint for syntax debugging, include the following


/*
global 
PT:true, 
SITE:true, 
TimelineMax:true, 
TweenMax:true, 
TweenLite:true, 
SplitText:true, 
Linear:true, 
Elastic:true, 
Power1:true, 
Power2:true, 
Power3:true, 
Power4:true, 
Bounce:true, 
ScrollMagic:true, 
FastClick:true, 
enquire:true, 
Justice:true, 
ScrollMagic:true, 
Modernizr:true,
PT_UTILS:true, 
jQuery:true,
ssm:true
*/
    

 
 



    
// @codekit-prepend "pt-base-lib-bundle-v9.js"  






 
$(function() { 
    PT.init();
});






var PT = { 

	_SETTINGS: { 
		name: "pt-base-v11.js",	
		version: "11.0.0",
		url: "pt base 11 "
	}


    // SIMPLE STATE MANAGER.js  
    ,_SSM: ssm

    ,_Size:'xs' // xs,sm,md,lg,xl


    // THIS IS THE GLOBAL SCROLLMAGIC CONTROLLER FOR ALL SCROLLING INTERACTION IN THIS FILE:
    ,SM_CTRL: new ScrollMagic.Controller()


	,init: function() {
		// Application has been initalized
		console.log(this._SETTINGS.name + "(v" + this._SETTINGS.version + ") Started");	


        
        // ADDS BREAKPOINT SIZE INDICATOR :
        $('body').prepend('<div class="pt-sizer"></div>');
        




        PT.checkPreloader();

        PT.fastClick();

        PT.buildSSM();



        // PT.addRandomClass('.header', ['bg-knoxville']);



        PT.runStickies();
        
        PT.runImgSwaps();


        PT.buildTransitions(true);


        PT.monitorFPS();

        PT.buildNavSpy();

    }









// CLEAN THESE UP: 





    // THIS IS A WAY TO ADD MULTIPLE window.onload FUNCTIONS PER PAGE.
    
    ,onLoadFuncs:[]

    ,addOnLoad: function(func) {
        //console.log('adding func to onLoadFuncs[]');
        // //console.log(func);
        PT.onLoadFuncs.push(func);

        window.onload = function() {
            //console.log('!!! ON LOAD !!!');
            
            for (var i = 0; i < PT.onLoadFuncs.length; i++) { 
                var f = PT.onLoadFuncs[i];
                f();
            }

        };

    }


 





    ,checkPreloader:function(){
        //console.log('PT.checkPreloader()');
        
        var _pl = $('.pt-preloader');

        if(_pl.length){

            _pl.css({'display':'flex'});
            
            PT.addOnLoad( 
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
 











    ,buildSSM: function() {
        // MANAGES MEDIA-QUERIES BREAKPOINTS:
        PT._SSM.addStates([
            {
                id: 'xs',
                query: '(min-width: 300px) and (max-width: 768px)',
                onEnter: function(){
                    // console.log('xs');
                    PT._Size = 'xs';
                }
            },
            {
                id: 'sm',
                query: '(min-width: 768px) and (max-width: 992px)',
                onEnter: function(){
                    // console.log('sm');
                    PT._Size = 'sm';
                }
            },
            {
                id: 'md',
                query: '(min-width: 992px) and (max-width: 1200px)',
                onEnter: function(){
                    // console.log('md');
                    PT._Size = 'md';
                }
            },
            {
                id: 'lg',
                query: '(min-width: 1200px) and (max-width: 1500px)',
                onEnter: function(){
                    // console.log('lg');
                    PT._Size = 'lg';
                }
            }
            ,{
                id: 'xl',
                query: '(min-width: 1500px)',
                onEnter: function(){
                    // console.log('lg');
                    PT._Size = 'xl';
                }
            }
        ]);

    }

















    ,addRandomClass: function(_obj, _arr) {
        console.log('addRandomClass()');
        var arr = _arr;
        var obj = $(_obj);
        obj.addClass( arr[ Math.floor(Math.random() * arr.length)  ]  );
    }










    // SIMPLE STICK / PIN  USING ScrollMagic  
    ,makeSticky: function(item){
        // //console.log('makeSticky() ' + item);
        // var locY  = item.offset().top;

        var scene1 = new ScrollMagic.Scene({
            triggerElement: item
            ,triggerHook: 'onLeave'
        })
        .setPin(item, {pushFollowers: false})
        .addTo(PT.SM_CTRL);
        // .addIndicators();

    }








    ,runStickies:function(){

        $('[data-pt-sticky]').each(function(i, val){
            PT.makeSticky( this );
        });

    }







    // COPIES IMG SRC INTO CSS BACKGROUND-IMAGE.
    ,imgSwap: function(_img, _div) {
        //console.log('PT.imgSwap()');
        var IMG = _img;
        var DIV = _div;
        var IMGurl = IMG.attr('src');

        // IMG.css('visibility', 'hidden');
        IMG.css('display', 'none');

        DIV.css('background-image', 'url("'+IMGurl+'")' )
            .css('background-size', 'cover')
            .css('background-position','center');
    }






    // RUNS PT.imgSwap ON A PRESET BUNCH OF CLASSSES;
    ,runImgSwaps: function() {
        // //console.log('PT.runImgSwaps()')

        $('[data-pt-imgswap]').each(function(i, val){

            // check the data attribute value and pass it along to the imgSwap function.
            // var _bgStyle = ;// 'cover' / 'contain' / 

            PT.imgSwap( $(val).find('img:first'), $(val) );
        });

    }





    //  ADDS A FPS (FramePerSecond) MONITOR TO THE PAGE:
    ,monitorFPS:function(){

        PT.addOnLoad(
            doNow
        );

        function doNow(){
            Justice.init(); 
        }
    }





    ,fastClick:function(){
        FastClick.attach(document.body);
    }



































// USE:
// <div data-pt-transition="slide-from-left">
// <div data-pt-transition="slide-from-right">
// <div data-pt-transition="slide-from-top">
// <div data-pt-transition="slide-from-bottom">
// <div data-pt-transition="fade-in">

    ,buildTransitions: function(_DURATION) {
        //console.log('PT.animateEXTRAS()');

        // if (PT._BreakPoint === 'medium') {
        if ( (PT._BreakPoint === 'md') || (PT._BreakPoint === 'lg') || (PT._BreakPoint === 'lg') ) {
        
            PT.addOnLoad(
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
                .addTo(PT.SM_CTRL)
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
                .addTo(PT.SM_CTRL)
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
                .addTo(PT.SM_CTRL)
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
                .addTo(PT.SM_CTRL)
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
                .addTo(PT.SM_CTRL)
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
            //     .addTo(PT.SM_CTRL)
            //     .setTween(tweenFromRight); 

            //     if(_D_){
            //         scene_fromRight.reverse(true);
            //         scene_fromRight.duration(H/2);
            //     }

            // });







        }

    }










































/*


    #TestSpy{
      position:fixed;
      right:0;
      top:20%;
      // border:1px solid red;
      z-index: 99999;
      background-color:white;
      .active{
          background-color:gold;
      }
    }


      <ul class="TestSpy" data-pt-spy> 
          <li><a data-pt-spy-to="#company"        href="#company">Company</a></li>
          <li><a data-pt-spy-to="#acquisitions"   href="#acquisitions">Acquisitions</a></li>
          <li><a data-pt-spy-to="#development"    href="#development">Development</a></li>
          <li><a data-pt-spy-to="#management"     href="#management">Management</a></li>
          <li><a data-pt-spy-to="#brokerage"      href="#brokerage">Brokerage</a></li>
          <li><a                href="properties.html">Properties</a></li>
      </ul>

*/

    ,buildNavSpy: function() {
        
        // WE MUST WAIT UNTIL THE CONTENT IS DONE LOADING BEFORE 
        // CALCULATING THE HEIGHTS OF THE SCROLL SPY SECTIONS:
        PT.addOnLoad(
           doNow
        );

        function doNow(){

            console.log('doNow() buildNavSpy()');

            // var _triggerHook =  ( SITE._QuickContact.outerHeight() + SITE._SITE_NAV.outerHeight() )  / $(window).height() ;
            // var _triggerHook =  ( SITE._SITE_NAV.outerHeight() )  / $(window).height() ;

            // SCROLL SPY USING SCROLLMAGIC:
            $('[data-pt-spy]').each(function (index, element){
                
                $(element).find($('[data-pt-spy-to]')).each(function (index, element){

                    var SpyZoneID = $(element).data('pt-spy-to');

                    var SpyZone = $(SpyZoneID);
                    
                    // var SpyNavItem = $(element);
                    var SpyNavItem = $(element).parent();
                    


                    if($(SpyZone).length){

                        var sm_scene = new ScrollMagic.Scene()
                                        .triggerElement(SpyZoneID)
                                        .setClassToggle(SpyNavItem, "active") // add class toggle
                                        .triggerHook(0.5)
                                        // .trigger('hello')
                                        // DURATION IS THE HEIGHT OF THE ANCHORED ZONE
                                        .duration($(SpyZoneID).outerHeight())  
                                        // .addIndicators({name:"pt-spy-to " +SpyZoneID, indent:100}) // add indicators (requires plugin)
                                        .addTo(PT.SM_CTRL);


                        // var spyToNumber = (SpyZone.offset().top - SITE._QuickContact.outerHeight() - SITE._SITE_NAV.outerHeight()) + 1 ;
                        var spyToNumber = (SpyZone.offset().top) ;

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

                        // PT._SITE_NAV.find(".navbar-collapse").collapse('hide');

                    });

                });

            });

        }

    }











































};



























