# Friendzone

A simple social-style application.

## Tech Stack

### Backend

* [Node.js](https://nodejs.org/en)
* [Nest.js](https://nestjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Redis](https://redis.io/)

### Frontend

* [React](https://react.dev/)
* [Vite](https://vite.dev/)
* [Material UI](https://mui.com/material-ui/)
* [Axios](https://axios-http.com/docs/intro)
* [Zod](https://zod.dev/)

## Functional Requirements

### User Registration

1. Users themselves can create a new account in the application.
2. To register an account, users must provide:
    1. Unique email address.
    2. Password.
    3. First name.
    4. Last name.
3. After registration, the user should receive an email with a confirmation link. Users cannot login in the application prior to email confirmation.

### Authentication and Authorization

1. Every user must have unique email and password to login in the application.
2. The contents of the application are limited to logged users only.
3. On successful login, users receive an authentication token with a validity period of 7 days.

### Password recovery

1. In case password is forgotten, users can request a password recovery by inputting the registered email address.
2. If the email address correspond to an existing user, an email with a recovery link will be sent to it.
3. The recovery link is valid for 7 days upon its creation.
4. The application will not check if the password was previously used by the user upon redefinition of it.

### User Profile

1. Users can only change their own user information.
2. Users can change first name, last name, bio and password.
3. To change their own information, it is required to input the current password.

### Feed, Posts, and Comments

1. Users can create posts, edit their own posts and delete their own posts.
2. Users can add a comment to their own posts or other users' posts.
3. Users can edit or remove their own comments.
4. Comments cannot be created over other comments.
5. All posts and comments will be visible by all other users in the platform.
6. The feed will show in descending order of post's created date.

### Friend system

1. A user can send a friend request to other users.
2. The user who receives a friend request can:
    1. Approve it. Then both users are added to each other's friend lists.
    2. Reject it. Then the requested user should be notified about it. But it does not prevent both side from re-sending a friend request to each other.
3. Both sides can un-friend each other, thus, removing both of them in each other friend list.

## Assumptions and Limitations

* Friends should not change how the feed is displayed.
* There will not be comments on comments in posts.
* For simplicity, I am not considering a user deletion case in this application.
* Since the system works with a stateless JWT tokens without persisting the state of the user session on the backend, even if the user executes a logout, in reality the token continues valid and usable to authorize requests.
