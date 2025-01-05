from app.models.conversation import Conversation
from app.schemas.conversation_schema import ConversationCreate, ConversationUpdate
from fastapi_sqlalchemy import db
from sqlalchemy import or_
from fastapi import HTTPException, status
from typing import Dict

class ConversationService:
    @staticmethod
    async def add_user_conversation(data: ConversationCreate):
        initiator_username, recipient_username = data.initiator_username, data.recipient_username
        
        conversation = Conversation(
            initiator_username=initiator_username,
            recipient_username=recipient_username
        )

        db.session.add(conversation)
        db.session.commit()
        return conversation

    @staticmethod
    async def get_user_conversation_by_id(conversation_id: str):
        return db.session.query(Conversation).filter(Conversation.conv_id == conversation_id).first()

    @staticmethod
    async def get_user_conversation(username_1, username_2):
        conv_1 = db.session.query(Conversation).filter(
            Conversation.initiator_username == username_1,
            Conversation.recipient_username == username_2
        ).first()

        conv_2 = db.session.query(Conversation).filter(
            Conversation.initiator_username == username_2,
            Conversation.recipient_username == username_1
        ).first()

        if conv_1:
            return conv_1
        if conv_2:
            return conv_2
        return None
    
    @staticmethod
    async def get_all_user_conversations(username: str):
        convs = db.session.query(Conversation)\
        .filter(
            or_(
                Conversation.initiator_username == username,
                Conversation.recipient_username == username
            )
        ).all()
        return convs

    @staticmethod
    async def update_user_conversation(data: ConversationUpdate, conversation_id: str):
        conv = await ConversationService.get_user_conversation_by_id(conversation_id)
        if not conv:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Conversation does not exist")
        
        dict_data = data.model_dump(exclude_unset=True)

        for key, value in dict_data.items():
            if hasattr(conv, key):
                setattr(conv, key, value)
            else:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Field {key} does not exist")
            
        db.session.commit()
        db.session.refresh(conv)
        return conv

    @staticmethod
    async def delete_conversation(conversation_id: str):
        conv = await ConversationService.get_user_conversation_by_id(conversation_id)
        if not conv:
            return None
        db.session.delete(conv)
        db.session.commit()
        return conv

