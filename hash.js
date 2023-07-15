const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  const passwordCompare1 = await bcrypt.compare(password, 10);
};

hashPassword("123456");
