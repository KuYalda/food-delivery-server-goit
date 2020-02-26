const getRequestBody = async req => {
  let buffer = '';
  await req.setEncoding('utf8')
    .on('data', chunk => buffer += chunk)
    .on('error', err => Promise.reject(err))
  return Promise.resolve(buffer);
};

module.exports = {
  getRequestBody,
}