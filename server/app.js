import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import { Users } from "./users.js";
import moment from "moment";

let users = new Users();

const httpServer = createServer();
const port = process.env.PORT || 3001;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

const getUsers = () => {
  setTimeout(() => {
    io.emit("updateUsers", users.getUsersInChat());
  }, 100);
};

io.on("connection", (socket) => {
 
  socket.on("joinChat", (user) => {
    users.removeUserInChat(socket.id);
    users.addUserInChat(socket.id, user);
    getUsers();
  });

  socket.on("leaveChat", () => {
    users.removeUserInChat(socket.id);
    getUsers();
  });

  socket.on('createMessage', (message) => {
    let user = users.getUserInRoom(socket.id);
    if(user){
      let time=moment().locale("tr").format("h:mm A")
      io.to(user.room).emit('userMessages',({name:user.name,message,time}));
    }
  })

  socket.on("joinRoom", ({ room, user }) => {
    socket.join(room);
    users.removeUserInRoom(socket.id);
    users.addUserInRoom(socket.id, user.name, room);
    io.to(room).emit("updateUsersInRoom", users.getUsersInRoom(room));
    socket.broadcast.to(room).emit("userInRoomMessage", `${user.name} in chat room!`);
  });

  socket.on("leaveRoom", (user) => {
    user = users.removeUserInRoom(socket.id);
    getUsers();
    if (user) {
      socket.broadcast.to(user.room).emit("userLeftRoomMessage", `Has left ${user.name} chat room`);
      io.to(user.room).emit(
        "updateUsersInRoom",
        users.getUsersInRoom(user.room)
      );
    }
  });

  socket.on("disconnect", async () => {
    let user = users.removeUserInRoom(socket.id);
    let userChat=users.removeUserInChat(socket.id);
    getUsers();
    if (user) {
      io.to(user.room).emit(
        "updateUsersInRoom",
        users.getUsersInRoom(user.room)
      );
    }
    if(userChat){
      userChat.user.active=false;
      await axios.put(`http://localhost:3000/users/${userChat.user.id}`,userChat.user);
      io.to(userChat.room).emit(
        "userLeftChatMessage",
        (`${userChat.name} has left chat.`)
      );
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
