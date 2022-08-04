const users = [];

const addUser = ({ id, name, room }) => {
  const formatName = name.trim().toLowerCase();
  const formatRoom = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => users.room === room && users.name === name
  );

  if (existingUser) {
    return { error: "Username is already taken" };
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  return users.filter((user) => user.id !== id);
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
