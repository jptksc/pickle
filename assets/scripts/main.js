
/***********************************************************************************
  
HTML Preloader
  
************************************************************************************/

$(window).load(function() {
    $("#overlay").delay(1000).fadeOut();
    $("section").delay(2000).css('opacity', '1');
});

/***********************************************************************************
  
Menu Scrolling
  
************************************************************************************/

// Cache selectors
var lastId,
    topMenu = $("#navigation"),
    topMenuHeight = topMenu.outerHeight() + 15,

    // All list items.
    menuItems = topMenu.find("a"),

    // Anchors corresponding to menu items.
    scrollItems = menuItems.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

// Fancy scrolling.
$('a[href*=#]:not([href=#])').click(function(e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 500);
    e.preventDefault();
});

// Bind to scroll.
$(window).scroll(function() {

    // Get container scroll position.
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get ID of current scroll item.
    var cur = scrollItems.map(function() {
        if ($(this).offset().top < fromTop)
            return this;
    });

    // Get the ID of the current element.
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        $('body').attr("class", "" + id + "");
        lastId = id;

        // Add or remove "current" class.
        menuItems
            .parent().removeClass("current")
            .end().filter("[href=#" + id + "]").parent().addClass("current");
    }
});

/***********************************************************************************
  
Contact Form Textarea Limitation
  
************************************************************************************/

(function(e){var t,n={className:"autosizejs",append:"",callback:!1,resizeDelay:10},r='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',i=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],s=e(r).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&i.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(r){return this.length?(r=e.extend({},n,r||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function n(){var t,n;"getComputedStyle"in window?(t=window.getComputedStyle(h,null),n=h.getBoundingClientRect().width,e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,r){n-=parseInt(t[r],10)}),s.style.width=n+"px"):s.style.width=Math.max(p.width(),0)+"px"}function o(){var o={};if(t=h,s.className=r.className,f=parseInt(p.css("maxHeight"),10),e.each(i,function(e,t){o[t]=p.css(t)}),e(s).css(o),n(),window.chrome){var u=h.style.width;h.style.width="0px",h.offsetWidth,h.style.width=u}}function u(){var e,i;t!==h?o():n(),s.value=h.value+r.append,s.style.overflowY=h.style.overflowY,i=parseInt(h.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,f&&e>f?(h.style.overflowY="scroll",e=f):(h.style.overflowY="hidden",l>e&&(e=l)),e+=d,i!==e&&(h.style.height=e+"px",v&&r.callback.call(h,h))}function a(){clearTimeout(c),c=setTimeout(function(){var e=p.width();e!==g&&(g=e,u())},parseInt(r.resizeDelay,10))}var f,l,c,h=this,p=e(h),d=0,v=e.isFunction(r.callback),m={height:h.style.height,overflow:h.style.overflow,overflowY:h.style.overflowY,wordWrap:h.style.wordWrap,resize:h.style.resize},g=p.width();p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(d=p.outerHeight()-p.height()),l=Math.max(parseInt(p.css("minHeight"),10)-d||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word",resize:"none"===p.css("resize")||"vertical"===p.css("resize")?"none":"horizontal"}),"onpropertychange"in h?"oninput"in h?p.on("input.autosize keyup.autosize",u):p.on("propertychange.autosize",function(){"value"===event.propertyName&&u()}):p.on("input.autosize",u),r.resizeDelay!==!1&&e(window).on("resize.autosize",a),p.on("autosize.resize",u),p.on("autosize.resizeIncludeStyle",function(){t=null,u()}),p.on("autosize.destroy",function(){t=null,clearTimeout(c),e(window).off("resize",a),p.off("autosize").off(".autosize").css(m).removeData("autosize")}),u())})):this}})(window.jQuery||window.$)

$(document).ready(function() {
    $('textarea').autosize();
});

$('textarea').keypress(function(e) {
    var tval = $('textarea').val(),
        tlength = tval.length,
        set = 600,
        remain = parseInt(set - tlength);
    $('p.characters').text(remain);
    if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
        $('textarea').val((tval).substring(0, tlength - 1))
    }
});

/***********************************************************************************
  
Contact Form Processing
  
************************************************************************************/

$(function() {

    // Get the form.
    var form = $('#contact-form');

    // Get the messages div.
    var formMessages = $('#contact-form .form-message');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {

        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })

        .done(function(response) {

            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#name').val('');
            $('#email').val('');
            $('#phone').val('');
            $('#message').val('');
        })

        .fail(function(data) {

            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
});

/***********************************************************************************
  
Mailchimp Form Processing
  
************************************************************************************/

$(function() {

    // Get the form.
    var form = $('#mailchimp-form');

    // Get the messages div.
    var formMessages = $('#news p');

    // Set up an event listener for the subscribe form.
    $(form).submit(function(e) {

        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })

        .done(function(response) {

            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#mc-email').val('');
        })

        .fail(function(data) {

            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured.');
            }
        });
    });
});
