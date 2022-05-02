const io = require('socket.io')(8080, {
    cors: {
        origin: "http://localhost:5000",
        credentials: true
    }, transports: ['websocket']
})
let user = [];
function addUser(userId, socketId) {
    !user.some(user => user.userId === userId) &&
        user.push({ userId, socketId });
}
function removeUser(socketId) {
    user = user.filter(user => user.socketId !== socketId)
}
function getUser(userId) {
    return user.find(user => user.userId === userId);
}

io.on('connection', socket => {
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', user);
    })
    //sendmessage
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit('getMessage', { senderId, text })
    })
    //disconnect
    socket.on('disconnect', () => {
        console.log('ngat ket noi thanh cong ');
        removeUser(socket.id);
        io.emit('getUsers', user);
    })
})

