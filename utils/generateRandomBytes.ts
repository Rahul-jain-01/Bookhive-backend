const pkg = require('crypto');

//@ts-ignore
const secretKey = pkg.randomBytes(32).toString('hex');

export { secretKey }