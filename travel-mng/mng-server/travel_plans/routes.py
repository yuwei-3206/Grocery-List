from flask import Blueprint, jsonify, request, session
from bson import ObjectId

def create_travel_plans_blueprint(mongo):
    travel_plans_bp = Blueprint('travel_plans', __name__)

    @travel_plans_bp.route('/create', methods=['POST'])
    def create_plan():
        user_id = request.json.get('userId')  # Extract userId from the request body
        if not user_id:
            return jsonify({'error': 'User not logged in'}), 401

        data = request.json
        if not data or 'location' not in data or 'days' not in data:
            return jsonify({'error': 'Location and days are required'}), 400

        location = data['location']
        days = data['days']

        new_plan = {
            'location': location,
            'days': days,
            'user_id': user_id  # Include userId in the new plan
        }
        
        result = mongo.db.travel_plans.insert_one(new_plan)
        
        return jsonify({'message': 'Travel plan created successfully.', 'plan_id': str(result.inserted_id)}), 201

    @travel_plans_bp.route('/delete/<string:plan_id>', methods=['DELETE'])
    def delete_plan(plan_id):
        user_id = request.json.get('userId')  # Extract userId from the request body
        if not user_id:
            return jsonify({'error': 'User not logged in'}), 401

        result = mongo.db.travel_plans.delete_one({'_id': ObjectId(plan_id), 'user_id': user_id})
        if result.deleted_count == 0:
            return jsonify({'error': 'Travel plan not found'}), 404

        return jsonify({'message': 'Travel plan deleted successfully.'}), 200

    @travel_plans_bp.route('/edit/<string:plan_id>', methods=['PUT'])
    def edit_plan(plan_id):
        user_id = request.json.get('userId')  # Extract userId from the request body
        if not user_id:
            return jsonify({'error': 'User not logged in'}), 401

        data = request.json
        if not data or 'location' not in data or 'days' not in data:
            return jsonify({'error': 'Location and days are required'}), 400

        result = mongo.db.travel_plans.update_one({'_id': ObjectId(plan_id), 'user_id': user_id}, {'$set': {'location': data['location'], 'days': data['days']}})
        if result.modified_count == 0:
            return jsonify({'error': 'Travel plan not found'}), 404

        return jsonify({'message': 'Travel plan updated successfully.'}), 200

    @travel_plans_bp.route('/list/<string:user_id>', methods=['GET'])
    def list_plans(user_id):
        plans = mongo.db.travel_plans.find({'user_id': user_id})
        response = [{'id': str(plan['_id']), 'location': plan['location'], 'days': plan['days']} for plan in plans]
        return jsonify({'travel_plans': response}), 200

    return travel_plans_bp
