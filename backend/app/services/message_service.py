from app.models.message import Message
from app.schemas.messages_schema import MessageCreate, MessageOut
from fastapi_sqlalchemy import db
from fastapi import HTTPException, status

class MessageService:
    @staticmethod
    async def add_new_message(data: MessageCreate):
        message = Message(
            conversation_id=data.conversation_id,
            sender_username=data.sender_username,
            content=data.content
        )

        db.session.add(message)
        db.session.commit()
        return message

    @staticmethod
    async def get_messages(conversation_id: str):
        messages = db.session.query(Message)\
        .filter(Message.conversation_id == conversation_id)\
        .order_by(Message.created_at.desc())\
        .all()

        return messages
    
    @staticmethod
    async def mark_messages_as_read(conversation_id: str, sender_username: str):
        db.session.query(Message)\
        .filter(Message.conversation_id == conversation_id,
            Message.sender_username == sender_username,
            Message.is_read == False)\
        .update({"is_read": True})
        db.session.commit()



        