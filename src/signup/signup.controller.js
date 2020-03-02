const validator = require('./signup.validator');
const { getRequestBody } = require('../hellpers/main.hellpers');
const { writeUser } = require('./signup.model');

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
      const { statusCode, message } = err;
      res.writeHead(statusCode || 500).end(message || 'Internal Server Error');
      console.error(err);
      return;
    }
  }
}

module.exports = new SignUpController();
