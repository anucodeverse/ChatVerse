# 💬 ChatVerse – Real-Time Chat Application

A modern **real-time chat application** built using **React, Node.js, Express, and Socket.io**. The application enables users to communicate instantly through WebSockets, supports multiple chat rooms, displays typing indicators, and provides a responsive chat interface.

---

## 🚀 Live Demo

* **Frontend:** https://your-vercel-url.vercel.app
* **Backend API:** https://your-render-url.onrender.com
* **Demo Video:** https://your-demo-video-link

---

## 📌 Project Overview

This project was developed as part of the **Full Stack Engineering Sprint – WebSockets & Real-Time Bidirectional Data Pipelines**.

The application demonstrates real-time communication using **Socket.io**, allowing multiple users to chat simultaneously in separate rooms without refreshing the page.

---

# ✨ Features

## 🔹 User Authentication (Session)

* Enter a username before joining
* Select a chat room
* Join instantly without page refresh

---

## 🔹 Real-Time Messaging

* Instant message delivery
* Bidirectional communication using WebSockets
* No page reload required

---

## 🔹 Typing Indicator

Displays:

```text
Anu is typing...
```

while another user is typing.

---

## 🔹 Multiple Chat Rooms

Available rooms:

* General
* Tech Support

Messages are isolated to their selected room.

---

## 🔹 Modern UI

* Responsive layout
* Professional sidebar
* Message bubbles
* User avatars
* Timestamps
* Clean chat interface

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* Socket.io Client
* CSS3

## Backend

* Node.js
* Express.js
* Socket.io
* CORS

---

# 📂 Project Structure

```
chat-app/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   └── Join.jsx
│   │   ├── socket.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
├── README.md
└── Prompts.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/chatverse.git
```

---

## Backend Setup

```bash
cd server
npm install
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔄 Socket Events

## Client → Server

| Event       | Description          |
| ----------- | -------------------- |
| joinRoom    | Join selected room   |
| sendMessage | Send chat message    |
| typing      | Notify typing status |

---

## Server → Client

| Event          | Description              |
| -------------- | ------------------------ |
| receiveMessage | Broadcast message        |
| showTyping     | Display typing indicator |

---

# 🧪 Testing

The application was tested using two browser windows.

### Verified Scenarios

* Multiple users connected
* Different usernames
* Room isolation
* Real-time messaging
* Typing indicator
* Responsive UI

---

# 📸 Screenshots

Add screenshots here after deployment.

Example:

* Join Screen
* Chat Room
* Typing Indicator
* Two Browser Windows

---

# 🌐 Deployment

## Frontend

Vercel

## Backend

Render

---

# 📈 Future Improvements

* Online users list
* Emoji support
* File sharing
* Image sharing
* Read receipts
* Dark / Light mode
* Authentication with JWT
* Chat history using MongoDB
* Notifications
* Voice messages

---

# 👨‍💻 Author

**Anu**

GitHub:
https://github.com/yourusername

LinkedIn:
https://linkedin.com/in/yourprofile

---

# 📄 License

This project was created for educational and internship assessment purposes.
