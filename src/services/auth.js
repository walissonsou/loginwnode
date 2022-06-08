import { hash } from 'bcrypt';

export const createPasswordHash = async (password) => {
    hash(password, salt)
     
  } 

export const checkPassword = async (user, password) =>
  hash.compare(password , user.password);
