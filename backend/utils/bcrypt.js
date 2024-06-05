const bcrypt = require("bcrypt");

const hash = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

module.exports = {
  hash,
};
