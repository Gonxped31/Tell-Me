from fastapi import APIRouter
from app.api.handlers.users import users_router
from app.api.handlers.ratings import ratings_router
from app.api.handlers.conversation import conversation_router
from app.api.handlers.message import message_router
from app.api.auth.jwt import auth_router
from app.api.handlers.location import location_router

router = APIRouter()

router.include_router(users_router, tags=["users"])
router.include_router(location_router, tags=["locations"])
router.include_router(ratings_router, tags=["ratings"])
router.include_router(conversation_router, tags=["conversations"])
router.include_router(message_router, tags=["messages"])
router.include_router(auth_router, tags=["auth"])
