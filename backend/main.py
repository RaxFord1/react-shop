from flask import Flask

from db_api import dbAPI

# Create the Flask app
app = Flask(__name__)
app.register_blueprint(dbAPI)

if __name__ == '__main__':
    app.run()
