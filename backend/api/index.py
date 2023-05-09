from flask import Flask

from api.db_api import dbAPI
from database.database import Base, engine

# Create the Flask app
app = Flask(__name__)
app.register_blueprint(dbAPI)

if __name__ == '__main__':
    Base.metadata.create_all(engine)
    app.run()
