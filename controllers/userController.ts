import * as User from '../models/userModel';
import { PUser } from '../interfaces/user';
import { getPostData } from '../utils/getPostData';
import { validate as isValidUUID } from 'uuid';

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

    if (user && isValidUUID(id)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else if (user && !isValidUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User ID is invalid' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } catch (err) {
    console.log(err);
  }
};

// @route POST /api/users
export const createUser = async (req, res) => {
  try {
    const body: unknown = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body as string);

    const user: PUser = {
      username,
      age,
      hobbies,
    };

    if (user.username && user.age && user.hobbies) {
      const newUser = await User.createNewUser(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.writeHead(201, { 'Content-Type': 'application/json' });

      res.writeHead(201, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Fill required fields' }));
    }
  } catch (err) {
    console.log(err);
  }
};

// @route PUT /api/users/:id
export const updateUser = async (req, res, id) => {
  try {
    const user: PUser = await User.findById(id) as PUser;

    if (user && isValidUUID(id)) {
      const body = await getPostData(req);

      const { username, age, hobbies } = JSON.parse(body as string);

      const userData: PUser = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updUser = await User.updateCurrentUser(id, userData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updUser));
    } else if (user && !isValidUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User ID is invalid' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } catch (err) {
    console.log(err);
  }
};

// @route DELETE /api/users/:id
export const deleteUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);

    if (user && isValidUUID(id)) {
      await User.removeUser(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    } else if (user && !isValidUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User ID is invalid' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } catch (err) {
    console.log(err);
  }
};
