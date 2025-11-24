class ChatHandler {
    constructor(db) {
        this.db = db;
        this.connectedUsers = new Map(); // socketId -> userInfo
        this.adminSockets = new Map(); // socketId -> adminInfo
    }

    handleConnection(socket, io) {
        console.log('New connection:', socket.id);

        // Join user to chat
        socket.on('join_chat', (data) => {
            const { user_id, conversation_id, is_admin = false, user_name, user_email } = data;
            console.log('📧 JOIN_CHAT received:', { user_id, conversation_id, is_admin, user_name, user_email });
            
            if (is_admin) {
                this.adminSockets.set(socket.id, { user_id, socket });
                socket.join('admin_room');
                console.log(`Admin ${user_id} joined`);
                
                // Send current online users to admin
                this.sendOnlineUsersToAdmin(socket);
            } else {
                // Create user if they don't exist (for widget visitors)
                this.db.getUserById(user_id, (err, existingUser) => {
                    if (!existingUser) {
                        // Create visitor user with provided info
                        this.db.createUser({
                            id: user_id,
                            name: user_name || 'Website Visitor',
                            email: user_email,
                            is_admin: 0
                        }, (err, newUserId) => {
                            if (err) console.error('Error creating visitor user:', err);
                            else {
                                console.log(`Created visitor user: ${user_name || 'Website Visitor'} (${user_email || 'no email'})`);
                            }
                        });
                    }
                });

                // Create conversation if it doesn't exist
                this.db.createConversation({
                    id: conversation_id,
                    user_id: user_id,
                    status: 'active'
                }, (err) => {
                    if (err) console.error('Error creating conversation:', err);
                });

                this.connectedUsers.set(socket.id, { 
                    user_id, 
                    conversation_id, 
                    socket 
                });
                socket.join(`conversation_${conversation_id}`);
                console.log(`User ${user_id} joined conversation ${conversation_id}`);
                
                // Notify admins of new user
                this.notifyAdminsUserOnline(user_id, conversation_id);
            }

            // Update session status
            this.db.updateSessionStatus(socket.id, 1, (err) => {
                if (err) console.error('Error updating session status:', err);
            });
        });

        // Handle new message
        socket.on('send_message', (data) => {
            const { conversation_id, sender_id, message, message_type = 'text' } = data;
            
            if (!conversation_id || !sender_id || !message) {
                socket.emit('error', { message: 'Missing required fields' });
                return;
            }

            const messageData = {
                conversation_id,
                sender_id,
                message: message.trim(),
                message_type
            };

            this.db.createMessage(messageData, (err, messageId) => {
                if (err) {
                    console.error('Error saving message:', err);
                    socket.emit('error', { message: 'Failed to send message' });
                    return;
                }

                // Get sender info for the message
                this.db.getUserById(sender_id, (err, sender) => {
                    if (err) {
                        console.error('Error getting sender info:', err);
                        return;
                    }

                    // Fallback if sender not found
                    const senderInfo = sender || { name: 'Unknown User', is_admin: 0 };

                    const messageWithInfo = {
                        id: messageId,
                        conversation_id,
                        sender_id,
                        message: messageData.message,
                        message_type,
                        sender_name: senderInfo.name,
                        is_admin: senderInfo.is_admin,
                        created_at: new Date().toISOString(),
                        status: 'sent'
                    };

                    // Send to conversation room
                    io.to(`conversation_${conversation_id}`).emit('new_message', messageWithInfo);
                    
                    // Send to admin room if sender is not admin (but exclude admins already in the conversation)
                    if (!senderInfo.is_admin) {
                        // Get all sockets in the conversation room
                        const conversationRoom = io.sockets.adapter.rooms.get(`conversation_${conversation_id}`);
                        const conversationSocketIds = conversationRoom ? Array.from(conversationRoom) : [];
                        
                        // Send to admins who are NOT in the specific conversation room
                        this.adminSockets.forEach((admin, socketId) => {
                            if (!conversationSocketIds.includes(socketId)) {
                                admin.socket.emit('new_message', messageWithInfo);
                                admin.socket.emit('conversation_updated', { conversation_id });
                            }
                        });
                    }

                    console.log(`Message sent in conversation ${conversation_id}:`, messageData.message);
                });
            });
        });

        // Handle typing indicators
        socket.on('typing_start', (data) => {
            const { conversation_id, user_name } = data;
            socket.to(`conversation_${conversation_id}`).emit('user_typing', {
                user_name,
                conversation_id
            });
        });

        socket.on('typing_stop', (data) => {
            const { conversation_id } = data;
            socket.to(`conversation_${conversation_id}`).emit('user_stop_typing', {
                conversation_id
            });
        });

        // Handle message status updates
        socket.on('message_read', (data) => {
            const { message_id } = data;
            this.db.updateMessageStatus(message_id, 'read', (err) => {
                if (err) {
                    console.error('Error updating message status:', err);
                }
            });
        });

        // Handle admin joining specific conversation
        socket.on('admin_join_conversation', (data) => {
            const { conversation_id } = data;
            socket.join(`conversation_${conversation_id}`);
        });

        // Handle admin leaving specific conversation
        socket.on('admin_leave_conversation', (data) => {
            const { conversation_id } = data;
            socket.leave(`conversation_${conversation_id}`);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            
            const user = this.connectedUsers.get(socket.id);
            const admin = this.adminSockets.get(socket.id);
            
            if (user) {
                this.connectedUsers.delete(socket.id);
                this.notifyAdminsUserOffline(user.user_id);
            }
            
            if (admin) {
                this.adminSockets.delete(socket.id);
            }

            // Update session status
            this.db.updateSessionStatus(socket.id, 0, (err) => {
                if (err) console.error('Error updating session status:', err);
            });
        });
    }

    sendOnlineUsersToAdmin(adminSocket) {
        const onlineUsers = Array.from(this.connectedUsers.values()).map(user => ({
            user_id: user.user_id,
            conversation_id: user.conversation_id
        }));
        
        adminSocket.emit('online_users', onlineUsers);
    }

    notifyAdminsUserOnline(userId, conversationId) {
        this.adminSockets.forEach((admin) => {
            admin.socket.emit('user_online', {
                user_id: userId,
                conversation_id: conversationId
            });
        });
    }

    notifyAdminsUserOffline(userId) {
        this.adminSockets.forEach((admin) => {
            admin.socket.emit('user_offline', {
                user_id: userId
            });
        });
    }

    // Get current online users count
    getOnlineUsersCount() {
        return this.connectedUsers.size;
    }

    // Get current admin count
    getAdminCount() {
        return this.adminSockets.size;
    }
}

module.exports = ChatHandler;