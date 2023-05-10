import users from '../data/users.json';
import { v4 as uuidv4  } from 'uuid';
import { writeDataToFile } from '../utils/writeDataToFile';
import { PUser } from '../interfaces/user';

export const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = async (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};

export const createNewUser = async (user: PUser) => {
  return new Promise((resolve, reject) => {
    const newUser = {id: uuidv4(), ...user};
    users.push(newUser);

    writeDataToFile('./data/users.json', users)
    resolve(newUser);
  });
};

export const updateCurrentUser = async (id: string, user: PUser) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.id === id);
    users[index] = {id, ...user};

    writeDataToFile('./data/users.json', users)
    resolve(users[index]);
  });
};
