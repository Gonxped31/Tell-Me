from fastapi import APIRouter

health_router = APIRouter()

@health_router.head("/")
def read_root():
    return {}

@health_router.get("/")
def read_root():
    return {"status": "API running"}