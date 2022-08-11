// const SECRET_KEY = 'no-one-should-know-this-secret-key';
// const HASH_LENGTH = 10;
const { SECRET_KEY = 'dev-key', HASH_LENGTH = 10 } = process.env;

module.exports = { SECRET_KEY, HASH_LENGTH };
