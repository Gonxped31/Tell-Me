# Roadmap for the backend
## Infrastructure
- **Flask** for the service.
- **PostgreSQL** for the database.

## Configurations
- [ ] Configure PostgreSQL for the database side.
- [ ] Configure Flask for the server side.

## Endpoints (**Need to be updated**)
- [ ] Authentications endpoints:
    - [ ] `POST /api/register` to create a new user
    - [ ] `POST /api/login` to authenticate the user (return JWT)
    - [ ] `GET /api/user/<user_id>` Fetch the profile of a specific user
    - [ ] `PUT /api/user/<user_id>` Updates user details
    - [ ] `PUT /api/user/settings/<user_id>` update user settings

- [ ] Nearby Users and Discovery
    - [ ] `GET /api/users/nearby/<user_id>` get nearby users.
    - [ ] `GET /api/user/<user_id>/profile` get public profile information for a specific user.
    - [ ] `POST /api/location/update` update the users's location

- [ ] Social scoring
    - [ ] `POST /api/user/rated_users` add a new rated user to the list of rated users.
    - [ ] `POST /api/user/rate` Add a rate for a user
    - [ ] `GET /api/user/<user_id>/ratings` get the ratings (0 to 5)

- [ ] Messaging
    - [ ] `POST /api/messages/send` send a private message.
    - [ ] `GET /api/messages/` get messages for the user
    - [ ] `GET /api/messages/<user_id>` Fetch a message thread between the actual user and a specified user
    - [ ] `POST /api/messages/reveal\_identity`

- [ ] Notifications
    - [ ] `GET /api/notifications` retrives notifications
    - [ ] `PUT /api/notifications/<notification_id>` mark notification as read

- [ ] Admin and Utility
    - [ ] `GET /api/health`
    - [ ] `DELETE /api/user/<user_id>` delete user acount


