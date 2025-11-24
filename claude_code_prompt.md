# Live Chat System for Social Media Agency Portfolio

Create a real-time live chat system for my social media agency website with the following requirements:

## Core Features
- Real-time messaging between visitors and admin
- Simple, clean UI that matches modern web design
- Single database for all chat conversations
- Docker containerization
- Admin panel to manage conversations
- Chat widget that can be embedded in the main website

## Technical Stack
- **Backend**: Node.js with Express and Socket.io for real-time communication
- **Database**: SQLite or PostgreSQL (your choice for simplicity)
- **Frontend**: HTML, CSS, JavaScript (vanilla or React - your choice)
- **Containerization**: Docker with docker-compose
- **Real-time**: WebSocket connections via Socket.io

## Project Structure
```
livechat/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── server/
│   ├── app.js
│   ├── models/
│   ├── routes/
│   └── socket/
├── client/
│   ├── admin/          # Admin dashboard
│   ├── widget/         # Chat widget for embedding
│   └── public/         # Static files
└── database/
```

## Specific Requirements

### 1. Chat Widget
- Small, floating chat button (bottom-right corner)
- Expandable chat window
- Visitor can enter name and start chatting
- Show online/offline status
- Embed code that can be added to any website

### 2. Admin Dashboard
- Login system (simple auth)
- List of active and past conversations
- Real-time notifications for new messages
- Ability to respond to multiple chats
- Basic visitor information (name, timestamp, IP)

### 3. Database Schema
- Users table (visitors and admin)
- Conversations table
- Messages table
- Session management

### 4. Real-time Features
- Instant message delivery
- Typing indicators
- Online/offline status
- Message status (sent, delivered, read)

### 5. Docker Setup
- Multi-container setup with docker-compose
- Database container
- App container
- Volume mounting for persistence
- Environment variables for configuration

## Deliverables
1. Complete working live chat system
2. Docker configuration files
3. Embedding instructions for the widget
4. Admin credentials and setup instructions
5. API endpoints documentation
6. Instructions for accessing both admin panel and chat widget

## Styling Guidelines
- Modern, professional design suitable for a social media agency
- Responsive design
- Clean, minimalist interface
- Brand colors: use neutral colors that can be easily customized
- Smooth animations and transitions

## Additional Notes
- Make it production-ready with error handling
- Include basic security measures
- Optimize for performance
- Prepare architecture for future AI integration
- Include logging for debugging

Please create all necessary files and provide clear instructions on:
1. How to run the system with Docker
2. Where to access the admin panel
3. How to embed the chat widget in my main website
4. Environment setup and configuration