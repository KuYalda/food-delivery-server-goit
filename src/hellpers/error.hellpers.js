class CustomError extends Error {
  constructor(statusCode, errorMessage) {
    super();
    this.statusCode = statusCode;
    this.message = errorMessage;
  }
}

const curryClass = (clas, ...args) => {
  const curried = (...param) => {
    if (clas.length > param.length) {
      return curryClass(clas.bind(null, ...param))
    } else {
      return new clas(...param)
    }
  }
  return args.length ? curried(...args) : curried;
};

const error = curryClass(CustomError);

const e400 = error(400);
const e404 = error(404);
const e405 = error(405);
const e409 = error(409);

module.exports = {
  e400,
  e404,
  e405,
  e409,
}

