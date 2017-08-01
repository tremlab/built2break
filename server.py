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

# setting a username, until the user picks one.
session["user"] = "raving_rabid"

def callback(notification):

    # if you return False, the notification will not be sent to Bugsnag. (see ignore_classes for simple cases)
    if notification.release_stage == "staging":
        return False
    # You can set properties of the notification and
    # add your own custom meta-data.
    notification.user = {"id": session["user"]}
    # notification.add_tab("account", {"paying": current_user.acccount.is_paying()})

# Call `callback` before every notification
bugsnag.before_notify(callback)


@app.route('/')
def index():
    """Homepage."""
    return render_template("homepage.html")


@app.route('/index_error', methods=['POST', 'GET'])
def index_error():
    """Will generate an out of index error."""
    release = request.args.get("release")
    bugsnag.configure(release_stage = release)
    #deliberate out of range error
    stuff = [1,2,3]
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


