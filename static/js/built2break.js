// built2break.js
"use strict"

//  global value - but should be overwritten for each error.
Bugsnag.releaseStage = "whatever";
Bugsnag.appVersion = "1.3.1";

document.addEventListener ("DOMContentLoaded", function()
    {
        // python error event listeners
        $('#beep').on('click', fBoop);
        $('#indexError').on('click', fIndex);
        $('#nameError').on('click', fName);
        $('#typeError').on('click', fType);
        // JS error event listeners
        $('#jsRangeError').on('click', fJsRange);
        $('#jsRefError').on('click', fJsRef);
        $('#jsTypeError').on('click', fJsType);


    } // closes anon function
); // closes DOM event listener
console.log("connected!!!!!!!");



// severity    (optional) The seriousness of the error,
// selected from the options info, warning and error, listed in order of increasing severity

// Configuration for unhandled errors.
Bugsnag.beforeNotify = function(payload, metaData) {
    var user_info = fGetUserData();
    metaData.form_input = user_info;
    var rstage = user_info["rstage"];

    if (rstage === "staging") {
        return false;
        }

    payload.releaseStage = rstage;
    payload.user = {
        name: user_info["user"]
    };
}

// Fires every time the page is loaded.
Bugsnag.notify("ErrorName", "Monkey pants!!!!!!1!!!!");

// a basic JS error trigger, one time use
function fBoop(evt) {
    Bugsnag.notify("Beeeep", "Boop");
    $('#beep').text("Boop");
    $('#beep').prop('disabled', true);
}


// captures the data user has selected on the page,
// to hand over to AJAX calls
function fGetUserData() {
    var user = $('#username').val();
    var rstage = $('#rstage option:selected').val();
    var handling = $('#handling input:checked').val();
    // if user field is blank:
    if (user.trim() === "") {
        user = "Voltron, Defender of the Universe"
    }

    var user_info = {
        "user": user,
        "rstage": rstage,
        "handling": handling
    };

    console.log(user_info);
    return user_info;
}


// *************************************
// FUNCTIONS TO TRIGGER JAVASCRIPT ERRORS
// *************************************

// handles the button for JavaScript Index error.
function fJsRange(evt) {
    var user_info = fGetUserData();
    var num = 1;

    if (user_info["handling"] === "yes") {
        try {
            num.toPrecision(500);
        }
        catch (e) {
            Bugsnag.notifyException(e, "a handled Range Error - ta da!!");
        // action...?
        }
    }

    else {
        // deliberate Range Error
        num.toPrecision(500);
    }
}

// handles the button for JavaScript Name error.
function fJsRef(evt) {
    var user_info = fGetUserData();
    if (user_info["handling"] === "yes") {
        try {
            console.log(doesntExist);
        }
        catch (e) {
            Bugsnag.notifyException(e, "a handled Reference Error - HUZZAH!");
        }
        // action...?
    }

    else {
        // deliberate Reference Error
        console.log(doesntExist);
    }
}

// handles the button for JavaScript Type error.
function fJsType(evt) {
    var user_info = fGetUserData();
    if (user_info["handling"] === "yes") {
    var num = 1;
        try {
            num.toUpperCase();
        }
        catch (e) {
            Bugsnag.notifyException(e, "a handled Type Error - BOOYAH!");
        }
            // action...?
    }
    else {
        // deliberate Type Error
        num.toUpperCase();
    }
}



// placeholder -- not sure what to display yet
function fShowError(payload) {
    console.log('called fShowError');
}

// *************************************
// AJAX CALLS TO PYTHON ERRORS
// *************************************


// triggers a python Index Error
function fIndex(evt) {
    var user_info = fGetUserData();
    console.log(user_info);
    // sending as get, not post - not form data, but a dictionary
    // fShowError not executing.  Success function doesn't return value.
    $.get('/index_error', user_info, fShowError);
}

//  triggers a python Name error
function fName(evt) {
    var user_info = fGetUserData();
    $.get('/name_error', user_info, fShowError);
}

//  triggers a python Type error
function fType(evt) {
    var user_info = fGetUserData();
    $.get('/type_error', user_info, fShowError);
}
