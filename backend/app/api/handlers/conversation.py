from fastapi import APIRouter, HTTPException, Path, status, Depends
from app.schemas.conversation_schema import ConversationCreate, ConversationOut, ConversationUpdate
from app.services.conversation_service import ConversationService
from sqlalchemy.exc import IntegrityError
from app.api.deps.user_deps import verify_token
from typing import List

conversation_router = APIRouter()

@conversation_router.post(
    "/add_conversation",
    response_model=ConversationOut,
    description="Add a new conversation",
    summary="Add a new conversation"
)
async def add_conversation(
    data: ConversationCreate,
    _ = Depends(verify_token)
):
    return await ConversationService.add_user_conversation(data)

@conversation_router.get(
    "/get_conversation/{username_1}/{username_2}",
    response_model=ConversationOut,
    description="Get a specific conversation",
    summary="Get a specific conversation"
)
async def get_user_conversation(
    username_1: str = Path(...),
    username_2: str = Path(...),
    _ = Depends(verify_token)
):
    conv = await ConversationService.get_user_conversation(username_1, username_2)
    if not conv:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Conversation not found")
    return conv

@conversation_router.get(
    "/get_conversations/{username}",
    response_model=List[ConversationOut],
    description="Get all user's conversations",
    summary="Get all user's conversation"
)
async def get_all_user_conversations(
    username: str = Path(...),
    _ = Depends(verify_token)
):
    try:
        convs = await ConversationService.get_all_user_conversations(username)
        return convs
    except IntegrityError:
        raise HTTPException(status_code=400, detail="User doesn't exist")
    except Exception:
        raise HTTPException(status_code=500, detail="An error occured")

@conversation_router.put(
    "/update_conversation/{conversation_id}",
    response_model=ConversationOut,
    description="Update a conversation",
    summary="Update a conversation"
)
async def update_user_conversations(
    data: ConversationUpdate,
    conversation_id: str = Path(...),
    _ = Depends(verify_token)
):
    return await ConversationService.update_user_conversation(data, conversation_id)

@conversation_router.delete(
    "/delete_conversation/{conversation_id}",
    response_model=ConversationOut,
    description="Delete a conversation",
    summary="Delete a conversation"
)
async def delete_conversation(
    conversation_id: str = Path(...),
    _ = Depends(verify_token)
):
    try:
        conv = await ConversationService.delete_conversation(conversation_id)
        if not conv:
            raise HTTPException(status_code=404, detail="Conversation not found")
        return conv
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Conversation doesn't exist")
    except Exception:
        raise HTTPException(status_code=500, detail="An error occured")