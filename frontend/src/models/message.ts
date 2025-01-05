export class Message {
    message_id: string;
    conversation_id: string;
    sender_username: string;
    content: string;
    created_at: Date;
    sender: string;

    constructor(data) {
        this.message_id = data.message_id;
        this.conversation_id = data.conversation_id;
        this.sender_username = data.sender_username;
        this.content = data.content;
        this.created_at = data.created_at;
        this.sender = "";
    }

}