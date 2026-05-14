// G&G INGENIERÍA
(function(){
  'use strict';

  // LOADER
  var loader = document.querySelector('.loader');
  window.addEventListener('load',function(){
    setTimeout(function(){ loader.classList.add('hidden'); },600);
  });

  // NAV
  var nav = document.getElementById('nav');
  var navToggle = document.querySelector('.nav-toggle');
  var navMobile = document.getElementById('navMobile');

  window.addEventListener('scroll',function(){
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  navToggle.addEventListener('click',function(){
    navToggle.classList.toggle('active');
    navMobile.classList.toggle('open');
    document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
  });

  var mobileLinks = navMobile.querySelectorAll('a');
  for(var i=0;i<mobileLinks.length;i++){
    mobileLinks[i].addEventListener('click',function(){
      navToggle.classList.remove('active');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // REVEAL
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function(entries){
    for(var i=0;i<entries.length;i++){
      if(entries[i].isIntersecting){
        var delay = parseInt(entries[i].target.getAttribute('data-delay')) || 0;
        setTimeout(function(el){ el.classList.add('visible'); },delay,entries[i].target);
        observer.unobserve(entries[i].target);
      }
    }
  },{ rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  for(var j=0;j<reveals.length;j++){ observer.observe(reveals[j]); }

  // SMOOTH SCROLL
  var links = document.querySelectorAll('.nav-links a, .nav-mobile a, a[href^="#"]');
  for(var k=0;k<links.length;k++){
    links[k].addEventListener('click',function(e){
      var href = this.getAttribute('href');
      if(href && href.charAt(0)==='#' && href.length>1){
        e.preventDefault();
        var target = document.querySelector(href);
        if(target){
          var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  }

  // FAB
  var fabBtn = document.getElementById('fabBtn');
  var fabOptions = document.getElementById('fabOptions');
  var fabOpen = false;

  fabBtn.addEventListener('click',function(e){
    e.stopPropagation();
    fabOpen = !fabOpen;
    fabBtn.classList.toggle('active',fabOpen);
    fabOptions.classList.toggle('open',fabOpen);
  });

  document.addEventListener('click',function(e){
    if(fabOpen && !e.target.closest('.fab')){
      fabOpen = false;
      fabBtn.classList.remove('active');
      fabOptions.classList.remove('open');
    }
  });

  // LIGHTBOX
  var lightbox = document.getElementById('lightbox');
  var lightboxBg = lightbox.querySelector('.lightbox-bg');
  var lightboxClose = lightbox.querySelector('.lightbox-close');
  var lightboxImg = lightbox.querySelector('.lightbox-img');

  var allImgs = document.querySelectorAll('.service-img img, .portfolio-item img, .compare-card img');
  for(var l=0;l<allImgs.length;l++){
    allImgs[l].style.cursor = 'pointer';
    allImgs[l].addEventListener('click',function(){
      lightboxImg.src = this.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeLightbox(){
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  lightboxBg.addEventListener('click',closeLightbox);
  lightboxClose.addEventListener('click',closeLightbox);
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeLightbox(); });

  // PARALLAX HERO
  var heroBg = document.querySelector('.hero-bg');
  if(heroBg){
    window.addEventListener('scroll',function(){
      heroBg.style.transform = 'translateY(' + (window.scrollY * 0.12) + 'px)';
    });
  }

  // ACTIVE NAV
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll',function(){
    var current = '';
    for(var m=0;m<sections.length;m++){
      if(window.scrollY >= sections[m].offsetTop - 200) current = sections[m].getAttribute('id');
    }
    for(var n=0;n<navAnchors.length;n++){
      navAnchors[n].style.opacity = navAnchors[n].getAttribute('href') === '#'+current ? '1' : '0.5';
    }
  });
})();
