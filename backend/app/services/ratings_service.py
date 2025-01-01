from fastapi_sqlalchemy import db
from app.models.user import Score
from app.schemas.ratings_schema import ScoreSchema
from typing import List

class ScoreService:
    async def add_user_score(data: ScoreSchema) -> Score:
        score = db.session.query(Score).filter(
            Score.rated_by == data.rated_by,
            Score.rated_to == data.rated_to
        ).first()

        if score:
            score.score = data.score
        else:
            score = Score(rated_by=data.rated_by, rated_to=data.rated_to, score=data.score)
            db.session.add(score)
        
        db.session.commit()

        return score

            

    async def get_user_scores(username: str) -> List[Score]:
        return db.session.query(Score).filter(Score.rated_to == username).all()
    
