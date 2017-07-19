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


@app.route('/')
def index():
    """Homepage."""
    return render_template("homepage.html")






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


