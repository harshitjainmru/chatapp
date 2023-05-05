const express = require('express');
const cors = require("cors")
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(
    cors({
        origin: "http://localhost:4200/"
    })
)
app.get('/', (req, res, next) => {
    res.send('Hello, This is the backend ')
})

let numberOfOnlineUsers = 0;
let arrayOfClient = []
let availableGroup = []

function isgroupAvailable(data) {
    let index = availableGroup.findIndex((res) => res.roomName === data);
    console.log(availableGroup.findIndex((res) => res.roomName), 'availableGroup.findIndex((res) => res.roomName');
    return index;
}


io.on('connection', (socket) => {
    // console.log(socket,'socket');
    numberOfOnlineUsers++;
    io.emit("get socket id", socket.id);
    io.emit('numberOfOnlineUsers', numberOfOnlineUsers);
    console.log(numberOfOnlineUsers, 'numberOfOnlineUsers');

    socket.on('joinRoom', (data) => {
        console.log(data, "JOINROOM");
        socket.join(data.roomName);
        if (isgroupAvailable(data.roomName) == -1) {
                availableGroup.push(data);
        }
       
        io.emit("user-joined", { info: data, availableGroup: availableGroup });
        console.log(data, 'dara');
    })
    socket.on('getGroup', ()=>{
        io.emit("getGroup",availableGroup);
      })

    socket.on('privateMessage', (data) => {
        arrayOfClient.push({ socketId: socket.id, name: data })
        console.log('a user connected', arrayOfClient);
        io.emit("array", arrayOfClient)
        console.log(data, "register User data", arrayOfClient);
    });

    socket.on('isUserAvailableData', (data) => {
        console.log(data, "isUserAvailablewe.......");
        isPresent = false
        arrayOfClient.forEach((user) => {
            if (user.name == data.name) {
                isPresent = true;
            }
        });
        io.emit('isUserAvailableData', { isPresent: isPresent });
    })

    socket.on("message", (data) => {
        if (data.roomName) {
            io.in(data.roomName).emit("new message", data)
        } else {
            io.to(data.socketId).emit("new message", data)
            console.log("send to personal chat .....", data.socketId);
        }

        console.log("new msg send", data);
    })
    socket.on("leave-group", (data) => {
        console.log(data, 'leavegroup');
        socket.leave(data.roomName);
        io.in(data.roomName).emit("leaveGroup", data);
    })

    socket.on('disconnect', () => {
        numberOfOnlineUsers--;
        io.emit('numberOfOnlineUsers', numberOfOnlineUsers)
        console.log(numberOfOnlineUsers, 'numberOfOnlineUsers');
        console.log("user DIsconnected !!!");
        arrayOfClient = arrayOfClient.filter((item) => {
            console.log(socket.id != item.socketId, 'socket.id != item.socketId');
            return socket.id != item.socketId
        })
        io.emit("array", arrayOfClient)
        console.log('a user disconnected!', arrayOfClient);
    })
})

http.listen(3100, () => {
    console.log('listening On *=4000');
})