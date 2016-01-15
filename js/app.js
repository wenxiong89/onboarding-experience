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
	firstName: getParameterByName("name") || "IBMer",
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

$('.large').on('click', function(){
  stopped = false;
  update();
  window.setTimeout(stop, 2000, frameId);
});

var utils = {
    norm: function(value, min, max) {
        return (value - min) / (max - min);
    },

    lerp: function(norm, min, max) {
        return (max - min) * norm + min;
    },

    map: function(value, sourceMin, sourceMax, destMin, destMax) {
        return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
    },

    clamp: function(value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },

    distance: function(p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    distanceXY: function(x0, y0, x1, y1) {
        var dx = x1 - x0,
            dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    },

    circleCollision: function(c0, c1) {
        return utils.distance(c0, c1) <= c0.radius + c1.radius;
    },

    circlePointCollision: function(x, y, circle) {
        return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
    },

    pointInRect: function(x, y, rect) {
        return utils.inRange(x, rect.x, rect.x + rect.width) &&
               utils.inRange(y, rect.y, rect.y + rect.height);
    },

    inRange: function(value, min, max) {
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    },

    rangeIntersect: function(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && 
               Math.min(min0, max0) <= Math.max(min1, max1);
    },

    rectIntersect: function(r0, r1) {
        return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
               utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
    },

    degreesToRads: function(degrees) {
        return degrees / 180 * Math.PI;
    },

    radsToDegrees: function(radians) {
        return radians * 180 / Math.PI;
    },

    randomRange: function(min, max) {
        return min + Math.random() * (max - min);
    },

    randomInt: function(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    }

}

$(window).resize(resize());

canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
generatorStock=[];

var frameId = 0.0;
var stopped = false;

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}


var generator1 = new particleGenerator(W/2, H/1.5,0, 0, 100);

gravity = 0.1;
generator1.number = 100;
friction = 0.99;

colors = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722', '#795548'
];

function loadImage(url) {
    var img = document.createElement("img");
    img.src = url;
    return img;
}


var mouse = {x: 0, y: 0};
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);
    
    
function randomInt(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

function particle(x, y,type) {
  this.radius = randomInt(.2, 2);
  this.x = x;
  this.y = y;
  this.vx = randomInt(-4, 4);
  this.vy = randomInt(-10, -0);
  this.type=type;
  this.angle = utils.degreesToRads(randomInt(0,360));
  this.anglespin=randomInt(-0.2,0.2);
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.rotateY=randomInt(0,1);
}
    
    
particle.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  this.vy += gravity;
  this.vx *= friction;
  this.vy *= friction;
  this.radius -= .02;

  if(this.rotateY < 1){
    this.rotateY +=0.1;
  }
  else{
    this.rotateY =-1;
  }
  
  this.angle += this.anglespin;
  
  context.save();
  context.translate(this.x,this.y);             
  context.scale(1,this.rotateY);
  context.rotate(this.angle);
  context.beginPath();
  context.fillStyle=this.color;
  // drawStar(0, 0, 5, this.boxW, this.boxH);
  context.fillRect(-5,-5,10,10);
  context.fill();
  context.closePath();
  context.restore();


  if(this.y>H+5 ){
    this.vy *= -.5;
  }
  if(this.x>W|| this.x < 0){
    this.vx *= -1;
  }
}

function particleGenerator(x, y, w, h, number,text) {
  // particle will spawn in this aera
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.number = number;
  this.particles = [];
  this.text=text;
}

particleGenerator.prototype.animate = function() {
  
  context.fillStyle="grey";
  context.beginPath();
  context.strokeRect(this.x, this.y, this.w, this.h);
  context.font = "13px arial";
  context.textAlign = "center";
  context.closePath();
  
    if (this.particles.length < this.number) {
      this.particles.push(new particle(clamp(randomInt(this.x, this.w+this.x),this.x,this.w+this.x),clamp(randomInt(this.y,this.h+this.y),this.y,this.h+this.y),this.text));
    }

    if (this.particles.length > this.number) {
      this.particles.length=this.number;
    }

    for (var i = 0; i < this.particles.length; i++) {
      p = this.particles[i];
      p.update();
      if (!stopped && p.y > H) {
        //a brand new particle replacing the dead one
        this.particles[i] = new particle(clamp(randomInt(this.x, this.w+this.x),this.x,this.w+this.x), 

        clamp(randomInt(this.y,this.h+this.y),this.y,this.h+this.y),this.text);
      }
    }
}

function update() {
  // context.globalAlpha=.5;
  context.clearRect(0,0,W,H);
  generator1.animate();

  frameId = requestAnimationFrame(update);
}

function stop(animation) {
  console.log('here');
  stopped = true;
  // cancelAnimationFrame(animation);
}
