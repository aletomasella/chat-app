const users = [];

const addUser = ({ id, name, room }) => {
  const formatName = name.trim().toLowerCase();
  const formatRoom = room.trim().toLowerCase();

  const existingUser =
    users.length > 0
      ? users.find((user) => user.room === room && user.name === name)
      : null;

  if (existingUser) {
    // const user = { id, name: existingUser.name, room: existingUser.room };

    // users.push(user);
    return { error: "Username is already taken" };
    // return { user };
  }

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

module.exports = {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
