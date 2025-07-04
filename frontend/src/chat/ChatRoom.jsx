import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const Chat = () => {
    const props =  useLocation().state ;
    let sender = props.names[0];
    let receiver = props.names[1];

    const room = props.names.sort().join(',');
    const [messages, setMessages] = useState([]); // Messages with sender info
    const [input, setInput] = useState('');
    const [ws, setWs] = useState(null);
    const [status, setStatus] = useState('Connecting...');

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8080/?room=${room}`);

        socket.onopen = () => {
            setStatus('Connected');
        };

        socket.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data); // Assuming messages are JSON formatted
            console.log(receivedMessage.sender)
            console.log(sender)

            if (receivedMessage.sender != sender) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: receivedMessage.message, sender: 'other' }, // Mark as "other"
            ]) 
            }
        };

        socket.onclose = () => {
            setStatus('Disconnected');
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, [room]);

    const sendMessage = () => {
        if (ws && input) {
            const message =  input;
            ws.send(JSON.stringify({ message: message ,sender: sender,receiver : receiver})); // Send JSON formatted message
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, sender: 'me' }, // Mark as "me"
            ]);
            setInput('');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="text-lg font-semibold mb-2 text-center">{status}</div>
            <div className="h-72 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 mb-2 rounded-lg ${
                            msg.sender === 'me'
                                ? 'bg-violet-100 text-right self-end'
                                : 'bg-gray-100 text-left self-start'
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                    onClick={sendMessage}
                    className="bg-violet-500 text-white rounded-r-lg px-4 py-2 hover:bg-violet-600 focus:outline-none"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;