const Validator = require('node-validator');

class SignUpValidator {
  static async validateSignUpUser(data) {

    const validationRules = Validator.isObject()
      .withRequired("username", Validator.isString())
      .withRequired("telephone", Validator.isString())
      .withRequired("password", Validator.isString())
      .withRequired("email", Validator.isString())

    return this._run(validationRules, data);
  }
  static async _run(rule, data) {
    const body = JSON.parse(data);

    return new Promise((res, rej) => {
      Validator.run(rule, body, (errCount, errors) => {

        if (!errCount) {
          return res(body)
        }
        return rej(new Error('Invalid request body'));
      })
    })
  }
}

module.exports = SignUpValidator;