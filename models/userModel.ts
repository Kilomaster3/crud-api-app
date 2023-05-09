import users from '../data/users.json';
import { v4 as uuidv4  } from 'uuid';
import { writeDataToFile } from '../utils/writeDataToFile';

export const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = async (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};

export const createUser = async (user) => {
  return new Promise((resolve, reject) => {
    const newUser = {id: uuidv4(), ...user};
    users.push(newUser);
    writeDataToFile('./data/users.json', users)
    resolve(newUser);
  });
};
