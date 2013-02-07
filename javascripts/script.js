$(function(){
    // change the date of your countdown here
    // year to countdown to
    //var countdownYear = 2013;
    // month to countdown to 1 = Jan, 2 = Feb, etc
    //var countdownMonth = 1;
    // hour to countdown to
    //var countdownHour = 2;
    //var countdownDate = new Date( countdownYear, countdownMonth-1, countdownHour );

    //setupCountdownTimer( countdownDate );

    spaceParallax();

    hideIphoneBar();

    $("[placeholder]").togglePlaceholder();

    //$('#switcher').popover({ html: true, content: getSwitcherContent });
    //setupSwitcher();
    //setupSignupForm();

    $('#myModalEvent').on("click", function(){
        $("#myModal").modal();
    });

    $('#sugest-form').validate({
        rules: {
          inputName: {
            minlength: 2,
            required: true
          },
          inputEmail: {
            required: true,
            email: true            
          },
          inputMessage: {
            minlength: 2,
            required: true
          }
        },
            highlight: function(element) {
                $(element).closest('.control-group').removeClass('success').addClass('error');
            },
            success: function(element) {
                element
                .text('').addClass('valid')
                .closest('.control-group').removeClass('error').addClass('success');
            }
      });
});


$(window).load(function() {
    slabTextHeadlines();
});


// Function to slabtext the hero panel
function slabTextHeadlines() {
    $('html:not(.ie8)').find('.slab').slabText({
        // Don't slabtext the headers if the viewport is under 380px
        "viewportBreakpoint":380
    });
};

// countdown timer function
function setupCountdownTimer( date ) {
    var countdownUnit = $('.countdown-unit');
    var countdownBoxes = $(countdownUnit.find('span'));

    $('.countdown-unit').countdown({
        timestamp: date,
        callback: function(days, hours, minutes, seconds, ms){
            $(countdownBoxes[0]).html( days );
            $(countdownBoxes[1]).html( hours );
            $(countdownBoxes[2]).html( minutes );
            $(countdownBoxes[3]).html( seconds );
        }
    });
}

// Function to create subtle parallax space effect
function spaceParallax() {
    $('body').parallax({
        'elements': [
            {
              'selector': '.bg-1',
              'properties': {
                'x': {
                  'background-position-x': {
                    'initial': 0,
                    'multiplier': 0.02,
                    'invert': true
                  }
                }
              }
            },
            {
              'selector': '.bg-2',
              'properties': {
                'x': {
                  'background-position-x': {
                    'initial': 0,
                    'multiplier': 0.06,
                    'invert': true
                  }
                }
              }
            },
            {
              'selector': '.bg-3',
              'properties': {
                'x': {
                  'background-position-x': {
                    'initial': 0,
                    'multiplier': 0.2,
                    'invert': true
                  }
                }
              }
            }
        ]
    });
}

// Function to hide the address bar ion Iphone devices
function hideIphoneBar() {
    if( !window.location.hash && window.addEventListener ){
        window.addEventListener( "load",function() {
            setTimeout(function(){
                window.scrollTo(0, 0);
            }, 0);
        });
    }
}

$.fn.togglePlaceholder = function() {
    return this.each(function() {
        $(this)
        .data("holder", $(this).attr("placeholder"))
        .focusin(function(){
            $(this).attr('placeholder','');
        })
        .focusout(function(){
            $(this).attr('placeholder',$(this).data('holder'));
        });
    });
};

function setupSwitcher() {
    $( 'body' ).delegate( '.switch-option','change',function() {
        $( $(this).data( 'option') ).toggle( this.checked );
    });

    $( 'body' ).delegate( '.theme-option','click',function() {
        switch( $(this).data( 'option' ) ) {
            case 'sepia':
                $('body').addClass( 'theme-sepia' ).find( '.brand' ).find( 'img' ).attr( "src", "images/sepia-logo.png" );
            break;
            case 'color':
                $('body').removeClass( 'theme-sepia' ).find( '.brand' ).find( 'img' ).attr( "src", "images/logo.png" );
            break;
            case 'bazar':
                $('body').removeClass( 'fonts-set2' ).addClass( 'fonts-set1' );
                slabTextHeadlines();
            break;
            case 'sonsie':
                $('body').removeClass( 'fonts-set1' ).addClass( 'fonts-set2' );
                slabTextHeadlines();
            break;
        }
    });

}

function setupSignupForm() {
    var mainDiv = $('.signup');
    $('.signup-button').click( function() {
        var email = $('#email-signup').val();
        // validate email here
        var request = $.ajax({
            url: "sign_me_up.php",
            context: this,
            type: "POST",
            dataType: "JSON",
            data: { "email": email }
        });

        request.done(function( data ) {
            if( data.error === undefined ) {
                mainDiv.find( '.response .email' ).text( data.email );
                mainDiv.find( '.response .status' ).text( 'Registered' );
                mainDiv.addClass( 'signup-active signup-success' );
            }
            else {
                mainDiv.find( '.response .email' ).text( data.email );
                mainDiv.find( '.response .status' ).text( data.error );
                mainDiv.addClass( 'signup-active signup-error' );
                setTimeout( function() {
                    mainDiv.removeClass( 'signup-active signup-error' )
                }, 3000 );
            }
        });

        return false;
    });

    // fix placeholders for ie8, ie9
    $('.ie8, .ie9').find('input').placeholder();
}

function getSwitcherContent() {
    var switcher = $( '.switcher-container' );
    switcher.find( ':checkbox' ).each( function() {
        var checkbox = $( this );
        var elementVisible = $( checkbox.data( 'option' ) ).is(":visible");
        if( !elementVisible ) {
            checkbox.removeAttr('checked');
        }
        else {
            checkbox.attr('checked','checked');
        }
    });
    return switcher.html();
}
;
