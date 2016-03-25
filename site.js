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
 
    



$(function() { 
    // console.log('site specific js file');

    SITE.init();

});









var SITE = { 

    _VAR:''
    
    ,init: function() {

        // console.log('SITE.init()');

        // PT.monitorFPS();

        // PT.buildSIDR();
        
        PT.addRandomClass('.homeplate', ['bg-r1', 'bg-r2', 'bg-r3']);

        SITE.buildHomePlate();

    }

    ,newFunction: function() { }





    ,buildHomePlate: function() {

        var HomePlate = $('#my-homeplate');

        var SiteNav = $('#sitenav');


        // EVENT LISTENERS FOR THE NAVBAR TOGGLE:
        SiteNav.find(".navbar-collapse" ).on( "show.bs.collapse", function() {
            // console.log( "show collapse" );
            SiteNav.addClass('nav-is-open');
        }).on( "hidden.bs.collapse", function() {
            // console.log( "hide collapse" );
            SiteNav.removeClass('nav-is-open');
        });


 

        // IF WE'RE ON THE HOME PAGE, SCROLL TO THE TOP, IF NOT, GO TO THE HOME PAGE:
        // SiteNav.find('.navbar-brand').on('click', function(e) {
        //     if($('.page-home').length ){
        //         e.preventDefault();
        //         TweenMax.to(window, 0.5, { scrollTo:{ y:0 }, ease:Power4.easeInOut } );                
        //     }
        // });



        // TRIGGER FOR NAVBAR .bg-solid CLASS
        // (SETS BG FOR NAVBAR AND SHOWS NAVBAR LOGO)
        var smScene1 = new ScrollMagic.Scene({
            // triggerElement: HomePlate.find('.logoholder')
            triggerElement: $('body')
            ,triggerHook: '0'
        })
        .setClassToggle(SiteNav, "bg-solid")
        .offset(50)
        // .addIndicators()
        .addTo(PT.SM_CTRL);


    }






};
 


















 

