// built2break.js
"use strict"

document.addEventListener ("DOMContentLoaded", function() 
    {
        // python error event listeners
        $('#beep').on('click', fBoop);
        $('#indexError').on('click', fIndex);
        $('#nameError').on('click', fName);
        $('#typeError').on('click', fType);
        // JS error event listeners
        $('#jsIndexError').on('click', fJsIndex);
        $('#jsNameError').on('click', fJsName);
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

  // if (rstage === "staging") {
  //   return false;
  //   }

    Bugsnag.releaseStage = rstage;
    // Bugsnag.user = {
    //     name: user_info["user"]
    // };
}

// Fires every time the page is loaded.
Bugsnag.notify("ErrorName", "Monkey pants!!!!!!1!!!!");

// a basic JS error trigger, one time use
function fBoop(evt) {
    Bugsnag.notify("Beep", "Boop");
    $('#beep').text("Boop");
    $('#beep').prop('disabled', true);
}


// captures the data user has selected on the page,
// to hand over to AJAX calls
function fGetUserData() {
    ///////////////////////////// if username empty.... ?
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

// handles the button for JavaScript Index error.
function fJsIndex(evt) {
    var user_info = fGetUserData();
    var stuff = [1,2,3];

    if (user_info["handling"] === "yes") {
        try {
////////////////////////////////////////////////////
            //  :D not acutally making an error! :D
            console.log(stuff[17]);
        } 
        catch (e) {
            Bugsnag.notifyException(e, "IndexError");            
        // action...?
        }

    }

    else {
        console.log(stuff[17]);
    }
}

// handles the button for JavaScript Name error.
function fJsName(evt) {
    var user_info = fGetUserData();
    if (user_info["handling"] === "yes") {
        try {
            console.log(doesntExist);
        } 
        catch (e) {
            //  SHOULD THIS BE SET HERE OR IN BEFORE.NOTIFY???
            Bugsnag.releaseStage = user_info["rstage"];
            Bugsnag.user = {
                name: user_info["user"]
            };
            Bugsnag.notifyException(e, "a handled Reference Error - HUZZAH!");            
        }
        // action...?
    }

    else {
        console.log(doesntExist);
    }
}

function fJsType(evt) {
    var user_info = fGetUserData();
    // if (user_info["handling"] === "yes") {
    //     try {
    //         // error line
    //     } 
    //     catch (e) {
    //         Bugsnag.notifyException(e, "Boop");            
    //     }
    //     // action...?
    // }

    // else {
    //     // error line
    // }
}





// placeholder -- not sure what to display yet
function fShowError(payload) {
    console.log('called fShowError');
}


// triggers a python Index Error
function fIndex(evt) {
    var user_info = fGetUserData();
    console.log(user_info);
    // sennding as get, not post - not form data, but a dictionary
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




