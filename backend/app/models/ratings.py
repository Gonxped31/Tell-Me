from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)
from sqlalchemy.orm import relationship
from app.base import Base

class Score(Base):
    __tablename__= "scores"

    id = Column(Integer, primary_key=True)
    rated_by = Column(String, nullable=False)
    rated_to = Column(String, nullable=False)
    score = Column(Integer, nullable=False)

    # user_to = relationship("User", back_populates="rated_to", foreign_keys=[rated_to])
    # user_by = relationship("User", back_populates="rated_by", foreign_keys=[rated_by])

    def __repr__(self):
        return f"Score(rated_by={self.rated_by}, rated_to={self.rated_to}, score={self.score})"