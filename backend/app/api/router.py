from fastapi import APIRouter
from app.api.handlers.users import users_router
from app.api.handlers.ratings import ratings_router
from app.api.handlers.conversation import conversation_router
from app.api.handlers.message import message_router
from app.api.auth.jwt import auth_router

router = APIRouter()

router.include_router(users_router, tags=["users"])
router.include_router(ratings_router, tags=["ratings"])
router.include_router(conversation_router, tags=["conversation"])
router.include_router(message_router, tags=["message"])
router.include_router(auth_router, tags=["auth"])
