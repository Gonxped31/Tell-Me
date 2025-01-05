from fastapi import APIRouter, Path, Depends, HTTPException
from app.schemas.messages_schema import MessageCreate, MessageOut
from app.api.deps.user_deps import verify_token
from app.services.message_service import MessageService
from sqlalchemy.exc import IntegrityError
from typing import List

message_router = APIRouter()

@message_router.post(
    "/add_message",
    response_model=MessageOut,
    description="Save a new message",
    summary="Save a new message"
)
async def add_new_message(
    data: MessageCreate,
    _ = Depends(verify_token)
):
    try:
        return await MessageService.add_new_message(data)
    except IntegrityError :
        raise HTTPException(status_code=400, detail="Conversation or user doesn't exist")
    except Exception:
        raise HTTPException(status_code=500, detail="An error occured")

@message_router.get(
    "/message/conversation/get_all_messages/{conversation_id}",
    response_model=List[MessageOut],
    description="Get all messages for a conversation",
    summary="Get all messages for a conversation"
)
async def get_messages(
    conversation_id: str = Path(...),
    _ = Depends(verify_token)
):
    try:
        return await MessageService.get_messages(conversation_id)
    except IntegrityError :
        raise HTTPException(status_code=400, detail="Conversation with this id doesn't exist")
    except Exception:
        raise HTTPException(status_code=500, detail="An error occured")
    
@message_router.put(
    "/message/update/{conversation_id}/{sender_username}",
    description="Mark all messages as read for a conversation",
    summary="Mark all messages as read for a conversation"
)
async def mark_messages_as_read(
    conversation_id: str = Path(...),
    sender_username: str = Path(...),
    _ = Depends(verify_token)
):
    try:
        await MessageService.mark_messages_as_read(conversation_id, sender_username)
    except IntegrityError :
        raise HTTPException(status_code=400, detail="Conversation or user doesn't exist")
    except Exception:
        raise HTTPException(status_code=500, detail="An error occured")
