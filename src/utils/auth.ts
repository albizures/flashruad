import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { findAll } from '../entities/user/user.repository';

const secret = 'dd';

const attempt = async (email: string, password: string) => {
  const users = await findAll({ email });
  if (users.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = users[0];
  const isPassword = await compare(password, user.password);
  if (!isPassword) {
    throw new Error('Invalid email or password');
  }
  return user;
};

const decode = (token: string) => verify(token, secret);

const login = async (email: string, password: string) => {
  const { id } = await attempt(email, password);
  const token = sign(String(id), secret);

  return { token: token };
};

export { login, decode };
