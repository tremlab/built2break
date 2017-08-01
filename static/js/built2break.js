// flix2comix.js
"use strict"

document.addEventListener ("DOMContentLoaded", function() 
    {
        $('#beep').on('click', fBoop);
        $('#outOfIndexError').on('click', fIndex);
        $('#nameError').on('click', fName);


    } // closes anon function
); // closes DOM event listener

console.log("connected!!!!!!!");
Bugsnag.notify("ErrorName", "Monkey pants!!!!!!1!!!!");

// BUGSNAG CALLBACK FOR JS ERRORS!!!




// a basic JS error trigger, one time use
function fBoop(evt) {
    Bugsnag.notify("Beep", "Boop");
    $('#beep').text("Boop");
    $('#beep').prop('disabled', true);
}

// placeholder -- not sure what to display yet
function fShowError(payload) {
    console.log('called fShowError');
}

// captures the data user has selected on the page,
// to hand over to AJAX calls
function fGetUserData() {
    var user = $('#username').val();
    var rstage = $('#rstage option:selected').val();
    var handling = $('#handling input:checked').val();

    var user_info = {
        "user": user,
        "rstage": rstage,
        "handling": handling
    };

    console.log(user_info);
    return user_info;

}

// triggers a python Index Error
function fIndex(evt) {
    var user_info = fGetUserData();
    console.log(user_info);
    $.get('/index_error', user_info, fShowError);
}

function fName(evt) {
    var user_info = fGetUserData();
    $.get('/name_error')
}





// function fGetMovie(evt) {
//     $.get('/getMovie', fDisplayMovie);
// }

// function fSkipMovie(evt) {
//     var movie = {"movie_id": $(this).data('movie')};
//     $.post('/skipMovie', movie, fDisplayMovie);
// }

// function fDisplayMovie(results) {
//     $.get('/rateCount', fMovieCounter);
//     $('#movieStars').html(results);
//     $('input[type=radio]').on('click', fRateMovie);
//     $('#skip').on('click', fSkipMovie);
// }

// function fMovieCounter(results) {
//     $('#movieCounter').html(results);
//     if (parseInt(results) > 5) {
//         $('#getBookButton').prop('disabled', false);
//         $('#progressBar').empty();
//     }
//     else {
//         $("#bar").attr("value", parseInt(results));
//     }
// }

// function fRateMovie(evt) {
//     console.log(this);

//     var formInputs = {
//         "movie_id": $(this).data("movie"),
//         "rating": $(this).data("rating")
//     };
//     console.log(formInputs['movie_id']);

//     $.post('/rate', formInputs, fDisplayMovie)
// }

// function fHandleEnter(evt) {
//     $(this).addClass("highlight");
// }

// function fHandleExit(evt) {
//     $(this).removeClass("highlight");
// }

// function fDisplayRegForm(evt) {
//     $('#registerForm').removeClass('hidden');
//     $('#notSignedIn').hide();
//     console.log("clicky reg");
// }

// function fHideRegForm(evt) {
//     $('#registerForm').addClass('hidden');
//     $('#notSignedIn').show();
//     console.log("clicky cancel");
// }

// function fDisplayLoginForm(evt) {
//     $('#loginForm').removeClass('hidden');
//     $('#notSignedIn').hide();
//     console.log("clicky login");
// }

// function fHideLoginForm(evt) {
//     $('#loginForm').addClass('hidden');
//     $('#notSignedIn').show();
//     console.log("clicky cancel login");
// }

// function fPasswordsMatch(evt) {
//     if ($('#password').val() === $('#password2').val()) {
//         $('#passMatch').empty();        
//     }

//     else {
//         $('#passMatch').html('<p>passwords do not match. :(</p>');
//     }
// }
// // TEST!!!!!!!!!!!!!!!
// function fValidateEmail(evt) {
//     var emailInput = $('#email').val();
//     if (emailInput.length > 0) {
//         var emailRegEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//         if (emailRegEx.test(emailInput)) {
//             $('#emailValid').empty();        
//         }

//         else {
//             $('#emailValid').html('<p>please enter a valid email. :(</p>');
//         }
//     }
// }

// function fDisplayUserForm(evt) {
//     $('#editUserForm').removeClass('hidden');
//     $('#editUserButton').hide();
//     console.log("clicky reg");
// }

// function fHideUserForm(evt) {
//     $('#editUserForm').addClass('hidden');
//     $('#editUserButton').show();
//     console.log("clicky cancel");
// }


// function fEnableSubmit(evt) {
//     if (
//         $('#email').val().length > 0 && 
//         $('#password').val().length > 0 &&
//         $('#password').val() === $('#password2').val()
//         // confirm email ok?
//     )
//         {
//         $('#registerButton').prop('disabled', false);
//         }

// }



// reference only below...


        // $('#loginForm input').on('focus', fHandleEnter);   // toggle?
        // $('#registerForm input').on('focus', fHandleEnter);   // toggle?
        // $('#registerForm input').on('blur', fHandleExit);   // toggle?
        // $('#loginForm input').on('blur', fHandleExit);
        // $('#registerForm input').on('blur', fEnableSubmit);

        // $('#signUpButton').on('click', fDisplayRegForm);
        // $('#cancelReg').on('click', fHideRegForm);
        // $('#loginButton').on('click', fDisplayLoginForm);
        // $('#cancelLogin').on('click', fHideLoginForm);
        // $('#editUserButton').on('click', fDisplayUserForm);
        // $('#cancelEditUser').on('click', fHideUserForm);

        // $('#email').on('blur', fValidateEmail);
        // $('#password2').on('blur', fPasswordsMatch);

        // $('#startButton').on('click', fGetMovie);
        // $('#startButton').on('click', function () {$('#intro').hide()});
        // // needs to be dynamic for movie/comic
        // $('input[type=radio]').on('click', fRateMovie);