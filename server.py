"""server for built2break
"""

from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template,
                   redirect, request, flash, session, Markup, copy_current_request_context, has_request_context)
from flask_debugtoolbar import DebugToolbarExtension
import bugsnag
from bugsnag.flask import handle_exceptions

import os


app = Flask(__name__)
# http://flask.pocoo.org/docs/0.12/appcontext/ ----session error

handle_exceptions(app) # bugsnag config

app.secret_key = "monkey"

app.jinja_env.endefined = StrictUndefined

bugsnag.configure(
    api_key=os.environ.get("BUGSNAG_KEY"),
    project_root="/",
)



def callback(notification):
    """for unhandled errors, capturing user and session data.
    """
    if has_request_context():
        rstage = session["rstage"]
        if rstage == "staging":
            return False
        else:
            bugsnag.configure(release_stage = rstage)
        # You can set properties of the notification
            notification.user = {"name": session["user"]}
            notification.app.version = session["version"]
    else:
        pass
    # add some fun suff here - fav color, astrological sign :P
    # notification.add_tab("account", {"paying": current_user.acccount.is_paying()})

# Call `callback` before every notification
bugsnag.before_notify(callback)


def set_user_info(args):
    """accepts the request args from an Ajax call,
    and updates info in session.
    """
    user_name = args.get("user", "Donkey Kong")
    # if user leaves field blank, default string:
    if user_name.strip() == "":
        user_name = "NEMO"

    session["user"] = user_name
    session["rstage"] = args.get("rstage", "monkeys")
    session["handling"] = args.get("handling", "no")
    session["version"] = args.get("version", "2.0")

    return None


@app.route('/')
def index():
    """Homepage. Sets default session info."""
    session["user"] = "Raving Rabid :D"
    session["rstage"] = "production"
    session["handling"] = "no"
    return render_template("homepage.html")


@app.route('/index_error', methods=['POST', 'GET'])
def index_error():
    """Will generate an out of index error."""
    user_info = request.args
    set_user_info(user_info)
    stuff = [1,2,3]

    if session["handling"] == "yes":
        try:
            print(stuff[17])
        except Exception as e:
            bugsnag.notify(e, context="handled Index Error - ta da!")
            # show_error_dialog(). <--what is this?? from bs docs
                        # return value to page ------------
    else:
        print("trying ...........")
        #deliberate, unhandled out of range error
        print(stuff[17])


@app.route('/name_error')
def name_error():
    """Will generate a name error."""
    user_info = request.args
    set_user_info(user_info)


    if session["handling"] == "yes":
        # having issues with session - but not for unhandled??? how?
        try:
            print(doesnt_exist)
        except Exception as e:
            bugsnag.notify(e, context="handled Name Error - Booyah!")
            # show_error_dialog(). <--what is this?? from bs docs
                        # return value to page ------------
    else:
        print("trying ...........")
        #deliberate, unhandled name error
        print(doesnt_exist)

@app.route('/type_error')
def type_error():
    """Will generate a type error."""
    user_info = request.args
    set_user_info(user_info)


    if session["handling"] == "yes":
        # having issues with session - but not for unhandled??? how?
        try:
            print("monkey" + 3)
        except Exception as e:
            bugsnag.notify(e, context="handled Type Error - HUZZAH!")
            # show_error_dialog(). <--what is this?? from bs docs
                        # return value to page ------------
    else:
        print("trying ...........")
        #deliberate, unhandled name error
        print("monkey" + 3)


##################################################

if __name__ == '__main__':

    #helps with debugging
    app.debug = True
    #not caching on reload
    app.jinja_env.auto_reload = app.debug
    # fires a single error notification:
    bugsnag.notify(Exception("Test Error"))


    #use debug toolbar
    DebugToolbarExtension(app)
    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = "NO_DEBUG" not in os.environ
    app.run(host="0.0.0.0", port=PORT, debug=DEBUG)
