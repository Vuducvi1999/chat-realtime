// const users = [];

// const addUser = ({ id, name, room }) => {
//   name = name.trim().toLocaleLowerCase();
//   room = room.trim().toLocaleLowerCase();
//   const isExist = users.find((i) => i.name === name && i.room === room);
//   if (!isExist) {
//     users.push({ id, name, room });
//     return true;
//   } else return false;
// };

// const getUser = (id) => users.find((i) => i.id === id);

// const getUsersRoom = (room) => {
//   return users.filter((i) => i.room === room);
// };

// const removeUser = (id) => users.filter((i) => i.id !== id);
// module.exports = { users, addUser, getUser, getUsersRoom, removeUser };

const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim();
  room = room.trim();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { users, addUser, removeUser, getUser, getUsersInRoom };
