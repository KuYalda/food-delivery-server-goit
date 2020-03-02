const getRequestBody = req => new Promise((res, rej) => {

  let buffer = '';

  req.setEncoding('utf8')
    .on('data', chunk => buffer += chunk)
    .on('error', err => rej(err))
    .on('end', () => res(buffer))
})


module.exports = {
  getRequestBody,
}