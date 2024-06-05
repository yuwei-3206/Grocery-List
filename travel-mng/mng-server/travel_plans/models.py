from app import db

class TravelPlan(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    location = db.Column(db.String(100), nullable=False)
    days = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
