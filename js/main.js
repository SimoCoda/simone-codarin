/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

(function ($) {
  "use strict";

  /*---------------------------------------------------- */
  /* Preloader
	------------------------------------------------------ */
  $(window).load(function () {
    const currentYear = new Date().getFullYear();
    document.getElementById("year").textContent = currentYear;
    gsap.registerPlugin(ScrollTrigger)

    let videoIntro = document.querySelector("#intro #myVideo");
    videoIntro.setAttribute("playsinline", '');
    if(document.querySelector('.mfp-bg.mfp-fade.mfp-ready')){
      document.querySelector('.mfp-content .popup-modal video').play()
    }
      //   // Se il dispositivo Ã¨ mobile, aggiungi l'attributo playsinline
    if (innerWidth < 850 && videoIntro) {
      videoIntro.setAttribute("src", "video/codice_phone.mp4");
      document.querySelectorAll(".popup-modal .media video").forEach(videoMobile => {
        videoMobile.setAttribute("playsinline", "");
        videoMobile.setAttribute("controls", "");
      })
    }

    const lightbox = GLightbox({
      selector: 'a[data-glightbox]',
      width: '100%', // Rende il lightbox più largo
      height: '100%', // Rende il lightbox alto quanto l'intero documento
      zoomable: false, // Disabilita lo zoom se necessario
      draggable: false, // Disabilita la possibilità di trascinare il documento
    });
    
    
    // will first fade out the loading animation
    $("#loader").fadeOut("slow", function () {
      // will fade out the whole DIV that covers the website.
      $("#preloader").delay(300).fadeOut("slow");
      
      trimText();
      animazioniGsap();
    });
  });


  // TRIM TEXT
  const breakers = ["stop", "STOP"]; // Contenuto dei breaker

  function trimText() {
    const descriptions = document.querySelectorAll(
      ".description, .regulation, .text"
    );
    descriptions.forEach((d) => textTrimmer(d, d));
  }

  function textTrimmer(node, origNode) {
    if (!node.childNodes || !node.childNodes.length) {
      return;
    }

    let afterBreaker = false;
    let fullContent = []; // Salviamo tutto il contenuto originale

    for (let n of node.childNodes) {
      // Dichiarato 'n'
      if (n.nodeType === 8 && breakers.includes(n.data.trim())) {
        afterBreaker = true; // Abbiamo trovato il breaker, ora vogliamo nascondere ciò che viene dopo
      }

      if (afterBreaker) {
        fullContent.push(n); // Salviamo il contenuto da nascondere
      }
    }

    if (fullContent.length > 0) {
      // Crea pulsante "Leggi tutto"
      const showSpan = document.createElement("span");
      showSpan.classList.add("breaker");
      showSpan.appendChild(document.createTextNode("Leggi di più..."));
      const showBtn = document.createElement("a");
      showBtn.classList.add("btn-breaker");
      showBtn.appendChild(showSpan);

      // Crea pulsante "Chiudi"
      const hideSpan = document.createElement("span");
      hideSpan.classList.add("breaker");
      hideSpan.appendChild(document.createTextNode("Chiudi"));
      const hideBtn = document.createElement("a");
      hideBtn.classList.add("btn-breaker");
      hideBtn.appendChild(hideSpan);

      // Tronca e mostra il pulsante "Leggi tutto"
      fullContent.forEach((node) => node.remove()); // Rimuove il contenuto dopo il breaker
      origNode.appendChild(showBtn); // Mostra il pulsante "Leggi tutto"

      // Evento per mostrare il contenuto nascosto
      showBtn.addEventListener("click", () => {
        fullContent.forEach((node) => origNode.appendChild(node)); // Mostra tutto il contenuto
        showBtn.remove(); // Rimuove il pulsante "Leggi tutto"
        origNode.appendChild(hideBtn); // Mostra il pulsante "Chiudi"
      });

      // Evento per nascondere nuovamente il contenuto
      hideBtn.addEventListener("click", () => {
        fullContent.forEach((node) => node.remove()); // Nasconde di nuovo il contenuto
        hideBtn.remove(); // Rimuove il pulsante "Chiudi"
        origNode.appendChild(showBtn); // Mostra nuovamente "Leggi tutto"
      });
    }
  }

  /*---------------------------------------------------- */
  /* FitText Settings
  	------------------------------------------------------ */
  setTimeout(function () {
    $("#intro h1").fitText(1, { minFontSize: "42px", maxFontSize: "84px" });
  }, 100);

  /*---------------------------------------------------- */
  /* FitVids
	------------------------------------------------------ */
  $(".fluid-video-wrapper").fitVids();

  /*---------------------------------------------------- */
  /* Owl Carousel
	------------------------------------------------------ */
  $("#owl-slider").owlCarousel({
    navigation: false,
    pagination: true,
    itemsCustom: [
      [0, 1],
      [700, 2],
      [960, 3],
    ],
    navigationText: false,
  });

  /*----------------------------------------------------- */
  /* Alert Boxes
  	------------------------------------------------------- */
  $(".alert-box").on("click", ".close", function () {
    $(this).parent().fadeOut(500);
  });

  /*----------------------------------------------------- */
  /* Stat Counter
  	------------------------------------------------------- */
  var statSection = $("#stats"),
    stats = $(".stat-count");

  statSection.waypoint({
    handler: function (direction) {
      if (direction === "down") {
        stats.each(function () {
          var $this = $(this);

          $({ Counter: 0 }).animate(
            { Counter: $this.text() },
            {
              duration: 4000,
              easing: "swing",
              step: function (curValue) {
                $this.text(Math.ceil(curValue));
              },
            }
          );
        });
      }

      // trigger once only
      this.destroy();
    },

    offset: "90%",
  });

  /*---------------------------------------------------- */
  /*	Masonry
	------------------------------------------------------ */
  var containerProjects = $("#folio-wrapper");

  containerProjects.imagesLoaded(function () {
    containerProjects.masonry({
      itemSelector: ".folio-item",
      resize: true,
    });
  });

  /*----------------------------------------------------*/
  /*	Modal Popup
	------------------------------------------------------*/
  $(".item-wrap a").magnificPopup({
    type: "inline",
    fixedContentPos: false,
    removalDelay: 300,
    showCloseBtn: false,
    mainClass: "mfp-fade",
  });

  $(document).on("click", ".popup-modal-dismiss", function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  /*-----------------------------------------------------*/
  /* Navigation Menu
   ------------------------------------------------------ */
  var toggleButton = $(".menu-toggle"),
    nav = $(".main-navigation");

  // toggle button
  toggleButton.on("click", function (e) {
    e.preventDefault();
    toggleButton.toggleClass("is-clicked");
    $("body").toggleClass("menu-open");
    nav.slideToggle();
  });

  // nav items
  nav.find("li a").on("click", function () {
    // update the toggle button
    toggleButton.toggleClass("is-clicked");
    // fadeout the navigation panel
    nav.fadeOut();
  });

  /*---------------------------------------------------- */
  /* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
  var sections = $("section"),
    navigation_links = $("#main-nav-wrap li a");

  sections.waypoint({
    handler: function (direction) {
      var active_section;

      active_section = $("section#" + this.element.id);

      if (direction === "up") active_section = active_section.prev();

      var active_link = $(
        '#main-nav-wrap a[href="#' + active_section.attr("id") + '"]'
      );

      navigation_links.parent().removeClass("current");
      active_link.parent().addClass("current");
    },

    offset: "25%",
  });

  /*---------------------------------------------------- */
  /* Smooth Scrolling
  	------------------------------------------------------ */
  $(".smoothscroll").on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        800,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });

  /*---------------------------------------------------- */
  /*  Placeholder Plugin Settings
	------------------------------------------------------ */
  $("input, textarea, select").placeholder();

  /*----------------------------------------------------- */
  /* Back to top
   ------------------------------------------------------- */
  var pxShow = 300; // height on which the button will show
  var fadeInTime = 400; // how slow/fast you want the button to show
  var fadeOutTime = 400; // how slow/fast you want the button to hide
  var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

  // Show or hide the sticky footer button
  jQuery(window).scroll(function () {
    if (!$("#header-search").hasClass("is-visible")) {
      if (jQuery(window).scrollTop() >= pxShow) {
        jQuery("#go-top").fadeIn(fadeInTime);
      } else {
        jQuery("#go-top").fadeOut(fadeOutTime);
      }
    }
  });
})(jQuery);

