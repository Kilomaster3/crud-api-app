import * as User from '../models/userModel';
import { PUser } from '../interfaces/user';
import { getPostData } from '../utils/getPostData';

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

// @route GET /api/users/:id
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

// @route POST /api/users
export const createUser = async (req, res) => {
  try {

    const body = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body as string);

    const user: PUser = {
      username,
      age,
      hobbies,
    };

    const newUser = await User.createNewUser(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
};

// @route PUT /api/users/:id
export const updateUser = async (req, res, id) => {
  try {
    const user: PUser = await User.findById(id) as PUser;

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      const body = await getPostData(req);

      const { username, age, hobbies } = JSON.parse(body as string);

      const userData: PUser  = {
        username: username || user.username ,
        age: age || user.age,
        hobbies: hobbies || user.hobbies
      };

      const updUser = await User.updateCurrentUser(id, userData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updUser));
    }
  } catch (err) {
    console.log(err);
  }
};

// @route DELETE /api/users/:id
export const deleteUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      await User.removeUser(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (err) {
    console.log(err);
  }
}
