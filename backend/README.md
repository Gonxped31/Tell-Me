# Roadmap for the backend
## Infrastructure
- **Flask** for the service.
- **PostgreSQL** for the database.
- **Firebase** for messages management.

## Configurations
- [ ] Configure PostgreSQL for the database side.
- [ ] Configure Flask for the server side.

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

### Firebase
