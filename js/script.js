$(document).ready(function() {
        var parallax2 = $(".img2"),
            dreamBigTrigger = parallax2.offset().top - $(window).height() / 2,
            dreamBig = $("#dream-big"),
            dreamBiggerTrigger = parallax2.offset().top,
            dreamBigger = $("#dream-bigger");

        $(window).scroll(function() {
            console.log("scroll big");
            if ($(window).scrollTop() > dreamBigTrigger && dreamBig.hasClass("isHidden")) {
                console.log("dreamBigTrigger");
                dreamBig.removeClass("isHidden");
                dreamBig.addClass("dream-text");
                dreamBig.animate({ left: '15%', opacity: '1' }, 2000);
            }
        });

        $(window).scroll(function() {
            console.log("scroll bigger");
            if ($(window).scrollTop() > dreamBiggerTrigger && dreamBigger.hasClass("isHidden")) {
                console.log("dreamBiggerTrigger");
                dreamBigger.removeClass("isHidden");
                dreamBigger.addClass("dream-text");
                dreamBigger.animate({ right: '15%', opacity: '1' }, 2000);
            }
        });

    }


);