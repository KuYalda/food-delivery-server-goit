const urlParser = req => {
  const parsedUrl = new Map();
  const url = new URL(`http://${req.headers.host}${req.url}`);
  console.log('url :', url);
  const pathnameLength = url.pathname.slice(1).split('/').length;
  console.log('pathnameLength:', pathnameLength);
  if (pathnameLength === 2 && url.searchParams) console.log('Evrica');

  return parsedUrl;
}

module.exports = {
  urlParser,
}