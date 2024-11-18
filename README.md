# Twitter Backend

A backend API service for a Twitter-like application, built with Node.js, Express, and MongoDB. This project supports essential features such as user management, tweets, comments, likes, and followers.

## Features

- **User Management**: User registration, login, profile updates, and secure authentication with refresh tokens.
- **Tweet Management**: Allows users to post tweets with optional image uploads.
- **Comments**: Users can add comments to tweets.
- **Likes**: Users can like tweets or comments.
- **Followers**: Users can follow or unfollow other users.

---

## Database Models

### **User Model**

| Field          | Type   | Description                   |
| -------------- | ------ | ----------------------------- |
| `username`     | String | Unique username               |
| `password`     | String | Hashed password               |
| `email`        | String | Unique email address          |
| `fullname`     | String | Full name of the user         |
| `avatar`       | String | URL of the profile picture    |
| `coverimage`   | String | URL of the cover image        |
| `refreshtoken` | String | Refresh token for sessions    |
| `about`        | String | Bio or about section for user |
| `social_link`  | String | User's external profile link  |

---

### **Tweet Model**

| Field     | Type     | Description                                        |
| --------- | -------- | -------------------------------------------------- |
| `content` | String   | Text content of the tweet                          |
| `user`    | ObjectId | Reference to the user who posted the tweet         |
| `image`   | String   | URL of an optional image associated with the tweet |

---

### **Comment Model**

| Field     | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| `content` | String   | Text content of the comment         |
| `user`    | ObjectId | Reference to the user who commented |
| `tweet`   | ObjectId | Reference to the related tweet      |

---

### **Like Model**

| Field     | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| `tweet`   | ObjectId | Reference to the liked tweet    |
| `comment` | ObjectId | Reference to the liked comment  |
| `user`    | ObjectId | Reference to the user who liked |

---

### **Follower Model**

| Field       | Type     | Description                        |
| ----------- | -------- | ---------------------------------- |
| `follower`  | ObjectId | User ID of the follower            |
| `following` | ObjectId | User ID of the user being followed |

---

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/Sourav0010/Twitter-Backend.git
cd Twitter-Backend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Configure environment variables:

- Create a `.env` file based on the provided `.env.example` template.
- Set your MongoDB URI and other required environment variables.

### 4. Run the server:

```bash
npm run dev
```

---

## Base URL

```
https://twitter-backend-6jlw.onrender.com
```

---

## API Endpoints

### **Users**

- `POST /api/v1/users/signup`: Register a new user.
- `POST /api/v1/users/login`: Login an existing user.
- `POST /api/v1/users/logout`: Logout user.
- `POST /api/v1/users/refresh-token`: Generate a new access token.
- `PATCH /api/v1/users/profile`: Update user profile.

---

### **Tweets**

- `POST /api/v1/tweets/`: Create a new tweet.
- `GET /api/v1/tweets/`: Get all tweets.
- `GET /api/v1/tweets/:tweetId`: Get a specific tweet.
- `DELETE /api/v1/tweets/:tweetId`: Delete a tweet.

---

### **Comments**

- `POST /api/v1/comments/:tweetId`: Add a comment to a tweet.
- `GET /api/v1/comments/:tweetId`: Retrieve all comments for a tweet.
- `DELETE /api/v1/comments/:commentId`: Delete a comment.

---

### **Likes**

- `POST /api/v1/likes/toggle/tweet/:tweetId`: Like or unlike a tweet.
- `POST /api/v1/likes/toggle/comment/:commentId`: Like or unlike a comment.

---

### **Followers**

- `POST /api/v1/followers/follow/:userId`: Follow or unfollow a user.
- `GET /api/v1/followers/:userId`: Retrieve the followers of a user.
- `GET /api/v1/following/:userId`: Retrieve the users followed by a user.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Other**: Cloudinary (for media uploads)

---

## Contributing

If you’d like to contribute to this project:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

**Thank you for checking out the Twitter Backend! Feel free to raise any issues or contribute to make this project better.**  
~ _Sourav Mohanty_

---
