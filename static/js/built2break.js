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

Bugsnag.beforeNotify = function(payload, metaData) {
  metaData.form_input = fGetUserData();
  var rstage = metaData.form_input["rstage"];
  if (rstage === "staging") {
    return false;
}
  Bugsnag.releaseStage = rstage;
  Bugsnag.user = {
    name: metaData.form_input["user"]
    };
  }


Bugsnag.notify("ErrorName", "Monkey pants!!!!!!1!!!!");

// a basic JS error trigger, one time use
function fBoop(evt) {
    Bugsnag.notify("Beep", "Boop");
    $('#beep').text("Boop");
    $('#beep').prop('disabled', true);
}

function fJsIndex(evt) {
    var user_info = fGetUserData();
    var stuff = [1,2,3];

    if (user_info["handling"] === "yes") {
        try {
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

function fJsName(evt) {
    var user_info = fGetUserData();
    if (user_info["handling"] === "yes") {
        try {
            console.log(doesntExist);
        } 
        catch (e) {
            // form_details = fGetUserData();
            // Bugsnag.releaseStage = form_details["rstage"];
            // Bugsnag.user = {
            //     name: form_details["user"]
            // };
            // metadata = {
            //     "form_input": form_details
            // }
            Bugsnag.notifyException(e, "a handled Reference Error - HUZZAH!");            
        }
        // action...?
    }

    else {
        console.log(doesntExist);
    }
}

// function fJsType(evt) {
//     var user_info = fGetUserData();
//     if (user_info["handling"] === "yes") {
//         try {
//             // error line
//         } 
//         catch (e) {
//             Bugsnag.notifyException(e, "Boop");            
//         }
//         // action...?
//     }

//     else {
//         // error line
//     }
// }

// placeholder -- not sure what to display yet
function fShowError(payload) {
    console.log('called fShowError');
}

// captures the data user has selected on the page,
// to hand over to AJAX calls
function fGetUserData() {
    // if username empty.... ?
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
    // sennding as get, not post - not form data, but a dictionary
    // fShowError not executing.  View function doesn't return value.
    $.get('/index_error', user_info, fShowError);
}

function fName(evt) {
    var user_info = fGetUserData();
    $.get('/name_error', user_info, fShowError);
}

function fType(evt) {
    var user_info = fGetUserData();
    $.get('/type_error', user_info, fShowError);
}






