const bcryptjs = require('bcryptjs');
const JWT = require('jsonwebtoken');

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    JWT.verify(
      token,
      process.env.SECRET_JWT,
      {
        algorithm: process.env.TOKEN_ALGORITHM,
      },
      (err, decoded) => {
        if (err) {
          reject(err.message);
        }
        resolve(decoded);
      }
    );
  });

const createToken = (uid, displayName) => {
  const payload = { uid, displayName };
  return new Promise((resolve, reject) =>
    JWT.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
        algorithm: process.env.TOKEN_ALGORITHM,
      },
      (err, token) => {
        if (err) {
          reject('Error generando token');
        }
        resolve(token);
      }
    )
  );
};

const cifrate = async (sword) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(sword, salt);
};

const cifrateVerify = async (swordOne, swordTwo) => {
  return await bcryptjs.compare(swordOne, swordTwo);
};

const validEmail = (email) => {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(String(email).toLowerCase());
};

module.exports = { verifyToken, cifrate, cifrateVerify, validEmail, createToken };
