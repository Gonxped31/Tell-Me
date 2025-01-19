from fastapi import FastAPI, Depends
from app.api.deps.user_deps import verify_token
from app.main import sio

active_connections = {}

@sio.on("connect")
async def connect(sid, environ, auth):
    token = auth.get("token")
    if not token:
        return False  # Reject connection if no token is provided
    try:
        user = await verify_token(token)
        # Optionally, associate the SID with a user
    except Exception as e:
        return False

@sio.on("message")
async def message_handler(sid, data):
    # Broadcast the message to all clients
    await sio.emit("message", data)

@sio.on("disconnect")
async def disconnect(sid):
