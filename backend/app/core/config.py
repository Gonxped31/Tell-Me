# Configuration settings for Flask using environment variables and default values.
from pydantic_settings import BaseSettings

"""
This module defines the application's configuration settings using environment variables and default values.
"""

class Settings(BaseSettings):
    DB_NAME: str
    DB_HOST: str
    DB_USER: str
    DB_PORT: str
    DB_URI: str
    DB_PASSWORD: str
    JWT_SECRET_KEY: str
    JWT_REFRESH_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    ALGORITHM: str = "HS256"
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Tell me"
    VERSION: str = "0.0.1"

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
