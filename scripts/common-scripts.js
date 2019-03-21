
;(function($){
	$(function(){
        
        // music
       /* var bars = $('.music-bar .bar');

        var tl = (new TimelineMax()).staggerTo(bars, .3, {
            y: -10,
            repeat:-1,
            paused: false,
            yoyo:true,
            ease: Quad.easeInOut}, .25
        ).pause();

        $('#music-bar').on('click', function(){
            tl.isActive() ? pause() : tl.play(); 
            tl.isActive() ? $('.music-bar').addClass("active") : $('.music-bar').removeClass("active"); 
        });

        function pause() {
            tl.pause();
            TweenMax.to(bars, .7, {
                y: 0,
                ease: Quad.easeOut}
                       );
        }*/
        
        var bars = $('.music-bar .bar');

          var tl = (new TimelineMax()).staggerTo(bars, .3, {
            y: -10,
            repeat:-1,
            paused: false,
            yoyo:true,
            ease: Quad.easeInOut}, .25
          ).pause();

          $('.music-bar').on('click', function(){
            tl.isActive() ? pause() : tl.play(); 
          });
        
        $(window).on("load", function(){
            tl.isActive() ? pause() : tl.play(); 
        })

          function pause() {
            tl.pause();
            TweenMax.to(bars, .7, {
              y: 0,
              ease: Quad.easeOut}
            );
          }    
        
        if ($(".animate").length){

            var $animation_elements = $('.animate');
            var $window = $(window);

            function check_if_in_view() {
                var window_height = $window.height();
                var window_top_position = $window.scrollTop();
                var window_bottom_position = (window_top_position + window_height);

                $.each($animation_elements, function() {
                    var $element = $(this);
                    var element_height = $element.outerHeight();
                    var element_top_position = $element.offset().top;
                    var element_bottom_position = (element_top_position + element_height);

                    //check to see if this current container is within viewport
                    if (element_top_position <= window_bottom_position) {
                        $element.addClass('in-view');
                    } else {
                        $element.removeClass('in-view');
                    }
                });
            }

            $window.on('scroll resize', check_if_in_view);
            $window.trigger('scroll');
        } 
        
        $(".state-list > a > h2").each(function(){
            var elHeight = $(this).parent().find("img").outerHeight();
            $(this).parent().find("img").css({
                'max-height' : elHeight,
            }); //set default height
            
        });
        
        
        $(window).on("resize load",function(){
            //do something when window resizes like:
            var $winH = $(this).height();
            var $winW = $(this).width();
            $('.content-inner-wrap img').height($winH - 400); //set height = height of window - 100 px
            
            if($(window).width() > 1025){
                $(".state-list > a > h2").each(function(){
                    $(this).mouseenter(function(){
                        $(this).parents().addClass("hovered");
                    })
                    $(this).mouseleave(function(){
                        $(this).parents().removeClass("hovered");
                    })

                    var elWidth = $(this).parent().find("img").outerWidth();
                    var elHeight = $(this).parent().find("img").outerHeight();

                    $(this).mousemove(function(event){
                        //$(this).parent().find("img").show();
                        $(this).parent().find("img").css({
                            'left' : event.clientX - elWidth + "px",
                            'top' : event.clientY - elHeight + "px"
                        })

                    });            

                });
            }else if(($(window).width() < 1025) && ($(window).width() > 767)){
                $(".state-list > a > h2").each(function(){
                    $(this).click(function(e){
                        e.preventDefault();
                        e.stopPropagation()
                        $(".state-list > a").removeClass("hovered");
                        if($(this).parent().hasClass("hovered")){
                            $(this).parent().removeClass("hovered");
                            $(this).parents(".content-inner-wrap").removeClass("active");
                        }else{
                            $(this).parent().addClass("hovered");
                            $(this).parents(".content-inner-wrap").addClass("active");
                        }
                    });            

                });
                $('body').click(function(){
                    $(".state-list > a").removeClass("hovered");
                    $(".content-inner-wrap").removeClass("active");
                })
            }else{
                $(".state-list > a").removeClass("hovered");
                $(".content-inner-wrap").removeClass("active");
            }
        });
        

	});// End ready function.
    
	$(window).on('load', function(){
        
        $("body").addClass('loaded');
        // Begin common slider
        if ( $('div.slider-wrap').length == 0 ) return false

        $('div.slider-wrap').flexslider({
            animation:"fade",
            slideshow: true,
            directionNav: false,
            controlNav:false,
            slideshowSpeed: 5000,  //Integer: Set the speed of the slideshow cycling, in milliseconds
            animationSpeed: 600, 
            useCSS: false,
            start: function(slider){
                //$('body').removeClass('loading');

            }
            ,
            animationLoop: true,
            pauseOnAction: false, // default setting

            after: function(slider) {

            }
        })	

    	$('div.slider-wrap video').trigger('play');

    })
	

})(jQuery);

/* Smooth scroll */
Math.easeOut = function (t, b, c, d) { t /= d; return -c * t*(t-2) + b; };

(function() { // do not mess global space
var
  interval, // scroll is being eased
  mult = 0, // how fast do we scroll
  dir = 0, // 1 = scroll down, -1 = scroll up
  steps = 50, // how many steps in animation
  length = 30; // how long to animate
function MouseWheelHandler(e) {
  e.preventDefault(); // prevent default browser scroll
  clearInterval(interval); // cancel previous animation
  ++mult; // we are going to scroll faster
  var delta = -Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  if(dir!=delta) { // scroll direction changed
    mult = 1; // start slowly
    dir = delta;
  }
  for(var tgt=e.target; tgt!=document.documentElement; tgt=tgt.parentNode) {
    var oldScroll = tgt.scrollTop;
    tgt.scrollTop+= delta;
    if(oldScroll!=tgt.scrollTop) break;
  }
  var start = tgt.scrollTop;
  var end = start + length*mult*delta; // where to end the scroll
  var change = end - start; // base change in one step
  var step = 0; // current step
  interval = setInterval(function() {
    var pos = Math.easeOut(step++,start,change,steps);
    //window.scrollTo(0,pos);
    tgt.scrollTop = pos;
    if(step>=steps) { // scroll finished without speed up - stop by easing out
      mult = 0;
      clearInterval(interval);
    }
  },10);
}
window.addEventListener("mousewheel", MouseWheelHandler, false);
window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
})();


//Quad, Cubic, Quart, Quint, Sine, Expo, Circ, Elastic, Back, Bounce
jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return jQuery.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return jQuery.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})