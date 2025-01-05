export class Conversation {
    conv_id: string;
    initiator_username: string;
    recipient_username: string
    created_at: Date;
    is_anonymous: boolean;
    initiator_opened: boolean;
    recipient_opened: boolean;

    constructor(data) {
        this.conv_id = data.conv_id;
        this.initiator_username = data.initiator_username;
        this.recipient_username = data.recipient_username;
        this.created_at = data.created_at;
        this.is_anonymous = data.is_anonymous;
        this.initiator_opened = data.initiator_opened;
        this.recipient_opened = data.recipient_opened;
    }
}