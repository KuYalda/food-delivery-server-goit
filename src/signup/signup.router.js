const { signUpUser } = require('./signup.controller');
const signUpRouter = new Map();

signUpRouter.set('POST', signUpUser);

module.exports = signUpRouter;