from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from users.routes import create_users_blueprint
from travel_plans.routes import create_travel_plans_blueprint

app = Flask(__name__)
CORS(app)

# MongoDB URI for MongoDB Atlas cluster
app.config["MONGO_URI"] = "mongodb+srv://yw829:Srkey11233206!@travel-mng.6qtlsr7.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=travel-mng"
mongo = PyMongo(app)

# Register blueprints
app.register_blueprint(create_users_blueprint(mongo), url_prefix='/users')
app.register_blueprint(create_travel_plans_blueprint(mongo), url_prefix='/travel-plans')

@app.route('/')
def hello():
    return 'Hello'

if __name__ == '__main__':
    app.run(host='10.0.0.176', port=5000, debug=True)
