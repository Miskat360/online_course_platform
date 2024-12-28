(function ($) {
  "use strict";

  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    preloader();
  });

  $(function () {
    mainNav();
    stickyHeader();
    slickInit();
    scrollUp();
    tabs();
    review();
    rangeSlider();
    if ($.exists(".wow")) {
      new WOW().init();
    }
  });

  $(window).on("scroll", function () {
    showScrollUp();
  });
  /*---------------
    Preloader
  -------------------*/
  function preloader() {
    $(".td_preloader").fadeOut();
    $("td_preloader_in").delay(150).fadeOut("slow");
  }
  /*-----------------
   Mobile Menu
  ---------------------*/
  function mainNav() {
    $(".td_nav").append('<span class="td_menu_toggle"><span></span></span>');
    $(".menu-item-has-children").append(
      '<span class="td_munu_dropdown_toggle"><span></span></span>'
    );
    $(".td_menu_toggle").on("click", function () {
      $(this)
        .toggleClass("td_toggle_active")
        .siblings(".td_nav_list_wrap")
        .toggleClass("td_active");
    });
    $(".td_munu_dropdown_toggle").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });

    $(".td_header_dropdown_btn").on("click", function () {
      $(this).toggleClass("active");
    });
    /* Search Toggle */
    $(".td_search_tobble_btn").on("click", function () {
      $(".td_header_search_wrap").toggleClass("active");
    });
    /* Side Nav */
    $(".td_hamburger_btn").on("click", function () {
      $(".td_side_header").addClass("active");
      $("html").addClass("td_hamburger_active");
    });
    $(".td_close, .td_side_header_overlay").on("click", function () {
      $(".td_side_header").removeClass("active");
      $("html").removeClass("td_hamburger_active");
    });
  }

  /*-------------
    Sticky Header
  -------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $(".td_sticky_header");
    var headerHeight = $header.outerHeight() + 20;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass("td_gescout_sticky");
      } else {
        $header.removeClass("td_gescout_sticky");
        $header.removeClass("td_gescout_show");
      }

      if ($header.hasClass("td_gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          $header.addClass("td_gescout_show");
        } else {
          $header.removeClass("td_gescout_show");
        }
      }
      lastScrollTop = windowTop;
    });
  }
  /*------------------
    Slick Slider
  ---------------*/
  function slickInit() {
    if ($.exists(".td_slider")) {
      $(".td_slider").each(function () {
        var $ts = $(this).find(".td_slider_container");
        var $slickActive = $(this).find(".td_slider_wrapper");
        var autoPlayVar = parseInt($ts.attr("data-autoplay"), 10);
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        var speedVar = parseInt($ts.attr("data-speed"), 10);
        var loopVar = Boolean(parseInt($ts.attr("data-loop"), 10));
        var centerVar = Boolean(parseInt($ts.attr("data-center"), 10));
        var variableWidthVar = Boolean(
          parseInt($ts.attr("data-variable-width"), 10)
        );
        var paginaiton = $(this)
          .find(".td_pagination")
          .hasClass("td_pagination");
        var slidesPerView = $ts.attr("data-slides-per-view");
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == "responsive") {
          var slidesPerView = parseInt($ts.attr("data-add-slides"), 10);
          var lgPoint = parseInt($ts.attr("data-lg-slides"), 10);
          var mdPoint = parseInt($ts.attr("data-md-slides"), 10);
          var smPoint = parseInt($ts.attr("data-sm-slides"), 10);
          var xsPoing = parseInt($ts.attr("data-xs-slides"), 10);
        }
        var fadeVar = parseInt($($ts).attr("data-fade-slide"));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: "28%",
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find(".td_left_arrow"),
          nextArrow: $(this).find(".td_right_arrow"),
          appendDots: $(this).find(".td_pagination"),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
              },
            },
          ],
        });
      });
    }
  }
  /*---------------
    Scroll Up
  ---------------*/
  function scrollUp() {
    $(".td_scrollup").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        0
      );
    });
  }
  /* For Scroll Up */
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $(".td_scrollup").addClass("td_scrollup_show");
    } else {
      $(".td_scrollup").removeClass("td_scrollup_show");
    }
  }
  /*-----------
   Tabs
  ----------------*/
  function tabs() {
    $(".td_tabs .td_tab_links a").on("click", function (e) {
      var currentAttrValue = $(this).attr("href");
      $(".td_tabs " + currentAttrValue)
        .fadeIn(400)
        .siblings()
        .hide();
      $(this).parents("li").addClass("active").siblings().removeClass("active");
      e.preventDefault();
    });
  }
  /*--------------
    Review
  --------------*/
  function review() {
    $(".td_rating").each(function () {
      var review = $(this).data("rating");
      var reviewVal = review * 20 + "%";
      $(this).find(".td_rating_percentage").css("width", reviewVal);
    });
  }
})(jQuery);
