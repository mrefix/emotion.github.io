$(document).ready(function() {


    $(".screen-overlap").css({ "height": $(window).height(), "width": $(window).width() });
    $("#blackout").css({ "height": $(window).height(), "width": $(window).width() });

    /* Prep light effect */
    $(".lightEffect").css({ "height": $(window).height() * 2, "width": $(window).width() });

    // Points A and B are on left light, C and D are on right light
    var A = $(window).width() * .04071050 + "," + $(window).height() * .15444617,
        B = $(window).width() * .07318282 + "," + $(window).height() * .07800312,
        C = $(window).width() * .92746113 + "," + $(window).height() * .07800312,
        D = $(window).width() * .95706883 + "," + $(window).height() * .15444617,
        // left triangle (0,0   0,height    10% of width,height   A    B    50% of width,0)
        leftPolyPoints = "0,0 0," + $(window).height() * 2 + " " + $(window).width() / 10 + "," + $(window).height() * 2 + " " + A + " " + B + " " + $(window).width() + ",0",
        // right triangle (width,0    width,height    height,90% of width     D    C    50% of width,0)
        rightPolyPoints = $(window).width() + ",0 " + $(window).width() + "," + $(window).height() * 2 + " " + $(window).width() * 9 / 10 + "," + $(window).height() * 2 + " " + D + " " + C + $(window).width() / 2 + ",0";
    $("#left-poly").attr("points", leftPolyPoints);
    $("#right-poly").attr("points", rightPolyPoints);

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
        } else { // This will be the block of code ran after the slow animated transition 
            // has already happened (so it doesn't keep happening) 
            if (topPos < blackOutStart && lightsInPlace) {
                reelInTheLights();
            } else if (topPos > transitionTrigger && !lightsInPlace) {
                bringOutTheLightsQuick();
            }
        }
    });

    var leftLight = $("#left-light"),
        rightLight = $("#right-light"),
        rightShadow = $("#right-shadow"),
        leftShadow = $("#left-shadow"),
        lightAwayTopPos = -114,
        lightAwaySidePos = -250,
        // The lights move in both directions 100px to get out of view 
        lightTransitionDisplacement = 150;

    function bringOutTheLightsAnimation() {
        lightTransitionTriggered = true;
        lightsInPlace = true;
        blackout.css("opacity", 1);
        //move in lights
        leftLight.animate({
            left: lightAwaySidePos + lightTransitionDisplacement + "px",
            top: lightAwayTopPos + lightTransitionDisplacement + "px"
        }, 1000);
        rightLight.animate({
            right: lightAwaySidePos + lightTransitionDisplacement + "px",
            top: lightAwayTopPos + lightTransitionDisplacement + "px"
        }, 1000, function() {
            $(window).scrollTop(actionContainer.offset().top);
            blackout.animate({ "opacity": "0" }, 2000);
            $(".lightEffect").animate({ opacity: ".7" }, 1000);
        });
        // apply gradient
    }

    function bringOutTheLightsQuick() {
        lightsInPlace = true;
        leftLight.animate({
            left: lightAwaySidePos + lightTransitionDisplacement + "px",
            top: lightAwayTopPos + lightTransitionDisplacement + "px"
        }, 1000);
        rightLight.animate({
            right: lightAwaySidePos + lightTransitionDisplacement + "px",
            top: lightAwayTopPos + lightTransitionDisplacement + "px"
        }, 1000);
        leftShadow.animate({
            left: (leftShadow.position().left + lightTransitionDisplacement) + "px",
            top: (leftShadow.position().top + lightTransitionDisplacement) + "px"
        }, 1000);
        rightShadow.animate({
            left: (rightShadow.position().left - lightTransitionDisplacement) + "px",
            top: (rightShadow.position().top + lightTransitionDisplacement) + "px"
        }, 1000);
    }

    function reelInTheLights() {
        lightsInPlace = false;
        //make triangles go away
        //make lights go away at the same time
        leftLight.animate({
            left: lightAwaySidePos + "px",
            top: lightAwayTopPos + "px"
        }, 1000);
        rightLight.animate({
            right: lightAwaySidePos + "px",
            top: lightAwayTopPos + "px"
        }, 1000);
        //remove gradient
        //opacity is handled
        leftShadow.animate({
            left: (leftShadow.position().left - lightTransitionDisplacement) + "px",
            top: (leftShadow.position().top - lightTransitionDisplacement) + "px"
        }, 1000);
        rightShadow.animate({
            left: (rightShadow.position().left + lightTransitionDisplacement) + "px",
            top: (rightShadow.position().top - lightTransitionDisplacement) + "px"
        }, 1000);
    }
});