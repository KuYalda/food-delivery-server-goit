const fsPromises = require('fs').promises;
const path = require('path');
const { existsSync } = require('fs');
const { signUpDb } = require('../../config');
const { e409 } = require('../hellpers/error.hellpers');


const writeUser = user => new Promise((res, rej) => {

  const fileName = path.join(signUpDb, `${user.username}.json`);

  if (existsSync(fileName)) return rej(e409(`${user.username} allready exist`));

  const userWithId = {
    _id: Date.now().toString(),
    ...user
  }

  fsPromises.writeFile(fileName, JSON.stringify(userWithId));

  return res(userWithId);
})


module.exports = {
  writeUser
}