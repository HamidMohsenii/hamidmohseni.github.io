(function($) {

    "use strict";

    /* ----------------------------------------------------------- */
    /*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
    /* ----------------------------------------------------------- */

    function stop_videos() {
        var video = document.getElementById("video");
        if (video.paused !== true && video.ended !== true) {
            video.pause();
        }
        $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }

    $(document).ready(function() {

        /* ----------------------------------------------------------- */
        /*  STOP VIDEOS
        /* ----------------------------------------------------------- */

        $('.slideshow nav span').on('click', function () {
            stop_videos();
        });

        /* ----------------------------------------------------------- */
        /*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
        /* ----------------------------------------------------------- */

        $(".revealator-delay1").addClass('no-transform');

        /* ----------------------------------------------------------- */
        /*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

        if ($('.grid').length) {
            new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
        }

        /* ----------------------------------------------------------- */
        /*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

        $(".grid figure").on('click', function() {
            $("#navbar-collapse-toggle").addClass('hide-header');
        });

        /* ----------------------------------------------------------- */
        /*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

        $(".nav-close").on('click', function() {
            $("#navbar-collapse-toggle").removeClass('hide-header');
        });
        $(".nav-prev").on('click', function() {
            if ($('.slideshow ul li:first-child').hasClass('current')) {
                $("#navbar-collapse-toggle").removeClass('hide-header');
            }
        });
        $(".nav-next").on('click', function() {
            if ($('.slideshow ul li:last-child').hasClass('current')) {
                $("#navbar-collapse-toggle").removeClass('hide-header');
            }
        });

        /* ----------------------------------------------------------- */
        /*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

        var item = $(".grid li figure");
        var elementsLength = item.length;
        for (var i = 0; i < elementsLength; i++) {
            $(item[i]).hoverdir();
        }

        /* ----------------------------------------------------------- */
        /*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

        $(".contactform").on("submit", function() {
            $(".output_message").text("Sending...");

            var form = $(this);
            $.ajax({
                url: form.attr("action"),
                method: form.attr("method"),
                data: form.serialize(),
                success: function(result) {
                    if (result == "success") {
                        $(".form-inputs").css("display", "none");
                        $(".box p").css("display", "none");
                        $(".contactform").find(".output_message").addClass("success");
                        $(".output_message").text("Message Sent!");
                    } else {
                        $(".tabs-container").css("height", "440px");

                        $(".contactform").find(".output_message").addClass("error");
                        $(".output_message").text("Error Sending!");
                    }
                }
            });

            return false;
        });

    });

    $(document).keyup(function(e) {

        /* ----------------------------------------------------------- */
        /*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
        /* ----------------------------------------------------------- */
        if (e.keyCode === 27) {
            stop_videos();
            $('.close-content').click();
            $("#navbar-collapse-toggle").removeClass('hide-header');
        }
        if ((e.keyCode === 37) || (e.keyCode === 39)) {
            stop_videos();
        }
    });


})(jQuery);


$(document).ready(function() {
    $('.contactform').submit(function(e) {
        e.preventDefault();
        
        // ارسال اطلاعات فرم با استفاده از ایجکس
        $.ajax({
            type: 'POST',
            url: 'php/process-form.php', // آدرس فایل پردازشی فرم
            data: $(this).serialize(),
            success: function(response) {
                // نمایش پیام در مودال
                $('.output_message').html(response);
                $('#myModal').modal('show'); // نمایش مودال
                
                // بستن خودکار مودال پس از 10 ثانیه
                setTimeout(function() {
                    $('#myModal').modal('hide'); // بستن مودال
                }, 10000); // زمان مورد نظر بر حسب میلی‌ثانیه (اینجا 10000 میلی‌ثانیه = 10 ثانیه)
            },
            error: function(xhr, status, error) {
                // در صورت خطا نیز پیام خطا را نمایش دهید
                var errorMessage = "خطا در ارسال درخواست: " + xhr.status + " - " + xhr.statusText;
                $('.output_message').html(errorMessage);
                $('#myModal').modal('show'); // نمایش مودال
                // بستن خودکار مودال پس از 10 ثانیه
                setTimeout(function() {
                    $('#myModal').modal('hide'); // بستن مودال
                }, 2000); // زمان مورد نظر بر حسب میلی‌ثانیه (اینجا 10000 میلی‌ثانیه = 10 ثانیه)
                
            }
        });
    });
});