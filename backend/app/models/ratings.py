from app.base import Base
from sqlalchemy import Column, Integer, UUID, ForeignKey

class Rating(Base):
    __tablename__="ratings"

    id = Column(Integer, primary_key=True)
    rater_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    rated_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    rate = Column(Integer, nullable=False)

    def __repr__(self):
        return f"Rating({self.id}, {self.rater_id}, {self.rated_id}, {self.rate})"