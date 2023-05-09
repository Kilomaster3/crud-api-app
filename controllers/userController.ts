import * as User from '../models/userModel';

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
