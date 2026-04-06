import jwt from 'jsonwebtoken';
export const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
export const levelFromXp = (xp) => Math.floor(xp / 250) + 1;
