const validator = require('./signup.validator');
const { getRequestBody } = require('../main.helpers');
const { writeUser } = require('./signup.hellpers');

class SignUpController {

  constructor() { }
  get signUpUser() {
    return this._signUpUser.bind(this);
  };

  async _signUpUser(req, res) {
    try {
      const body = await getRequestBody(req);
      const data = await validator.validateSignUpUser(body);
      const user = await writeUser(data, res);
      res
        .writeHead(201)
        .end(JSON.stringify({
          status: "succes",
          user: { ...user }
        }));

    } catch (err) {
      res.writeHead(400).end();
      console.error(err);
    }
  }
}

module.exports = new SignUpController();
