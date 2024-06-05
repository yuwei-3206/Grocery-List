from flask import Blueprint, jsonify, request, session
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId

users_bp = Blueprint('users', __name__)

def create_users_blueprint(mongo):  # Pass mongo as an argument
    #EMAIL_PATTERN = r'^[\w\.-]+@[\w\.-]+\.\w+$'

    @users_bp.route('/register', methods=['POST'])
    def register():
        data = request.json
        if 'firstName' not in data or 'lastName' not in data or 'username' not in data or 'password' not in data:
            return jsonify({'error': 'First name, last name, email, and password are required'}), 400

        first_name = data['firstName']
        last_name = data['lastName']
        username = data['username']
        password = data['password']

        # Validate email format
        #if not re.match(EMAIL_PATTERN, email):
        #    return jsonify({'error': 'Invalid email address'}), 400

        # Validate password complexity and length
        if len(password) < 8 or not any(char.isupper() for char in password) or not any(char.islower() for char in password) or not any(char.isdigit() for char in password):
            return jsonify({'error': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'}), 400

        # Check if user already exists
        if mongo.db.users.find_one({'username': username}):
            return jsonify({'error': 'User with this email already exists'}), 400

        # Generate a unique user ID
        user_id = str(ObjectId())

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Store user data in the database
        new_user = {
            'user_id': user_id,
            'first_name': first_name,
            'last_name': last_name,
            'username': username,
            'password': hashed_password
        }
        mongo.db.users.insert_one(new_user)

        # Return success message
        return jsonify({'message': 'User registered successfully. You can now login.'}), 201
    
    @users_bp.route('/login', methods=['POST'])
    def login():
        data = request.json

        if 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Username and password are required'}), 400

        username = data['username']
        password = data['password']

        # Fetch user data from database based on username
        user = mongo.db.users.find_one({'username': username})

        if not user:
            return jsonify({'error': 'Invalid username or password'}), 401

        # Validate password hash
        if not check_password_hash(user['password'], password):
            return jsonify({'error': 'Invalid username or password'}), 401

        # Login successful, return user data (optional)
        return jsonify({'success': True, 'id': user['user_id'], 'firstName': user['first_name']})
    
    @users_bp.route('/<string:user_id>', methods=['GET'])
    def get_user(user_id):
        # Fetch user data from the database based on the user ID
        user = mongo.db.users.find_one({'user_id': user_id})

        if user:
            # Return the user data if found
            return jsonify({'user': user}), 200
        else:
            # Return an error message if user not found
            return jsonify({'error': 'User not found'}), 404

    return users_bp
