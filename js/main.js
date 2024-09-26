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

    document.querySelector("#intro #myVideo").setAttribute("autplay", "true");
    // IMPORTANTE PER FAR AVVIARE IL VIDEO ANCHE SU DISPOSITIVO MOBILE
    document.querySelector("#intro #myVideo").setAttribute('playsinline', '')
    
    // will first fade out the loading animation
    $("#loader").fadeOut("slow", function () {
      // will fade out the whole DIV that covers the website.
      $("#preloader").delay(300).fadeOut("slow");
      
      trimText();
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

  /*---------------------------------------------------- */
  /*	contact form
	------------------------------------------------------ */

  /* local validation */
  // $('#contactForm').validate({

  // 	/* submit via ajax */
  // 	submitHandler: function(form) {

  // 		var sLoader = $('#submit-loader');

  // 		$.ajax({

  // 	      type: "POST",
  // 	      url: "inc/sendEmail.php",
  // 	      data: $(form).serialize(),
  // 	      beforeSend: function() {

  // 	      	sLoader.fadeIn();

  // 	      },
  // 	      success: function(msg) {

  //             // Message was sent
  //             if (msg == 'OK') {
  //             	sLoader.fadeOut();
  //                $('#message-warning').hide();
  //                $('#contactForm').fadeOut();
  //                $('#message-success').fadeIn();
  //             }
  //             // There was an error
  //             else {
  //             	sLoader.fadeOut();
  //                $('#message-warning').html(msg);
  // 	            $('#message-warning').fadeIn();
  //             }

  // 	      },
  // 	      error: function() {

  // 	      	sLoader.fadeOut();
  // 	      	$('#message-warning').html("Ops! Qualcosa è andato storto,");
  // 	         $('#message-warning').fadeIn();

  // 	      }

  //       });
  // 	}

  // });

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
