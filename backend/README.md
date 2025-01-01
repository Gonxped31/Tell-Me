# Roadmap for the backend
## Infrastructure
- **Fast API** for the service.
- **PostgreSQL** for the database.

## Configurations
- [X] Configure PostgreSQL for the database side.
- [X] Configure Fast API for the server side.

1. Exécuter le backend: `pipenv shell`
2. Installer les dépendances (à faire une seule fois): `pip install -r requirements.txt`
3. Lancer le serveur: `pipenv run start`

## Feature and Endpoints (**Need to be updated)
### Authentications:
This section is to authenticate users (sign up. login and session management).
- [ ] `POST /api/register` to create a new user
- [ ] `POST /api/login` to authenticate the user (return JWT)

### User
This section is to get informations for a specific user.
- [ ] `GET /api/user/<user_id>` fetch the profile of a specific user
- [ ] `PUT /api/user/<user_id>` update user details
- [ ] `PUT /api/user/settings/<user_id>` update user settings

### Nearby Users and Discovery
In this section, we find the nearby users. We will use [PostGIS](https://postgis.net/) to store and query the nearest users.

Essential endpoints we might need:
- [ ] `GET /api/location/nearby/<user_id>` get nearby users for a specified user.
- [ ] `POST /api/location/update` update the users's location

### Social scoring
This endpoints manage the ratings (add/get user rating)
- [ ] `POST /api/user/rate` Add a rate for a user
- [ ] `GET /api/user/<user_id>/ratings` get the ratings (0 to 5).

### Firebase messaging and notifications
This section manage messaging between users. We will send push notifications using [FCM](https://firebase.google.com/docs/cloud-messaging).
- [ ] `POST /api/messages/send` send a private message and then, send a push notification to the receiver
- [ ] `GET /api/messages/<user_id>` fetch a message thread between the actual user and a specified user
- [ ] `POST /api/notifications/<user_id>/<notification_details>` send a push notification to a specified user

### Admin and Utility
- [ ] `GET /api/health`
- [ ] `DELETE /api/user/<user_id>` delete user acount

### SQL messaging (**Not needed right now)
This section manage info about messaging: all texted users etc.
- [ ] `GET /api/messages/` get all users the current user have texted to.

### Middleware (**Not needed right now)
This section is for the middleware that handle updates between Firebase and postgresql messaging.

## Database schemas
### PostgreSQL
SQL Entities and relationships
```
CREATE TABLE User (
    id INTEGER PRIMARY KEY,
    username STRING(50) UNIQUE NOT NULL,
    email STRING(100) NOT NULL,
    password STRING(100) UNIQUE NOT NULL,
    average_rate INT
);

CREATE TABLE Rating (
    id SERIAL PRIMARY KEY,
    rater_id INTEGER REFERENCES User(id),
    rated_id INTEGER REFERENCES User(id),
    rate INT NOT NULL
);

CREATE TABLE Conversation (
    id UUID PRIMARY KEY,
    user_1_id INTEGER REFERENCES User(id),
    user_2_id INTEGER REFERENCES User(id),
    last_message_id REFERENCES Message(id),
    last_message TIMESTAMP,
);

CREATE TABLE Message (
    id INTEGER PRIMARY KEY,
    conversation_id INTEGER REFERENCES Conversation(id),
    sender_id INTEGER REFERENCES User(id),
    message_line TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP
);

```
