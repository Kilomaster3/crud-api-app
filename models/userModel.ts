import users from '../data/users.json';

export const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};
