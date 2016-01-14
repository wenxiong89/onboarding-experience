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

        days.innerHTML    = t.days;
        hours.innerHTML   = ('0' + t.hours).slice(-2);
        minutes.innerHTML = ('0' + t.minutes).slice(-2);
        seconds.innerHTML = ('0' + t.seconds).slice(-2);

        if(t.total<=0){
          clearInterval(timeinterval);
        }
    },1000);
}


/* Get name and start date from personalized URL */
var personalInfo = {
	firstName: getParameterByName("fn") || "IBMer",
	lastName: getParameterByName("ln") || null,
	startDate: new Date(getParameterByName("sd")) || null
}

/* Add name for flavor */
$('[data-flavor="firstName"]').html(personalInfo.firstName);

/* Initialize the countdown timer */
if (personalInfo.startDate) {
	initializeClock("countdown", personalInfo.startDate);
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
