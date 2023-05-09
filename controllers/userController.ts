import * as User from '../models/userModel';
import { PUser } from '../interfaces/user';

// @route GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};

// @route GET /api/user/:id
export const getUserById = async (req, res, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);
  }
};

// @route POST /api/user/:id
export const createUser = async (req, res) => {
  try {
    const user: PUser = {
      username: 'test check',
      age: 36,
      hobbies: ['food'],
    };

    const newUser = await User.createUser(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
};