// GSAP ANIMAZIONI
function animazioniGsap(){
  // top-intro-header
  gsap.from('.top-bar', {scrollTrigger: "header",duration:2, ease: "expo.out",y: -250, scale: .5})
  gsap.from('.intro-content', {scrollTrigger: "#intro" ,scale: .1, duration: 2, ease: "bounce.out"});
  gsap.from('.intro-social li', {scrollTrigger: ".intro-social", y: 150, duration: 2, ease: "Power3.out", stagger: .2});
  // sezione about
  gsap.from('#about .section-intro .col-twelve .title-page', {scrollTrigger: {trigger: "#about", start: "top 80%"}, opacity: 0, y: -200, duration: 2, ease: "Power3.out"});
  gsap.from('#about .section-intro .col-twelve .subtitle', {scrollTrigger: {trigger: "#about", start: "top 80%"}, opacity: 0, y: 200, duration: 2, ease: "Power3.out", delay: .1});
  gsap.from('#about .image-profilo', {scrollTrigger: {trigger: "#about", start: "top 80%"}, opacity: 0,scale: .1, duration: 2, ease: "bounce.out"});
  gsap.from('#about .description', {scrollTrigger: {trigger: "#about", start: "top 80%"}, opacity: 0, duration:2.5,ease: "power4.out",x: 1000});
  gsap.from('#about .about-content .profilo .title', {scrollTrigger: "#about .about-content .profilo",opacity: 0, duration:1, ease: "power4.in",y: 200});
  gsap.from('#about .about-content .skills .title', {scrollTrigger: "#about .about-content .skills",opacity: 0, duration:1, ease: "power4.in",y: 200});
  gsap.from('#about .about-content .profilo ul li', {scrollTrigger: "#about .about-content .profilo", opacity: 0, duration:1, ease: "power4.out",x: -900, delay: .1, stagger: .2});
  gsap.from('#about .about-content .skills ul li', {scrollTrigger: "#about .about-content .skills", opacity: 0, duration:1, ease: "power4.out",x: 900, delay: .2, stagger: .2});
  gsap.from('#about .button-section .col-twelve .contattami', {scrollTrigger: "#about .button-section", opacity: 0, y: 200, duration:1, ease: "power4.in"});
  gsap.from('#about .button-section .col-twelve .scarica-cv', {scrollTrigger: "#about .button-section", opacity: 0, x: 850, duration:1, ease: "power4.in"});
  // sezione riepilogo
  gsap.from('#riepilogo .section-intro .col-twelve .title-page', {scrollTrigger: "#riepilogo",opacity: 0, y: -200, duration: 2, ease: "Power3.out"});
  gsap.from('#riepilogo .section-intro .col-twelve .subtitle', {scrollTrigger: "#riepilogo", opacity: 0, y: 200, duration: 2, ease: "Power3.out", delay: .2});
  gsap.from('#riepilogo .lavoro .resume-header .esperienze-lavorative', {scrollTrigger: "#riepilogo .lavoro", scale: .1, opacity: 0, duration: 2, ease: "Power3.out", delay: .4});
  gsap.from('#riepilogo .lavoro .timeline-wrap .left', {scrollTrigger: ".lavoro .timeline-wrap", opacity: 0, x: -200, duration: 2, ease: "Power3.out", delay: .5, stagger: .1});
  gsap.from('#riepilogo .lavoro .timeline-wrap .right', {scrollTrigger: ".lavoro .timeline-wrap", opacity: 0, x: 200, duration: 2, ease: "Power3.out", delay: .2, stagger: .1});
  gsap.from('#riepilogo .istruzione .resume-header .istruzione', {scrollTrigger: "#riepilogo .istruzione", scale: .1, opacity: 0, duration: 2, ease: "Power3.out", delay: .4});
  gsap.from('#riepilogo .istruzione .timeline-wrap .left', {scrollTrigger: ".istruzione .timeline-wrap", opacity: 0, x: -200, duration: 2, ease: "Power3.out", delay: .5, stagger: .5});
  gsap.from('#riepilogo .istruzione .timeline-wrap .right', {scrollTrigger: ".istruzione .timeline-wrap", opacity: 0, x: 200, duration: 2, ease: "Power3.out", delay: .2});
  // portfolio
  gsap.from('#portfolio .section-intro .col-twelve .title-page', {scrollTrigger: "#portfolio",opacity: 0, y: -200, duration: 2, ease: "Power3.out"});
  gsap.from('#portfolio .section-intro .col-twelve .subtitle', {scrollTrigger: "#portfolio", opacity: 0, y: 200, duration: 2, ease: "Power3.out", delay: .2});
  gsap.from('#portfolio .section-intro .col-twelve .lead', {scrollTrigger: "#portfolio", scale: .1, opacity: 0, duration: 2, ease: "Power3.out", delay: .4});
  gsap.from('#portfolio .portfolio-content #folio-wrapper .left', {scrollTrigger: {
    trigger: "#portfolio",
    start: "-=400",   // L'animazione inizia quando #portfolio entra nel viewport
    end: "bottom bottom", // L'animazione finisce quando #portfolio esce dal viewport
    // scrub: true,         // L'animazione sarà legata allo scroll
  }, opacity: 0, x: -200, duration: 2, ease: "Power3.in", stagger: .1});
  gsap.from('#portfolio .portfolio-content #folio-wrapper .right', {scrollTrigger: {
    trigger: "#portfolio",
    start: "-=400",   // L'animazione inizia quando #portfolio entra nel viewport
    end: "bottom bottom", // L'animazione finisce quando #portfolio esce dal viewport
    // scrub: true,         // L'animazione sarà legata allo scroll
  }, opacity: 0, x: 200, duration: 2, ease: "Power3.in", stagger: .1});
  // cosa posso fare per te
  gsap.from('#servizi .section-intro .col-twelve .subtitle', {scrollTrigger: "#servizi", opacity: 0, y: 200, duration: 2, ease: "Power3.in"});
  gsap.from('#servizi .section-intro .col-twelve .lead', {scrollTrigger: "#servizi", scale: .1, opacity: 0, duration: 2, ease: "Power3.in", delay: .1});
  gsap.from('#servizi .owl-wrapper-outer .owl-wrapper', {scrollTrigger: "#servizi  .owl-wrapper-outer", x:1000, opacity: 0, duration: 2, ease: "Power3.in", delay: .1});
  // separatore
  gsap.from('.separatore', {scrollTrigger: ".separatore", opacity: 0, duration: 2, ease: "Power4.in", delay: .1});
  // contatti
  gsap.from('#contatti .section-intro .col-twelve .title-page', {scrollTrigger: "#contatti",opacity: 0, y: -200, duration: 2, ease: "Power3.in"});
  gsap.from('#contatti .section-intro .col-twelve .subtitle', {scrollTrigger: "#contatti", opacity: 0, y: 200, duration: 2, ease: "Power3.in", delay: .2});
  gsap.from('#contatti .section-intro .col-twelve .lead', {scrollTrigger: "#contatti", scale: .1, opacity: 0, duration: 2, ease: "Power3.in", delay: .4});
  gsap.from('#contatti .contact-form form .form-field', {scrollTrigger: "#contatti .contact-form", scale: .1, opacity: 0, duration: 2, ease: "Power3.out", stagger: .2});
  gsap.from('#contatti .contact-info .luogo', {scrollTrigger: "#contatti .contact-info", opacity: 0, x: -500, duration: 2, ease: "Power3.in", delay: .1});
  gsap.from('#contatti .contact-info .email', {scrollTrigger: "#contatti .contact-info", opacity: 0, y: 300, duration: 2, ease: "Power3.in", delay: .2});
  gsap.from('#contatti .contact-info .cellulare', {scrollTrigger: "#contatti .contact-info", opacity: 0, x: 500, duration: 2, ease: "Power3.in", delay: .3});
  // footer
  gsap.from('footer .social .footer-social li', {scrollTrigger:"footer", x: 600, duration: 2, ease: "Power3.in", delay:.2, stagger: .2})
  gsap.from('footer .section-copyright .copyright', {scrollTrigger:"footer", x: -600, duration: 2, ease: "Power3.in", delay:.2, stagger: .2})
}
