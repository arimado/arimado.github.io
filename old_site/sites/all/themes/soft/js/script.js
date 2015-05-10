var $ = jQuery.noConflict();

$(document).ready(function(){
	$(".post-content").click(function(){
     window.location=$(this).find("a").attr("href"); 
     return false;
	});

    $(".folio-post").click(function(){
     window.location=$(this).find("a").attr("href"); 
     return false;
    });

	$(function() {  
    var pull        = $('#pull');  
        menu        = $('.sidebarMenu');  
        menuHeight  = menu.height();  
  
	    $(pull).bind('click', function(e) {  
	        e.preventDefault();  
	        menu.slideToggle();   
	    });  

	    $(window).resize(function(){  
		    var w = $(window).width();  
		    if(w > 320 && menu.is(':hidden')) {  
		        menu.removeAttr('style');  
		    }  
		});   
	});  

	$(window).bind('scroll', function() {
         if ($(window).scrollTop() > 280) {
             $('.sidebarMenuOuter').addClass('fixed');
         }
         else {
             $('.sidebarMenuOuter').removeClass('fixed');
         }
    });
	$("a[href='/taxonomy/term/1']").css('background', '#635EF2');
    $("a[href='/taxonomy/term/2']").css('background', '#635EF2');
    $("a[href='/taxonomy/term/8']").css('background', '#635EF2');
    $("a[href='/taxonomy/term/4']").css('background', '#635EF2');
    $("a[href='/taxonomy/term/10']").css('background', '#635EF2');

    $("a[href='/taxonomy/term/5']").css('background', '#62D162');
    $("a[href='/taxonomy/term/7']").css('background', '#62D162');
    $("a[href='/taxonomy/term/14']").css('background', '#62D162');

    $("a[href='/taxonomy/term/3']").css('background', '#b8b8b8');

    $("a[href='/taxonomy/term/13']").css('background', '#FCBA05');
    $("a[href='/taxonomy/term/9']").css('background', '#FCBA05');
    $("a[href='/taxonomy/term/12']").css('background', '#FCBA05');
    $("a[href='/taxonomy/term/11']").css('background', '#FCBA05');

});

/* 

blue

MEDIA
1 - advertising
2 - media 
8 - marketing
4 - film 
10 - music	

green

TECH 
5 - web
7 - tech
14 - dev

yellow

INDUSTRY--

6 - start up

grey

SPECIAL---

3 - project

orange

MISC----

13 - misc
9 - rant
12 - idea
11 - not srs






15 - 
16 -
17 -
18 -

*/