// var WebSocketClient = require('websocket').client;

// var client = new WebSocketClient();

// // this function will be called once in the useEffect of the groupChat component
// // the callback function is passed as an argument to handle how the received message is displayed
// const connect = () => {
//     client.on('connectFailed', function(error) {
//         console.log('Connect Error: ' + error.toString());
//     });
    
//     client.on('connect', function(connection) {
//         console.log('WebSocket Client Connected');
        
//         connection.on('error', function(error) {
//             console.log("Connection Error: " + error.toString());
//         });

//         // once close
//         connection.on('close', function() {
//             console.log('echo-protocol Connection Closed');
//         });

//         // once received message
//         connection.on('message', function(message) {
//             if (message.type === 'utf8') {
//                 console.log("Received: '" + message.utf8Data + "'");

//                 // cb(message) // use this to show add to chat history
//             }
//         });
        
//         function sendNumber() {
//             if (connection.connected) {
//                 var number = Math.round(Math.random() * 0xFFFFFF);
//                 connection.sendUTF(number.toString());
//                 setTimeout(sendNumber, 1000);
//             }
//         }
//         sendNumber();
//     });
    
//     client.connect('ws://localhost:8080/', 'echo-protocol');
// }

// // const sendMsg = (msg: string) => {
// //     console.log("sending msg: ", msg);
// //     if (RTCPeerConnection.)
// // }

// export {connect, sendMsg}