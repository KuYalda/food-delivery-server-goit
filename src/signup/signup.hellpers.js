const fsPromises = require('fs').promises;
const { signUpDb } = require('../../config');


const writeUser = async (user, res) => {

  const userWithId = {
    _id: Date.now(),
    ...user
  }

  try {
    await fsPromises.writeFile(`${signUpDb}${user.username}.json`, JSON.stringify(userWithId));
  } catch (err) {
    res.writeHead(500).end();
    console.log({ err });
  }

  return userWithId;
}

module.exports = {
  writeUser
}