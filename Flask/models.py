from config import db
from datetime import datetime

class Task(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False)
    date = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(80), unique=False)

    def to_json(self):
        return{
            "id": self.id,
            "title": self.title,
            "date":self.date,
            "description":self.description
        }
    
