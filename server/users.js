export class Users {
  constructor() {
    this.usersInChat = [];
    this.usersInRoom = [];
  }
  addUserInRoom(id, name, room) {
    let user = {id, name, room};
    this.usersInRoom.push(user);
    return user;
  }
  addUserInChat(id,user){
    let newUser={id,user};
    this.usersInChat.push(newUser);
    return newUser;
  }
  getUsersInChat () {
    return this.usersInChat;
  }
  getUsersInRoom (room) {
    return this.usersInRoom.filter((user) => user.room === room);
  }
  getUserInRoom(id) {
    return this.usersInRoom.filter((user) => user.id === id)[0];
  }
  getUserInChat(id) {
    return this.usersInChat.filter((user) => user.id === id)[0];
  }
  removeUserInRoom(id) {
    let user = this.getUserInRoom(id);
    if(user) this.usersInRoom = this.usersInRoom.filter((user) => user.id !== id);
    return user;
  }
  removeUserInChat(id) {
    let user = this.getUserInChat(id);
    if(user) this.usersInChat = this.usersInChat.filter((user) => user.id !== id);
    return user;
  }
}