import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const formatDate = (dateString) => {
  const [day, month, year] = dateString.split("/");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
