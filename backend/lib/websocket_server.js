// import { WebSocketServer } from 'ws'; // Import WebSocketServer
// import url from 'url'; // Import URL module for parsing query strings

// // Create a WebSocket server
// const wss = new WebSocketServer({ port: 8080 });
// const clients = {}; // Store connected clients by room

// // Log server start
// console.log('WebSocket server is running on ws://localhost:8080');

// // Utility function to broadcast a message to all clients in a room
// const broadcastMessage = (room, message) => {
//     if (clients[room]) {
//         clients[room].forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(String(message)); // Send the message as a string
//             }
//         });
//     }
// };

// // Handle new connections
// wss.on('connection', (ws, req) => {
//     const query = url.parse(req.url, true).query;
//     const room = query.room;

//     if (!room) {
//         console.error('Connection attempt without room parameter');
//         ws.close(1008, 'Room parameter is required'); // Close with policy violation code
//         return;
//     }

//     console.log(`New client connected to room: ${room}`);

//     // Add the client to the room
//     if (!clients[room]) {
//         clients[room] = [];
//     }
//     clients[room].push(ws);

//     // Send a welcome message to the client
//     ws.send(JSON.stringify({ type: 'system', message: `Welcome to room: ${room}` }));

//     // Handle incoming messages
//     ws.on('message', (message) => {

//         console.log(JSON.parse(message))
//         console.log(JSON.parse(message).message)
//         // message = JSON.parse(message).message
//         // console.log(`Message received in room ${room}: ${message}`);
//         broadcastMessage(room, message); // Broadcast the message to the room, including the sender
//     });

//     // Handle disconnection 
//     ws.on('close', () => {
//         console.log(`Client disconnected from room: ${room}`);
//         clients[room] = clients[room].filter((client) => client !== ws);
//         if (clients[room].length === 0) {
//             delete clients[room]; // Clean up empty rooms
//             console.log(`Room ${room} has been deleted due to no active clients`);
//         }
//     });

//     // Handle errors
//     ws.on('error', (error) => {
//         console.error(`Error in connection for room ${room}:`, error);
//     });
// });
