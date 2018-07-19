// built2break.js
"use strict"


var bugsnagClient = bugsnag({
  apiKey: "c2f4a83fbb63b9c09898191a3da3cabd",
  maxEvents: 99,
  releaseStage: "whatever",
  beforeSend: function (report) {
      var user_info = fGetUserData();
      // report.updateMetaData('form_input': user_info);
      report.app.releaseStage = user_info["rstage"];
      report.user = {name: user_info["user"]};
      // add version option too.
  }
});

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


// Fires every time the page is loaded.
bugsnagClient.notify(new Error("ErrorName"));

// a basic JS error trigger, one time use
function fBoop(evt) {
    bugsnagClient.notify({ name: 'Beep', message: 'boop'})
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

// handles the button for JavaScript ??? error.
// FIX ******************  find a new error to throw :D
function fJsRange(evt) {
    var user_info = fGetUserData();
    var num = 1;

    if (user_info["handling"] === "yes") {
        try {
            num.toPrecision(500);
        }
        catch (e) {
            bugsnagClient.notify(e, {
              context: "a handled Range Error - ta da!!"
            });
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
            bugsnagClient.notify(e, {
              context: "a handled Reference Error - HUZZAH!"
            });
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
            bugsnagClient.notify(e, {
              context: "a handled Type Error - BOOYAH!"
            });
        }
            // action...?
    }
    else {
        // deliberate Type Error
        num.toUpperCase();
    }
}



// placeholder -- when bugsnag returns event id from api request
function fShowError(payload) {
    console.log('called fShowError');
}

// *************************************
// AJAX CALLS TO PYTHON ERRORS - DATA ACCESS API
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
