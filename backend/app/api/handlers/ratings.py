from fastapi import APIRouter, Path, HTTPException, Depends
from app.schemas.ratings_schema import ScoreSchema
from app.services.ratings_service import ScoreService
from app.api.deps.user_deps import verify_token
from typing import List

ratings_router = APIRouter()

@ratings_router.post(
    "/add_score",
    response_model=ScoreSchema,
    description="Add a score to a users",
    summary="Add a score to a users"
)
async def add_user_score(
    data: ScoreSchema,
    _ = Depends(verify_token)
):
    # try:
    return await ScoreService.add_user_score(data)
    # except Exception:
    #     raise HTTPException(status_code=404, detail=f"User with this username: '{data.rated_to}' or/and '{data.rated_by}' does not exists")
    # return added_score

@ratings_router.get(
    "/get_scores/{username}",
    response_model=List[ScoreSchema],
    description="Find all the scores of a users",
    summary="Find all the scores of a users"
)
async def get_user_rating(
    username: str = Path(...),
    _ = Depends(verify_token)
):
    return await ScoreService.get_user_scores(username)
