import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import io from 'socket.io-client';

const socket = io('http://localhost:5001'); // Connect to WebSocket server

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Messages = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  const user1=authUser._id;
  console.log("asdfghjkjhgfd %d",user1);
  // Fetch all users
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/api/users');
      return response.data;
    }
  });

  // Fetch chat history
  const { data: messages = [] } = useQuery({
    queryKey: ['messages', selectedUser?._id],
    queryFn: async () => {
      if (!selectedUser) return [];
      const response = await axios.get(
        `http://localhost:5000/api/messages/${user1}/${selectedUser._id}`
      );
      return response.data;
    },
    enabled: !!selectedUser
  });

  // Send a new message
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData) => {
      const response = await axios.post(
        'http://localhost:5000/api/messages',
        messageData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', selectedUser?._id]);
      setNewMessage('');
    },
  });

  // Real-time updates
  useEffect(() => {
    socket.on('newMessage', (message) => {
      queryClient.invalidateQueries(['messages', selectedUser?._id]);
    });
    return () => {
      socket.off('newMessage');
    };
  }, [queryClient, selectedUser]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* User List */}
      <div style={{ width: '30%', borderRight: '1px solid #ddd', padding: '1rem' }}>
        <h2>Messaging</h2>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              padding: '1rem',
              cursor: 'pointer',
              background: selectedUser?._id === user._id ? '#f0f0f0' : 'transparent',
            }}
            onClick={() => setSelectedUser(user)}
          >
            <img
              src={user.profilePicture}
              alt={user.name}
              style={{ width: 40, height: 40, borderRadius: '50%' }}
            />
            <p>{user.name}</p>
            <p>{user.lastMessage?.content || 'No messages yet'}</p>
          </div>
        ))}
      </div>

      {/* Message Section */}
      <div style={{ flex: 1, padding: '1rem' }}>
        {selectedUser ? (
          <>
            <h2>Chat with {selectedUser.name}</h2>
            <div style={{ height: '70vh', overflowY: 'scroll', borderBottom: '1px solid #ddd' }}>
              {messages.map((msg) => (
                <p key={msg._id}>
                  <strong>{msg.sender === 'user1' ? 'You' : selectedUser.name}:</strong>{' '}
                  {msg.content}
                </p>
              ))}
            </div>
            {/* <div>

              {msg.sender !== user1 && ( users.map((user) => ( <p key={user._id}>{user.lastMessage?.content}</p> )))}
            </div> */}
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ width: '80%' }}
            />
            <button
              onClick={() =>
                sendMessageMutation.mutate({
                  sender: authUser._id,
                  receiver: selectedUser._id,
                  content: newMessage,
                })
              }
            >
              Send
            </button>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
