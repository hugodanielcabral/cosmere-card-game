import bcrypt from 'bcrypt';

export const encrypt = async(password: string) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch(error) {
    throw new Error(`Error while trying to encrypt the password: ${error}`);
  }
};


export const decrypt = async(password: string, hashedPassword:string) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch(error) {
    throw new Error(`Error while trying to decrypt the password: ${error}`);
  }
};
