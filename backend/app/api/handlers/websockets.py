from fastapi import FastAPI, Depends
from app.api.deps.user_deps import verify_token
from app.main import sio

active_connections = {}

@sio.on("connect")
async def connect(sid, environ, auth):
    print(f"Connection established: SID = {sid}, Auth = {auth}")
    token = auth.get("token")
    if not token:
        return False  # Reject connection if no token is provided
    try:
        user = await verify_token(token)
        print(f"User {user.username} connected with session ID {sid}")
        # Optionally, associate the SID with a user
    except Exception as e:
        print("Connection rejected:", e)
        return False

@sio.on("message")
async def message_handler(sid, data):
    print(f"Received message: {data} from {sid}")
    # Broadcast the message to all clients
    await sio.emit("message", data)

@sio.on("disconnect")
async def disconnect(sid):
    print(f"Client {sid} disconnected")