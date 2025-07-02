import bcrypt from 'bcrypt';

export const encrypt = async(password: string) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch(error) {
    throw new Error(`Error while trying to encrypt the password: ${error}`);
  }
};
