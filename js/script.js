$(document).ready(function() {


    $(".screen-overlap").css({ "height": $(window).height(), "width": $(window).width() });
    $("#blackout").css({ "height": $(window).height(), "width": $(window).width() });

    /* parallax2 */
    var parallax2 = $(".img2"),
        dreamBigTrigger = parallax2.offset().top - $(window).height() / 2,
        dreamBig = $("#dream-big"),
        dreamBiggerTrigger = parallax2.offset().top,
        dreamBigger = $("#dream-bigger"),
        haveBothTriggered = false;

    $(window).scroll(function() {
        // Helps with performance
        if (!haveBothTriggered) {
            if ($(window).scrollTop() > dreamBigTrigger && dreamBig.hasClass("isHidden")) {
                dreamBig.removeClass("isHidden");
                dreamBig.addClass("dream-text");
                dreamBig.animate({ left: '15%', opacity: '1' }, 1000);
            }

            if ($(window).scrollTop() > dreamBiggerTrigger && dreamBigger.hasClass("isHidden")) {
                dreamBigger.removeClass("isHidden");
                dreamBigger.addClass("dream-text");
                dreamBigger.animate({ right: '15%', opacity: '1' }, 1000);
                haveBothTriggered = true;
            }
        }
    });


    /* Transition effect */

    var blackout = $("#blackout"),
        blackOutStart = dreamBigger.offset().top - $(window).height() / 2,
        actionContainer = $(".action-container"),
        transitionTrigger = actionContainer.offset().top - $(window).height(),
        opacity = 0;

    // So the light transition is only triggered once
    var lightTransitionTriggered = false,
        lightsInPlace = false;

    //blackOut Effect
    $(window).scroll(function() {
        var topPos = $(window).scrollTop();
        if (!lightTransitionTriggered) {
            if (topPos < blackOutStart) {
                blackout.css("opacity", 0);
            } else if (topPos > blackOutStart && topPos < transitionTrigger) {
                blackout.css({ "height": $(window).height(), "width": $(window).width() });
                opacity = 1 - (transitionTrigger - topPos) / (transitionTrigger - blackOutStart);
                blackout.css("opacity", opacity);
            } else if (topPos > transitionTrigger) {
                console.log("bringOutTheLights");
                bringOutTheLightsAnimation();
            }
        } else { // This is past the transitionTrigger
            if (topPos < blackOutStart) {
                console.log("reelInTheLights");
                reelInTheLights();
            }
        }
    });

    var leftLight = $("#left-light"),
        rightLight = $("#right-light"),
        rightTriangle = $("#right-triangle"),
        leftTriangle = $("#left-triangle"),
        topTriangle = $("#top-triangle"),
        // The lights move in both directions 100px to get out of view 
        lightTransitionDisplacement = "100px";

    function bringOutTheLightsAnimation() {
        lightTransitionTriggered = true;
        lightsInPlace = true;
        blackout.css("opacity", 1);
        $(window).scrollTop(actionContainer.offset().top);
        //move in lights
        //leftLight.animate("")
        // apply gradient
        // bring in triangles
        blackout.animate({ "opacity": "0" }, 2000);
    }

    function bringOutTheLightsQuick() {
        lightsInPlace = true;
    }

    function reelInTheLights() {
        lightsInPlace = false;
        //make triangles go away
        //make lights go away at the same times
        //remove gradient
        //opacity is handled
    }
});