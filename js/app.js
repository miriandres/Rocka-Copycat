let userAgent = navigator.userAgent.toLowerCase();
let isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
let windowSize = window.innerWidth;
let deviceWidth = 991;

if( !isTablet && windowSize >= deviceWidth  ){  
  addLoadEvent(loadStart);
  addLoadEvent(loadElements);
  addLoadEvent(loadParticles);
  addLoadEvent(isScrollable);  
  addLoadEvent(scrollAnimation);  
}else{
  addLoadEvent(loadStart);
  addLoadEvent(isScrollable);  
  addLoadEvent(scrollAnimation);  
}

const nav      = document.querySelector('.header__nav');
const navBtn   = document.querySelector('.header__btn');
const closeBtn = document.querySelector('.header__btn--close');

navBtn.addEventListener('click', ()=>{
  nav.classList.add('active');
  document.body.classList.add('no-scroll');
})
closeBtn.addEventListener('click', () =>{
  nav.classList.remove('active');
  document.body.classList.remove('no-scroll');
})

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
function loadStart(){
  window.scrollTo(0,0);
}
function loadElements(){
  const header     = document.querySelector('.header');
  const section    = document.querySelectorAll('.section');
  const particles  = document.querySelector('#particles-js');
  windowSize       = window.innerWidth;

  for (const eachSection of section) {
    let sectionClass = eachSection.dataset.class;
    setBackground( sectionClass );
  }
  function setBackground( x ){
    let container = '.section--' + x;
    let bodyCont  = 'body--' + x;
    
    let element  = document.querySelector(container).offsetTop;
    let height   = document.querySelector(container).clientHeight;
    let img      = document.querySelector(container + '.section--scroll .section__image');
      
    window.addEventListener("resize", () =>{
      element  = document.querySelector(container).offsetTop;
      height   = document.querySelector(container).clientHeight;
      img      = document.querySelector(container + '.section--scroll .section__image');    
    })
    window.addEventListener('scroll',() =>{

      let pixel = window.scrollY;
      let limit = ( element - (height / 3) );

      if( pixel >= limit ){
        document.body.classList.add(bodyCont);

        if( img !== null ){ img.style.transform = 'translateY(-'+( (pixel - limit) / 2 )+'px) scale(1.1)' }
        if( x == 'companies'){
          header.classList.add('header--dark');
          particles.classList.add('invert');
        }else{
          header.classList.remove('header--dark');
          particles.classList.remove('invert');
        }
      }else{
        document.body.classList.remove(bodyCont);
      }
    })
  }
}
function loadParticles(){
    particlesJS('particles-js', 
    {
      "particles": {
        "number": {
          "value": 100,
          "density": {
            "enable": true,
            "value_area": 3e3
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 3
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.2,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 0.8,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 50,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 5,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 800,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 800,
            "size": 80,
            "duration": 2,
            "opacity": 0.8,
            "speed": 3
          },
          "repulse": {
            "distance": 400,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    }
    ); 
}
function scrollAnimation(){
  let text         = document.querySelectorAll('.section__text');
  let footerText   = document.querySelectorAll('.footer__row');
  let windowHeight = window.innerHeight;

  window.addEventListener('scroll', ()=>{
    text.forEach((eachText, i)=>{
      let textTop = text[i].getBoundingClientRect().top;
      let limit = (textTop / 2);

      if( windowHeight - limit >= textTop){
        text[i].classList.add('slide-up');
      }
    })
    footerText.forEach((eachText, i)=>{
      let rowTop = footerText[i].getBoundingClientRect().top;

      if( windowHeight >= rowTop){
        footerText[i].classList.add('slide-up');
      }
    })
  }) 
}
function isScrollable(){
  document.body.classList.remove('no-scroll');
  preload.classList.remove('no-scroll');
}
  
class Clock {
  constructor(el){
    this.clockEl = el;
    this.UI = {};
    this.initializeClock();
  }

  updateClock = () =>{
    const dt = luxon.DateTime.now().toUTC();
    const zone = dt.setZone(this.clockEl.dataset.locale);
    const ss = (zone.second + zone.millisecond / 1000) / 60 * 360;
    const mm = (zone.minute + zone.second / 60) / 60 * 360;
    const hh = (zone.hour + zone.minute / 60) / 12 * 360;
    this.UI.minute.style.transform = `rotate(${mm}deg)`;
    this.UI.hour.style.transform = `rotate(${hh}deg)`;
    requestAnimationFrame(this.updateClock);
  }

  initializeClock() {
    this.UI.minute = this.clockEl.querySelector('.clock__hand--minute');
    this.UI.hour = this.clockEl.querySelector('.clock__hand--hour');
    requestAnimationFrame(this.updateClock);
  }
}
const clocks = document.querySelectorAll('.clock');
clocks.forEach(el => new Clock(el));