"""server for built2break
"""

from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template,
                   redirect, request, flash, session, Markup)
from flask_debugtoolbar import DebugToolbarExtension
import bugsnag
from bugsnag.flask import handle_exceptions

import os


app = Flask(__name__)
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
    bugsnag.configure(release_stage = session["rstage"])
    # if you return False, the notification will not be sent to Bugsnag. 
    # (see ignore_classes for simple cases)
    if notification.release_stage == "staging":
        return False
    # You can set properties of the notification
    notification.user = {"name": session["user"]}
    # add some fun suff here - fav color, astrological sign :P
    # notification.add_tab("account", {"paying": current_user.acccount.is_paying()})

# Call `callback` before every notification
bugsnag.before_notify(callback)


def set_user_info(args):
    """accepts the request args from an Ajax call,
    and updates info in session.
    """
    session["user"] = args.get("user", "Donkey Kong")
    session["rstage"] = args.get("rstage", "monkeys")
    session["handling"] = args.get("handling", "no")


@app.route('/')
def index():
    """Homepage."""
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
        # having issues with session - but not for unhandled??? how?
        try:
            print stuff[17]
        except Exception as e:
            bugsnag.notify(e, context="handled Index Error - ta da!")
            # show_error_dialog(). <--what is this?? from bs docs
    else:
        print "tryiong ..........."
        #deliberate, unhandled out of range error
        print stuff[17]


@app.route('/name_error')
def name_error():
    """Will generate a name error."""
    
    print doesnt_exist

##################################################

if __name__ == '__main__':

    #helps with debugging
    app.debug = True
    #not caching on reload
    app.jinja_env.auto_reload = app.debug
    bugsnag.notify(Exception("Test Error"))


    #use debug toolbar
    DebugToolbarExtension(app)

    PORT = int(os.environ.get("PORT", 5000))

    DEBUG = "NO_DEBUG" not in os.environ

    app.run(host="0.0.0.0", port=PORT, debug=DEBUG)


