import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from app.api.router import router
from app.core.config import settings
from app.base import Base

# Models import (necessary for SQLAlchemy even if they are not used)
from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message

load_dotenv()

app = FastAPI(
    title="Tell me",
    description="Tell me",
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    debug=True,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    DBSessionMiddleware,
    db_url=os.getenv("DB_URI"),
)

app.include_router(router, prefix=settings.API_V1_STR)

engine = create_engine(os.getenv("DB_URI"))

Base.metadata.create_all(bind=engine)