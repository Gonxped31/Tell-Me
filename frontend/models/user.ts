export class User {
    id: string;
    username: string;
    email: string;

    constructor(data) {
        this.id = data.user_id;
        this.username = data.username;
        this.email = data.email;
    }
}

export class UserShort {
    username: string;
    distance_m: string;

    constructor(data) {
        this.username = data.username;
        this.distance_m = data.distance_m
    }
}