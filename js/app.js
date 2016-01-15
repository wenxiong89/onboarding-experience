$(document).foundation();

/* Thanks http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript */ 
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* Thanks http://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/ */
function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime){
    var clock   = document.getElementById(id);

    var days    = document.querySelector(".days"),
    	hours   = document.querySelector(".hours"),
    	minutes = document.querySelector(".minutes"),
    	seconds = document.querySelector(".seconds");

    var timeinterval = setInterval(function(){
        var t = getTimeRemaining(endtime);

        if(t.total < 0){
            t = getTimeRemaining(new Date());
            clearInterval(timeinterval);
        }

        days.innerHTML    = t.days;
        hours.innerHTML   = ('0' + t.hours).slice(-2);
        minutes.innerHTML = ('0' + t.minutes).slice(-2);
        seconds.innerHTML = ('0' + t.seconds).slice(-2);

    }, 1000);
}


/* Get name and start date from personalized URL */
var personalInfo = {
	firstName: getParameterByName("fn") || "IBMer",
	lastName: getParameterByName("ln") || null,
	startDate: getParameterByName("sd") || null
}

/* Add name for flavor */
$('[data-flavor="firstName"]').html(personalInfo.firstName);

/* Initialize the countdown timer */
if (personalInfo.startDate) {
	initializeClock("countdown", new Date(personalInfo.startDate));
} else {
    document.getElementById('countdown').classList.add('hide');
}

var $top = $('.top-bar');

/* change the nav bar*/
$(window).scroll(function() {
    if( $(window).scrollTop() > 0 ) {
        $top.addClass('show-nav').removeClass('hide-nav');
    } else {
        $top.addClass('hide-nav').removeClass('show-nav');
    }
});

$('#hello').addClass('visible');

  /*
$(window).scroll(function() {
    if ($(window).scrollTop() > $('#todo').height()) {
        $('#nav-todo').addClass('active');
        $('#nav-in-the-life').removeClass('active');
        $('#nav-inspired').removeClass('active');
        $('#nav-feel-confused').removeClass('active');

    }
    
   if ($(window).scrollTop() > $('#in-the-life').height()) {
        $('#nav-in-the-life').addClass('active');
        $('#nav-todo').removeClass('active');
        $('#nav-inspired').removeClass('active');
        $('#nav-feel-confused').removeClass('active');

    }
    
    
   if ($(window).scrollTop() > $('#inspired').height()) {
        $('#nav-inspired').addClass('active');
        $('#nav-todo').removeClass('active');
        $('#nav-in-the-life').removeClass('active');
        $('#nav-feel-confused').removeClass('active');

    }
    if ($(window).scrollTop() > $('#feel-confused').height()) {
        $('#nav-todo').removeClass('active');
        $('#nav-in-the-life').removeClass('active');
        $('#nav-inspired').removeClass('active');
        $('#nav-feel-confused').addClass('active');

    }
  
    if ($(window).scrollTop() < 50 {
        $('#nav-todo').removeClass('active');
        $('#nav-in-the-life').removeClass('active');
        $('#nav-inspired').removeClass('active');
        $('#nav-feel-confused').removeClass('active');

    };
});*/

// active menu li switch
$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.menu li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        var refElementPos = refElement.position();
        if (refElementPos.top -120  <= scrollPos ) {
            $('.menu li a').removeClass("active-li");
            currLink.addClass("active-li");
        }
        else{
            currLink.removeClass("active-li");
        }
    });
}

