const axios = require('axios');
require('dotenv').config();

const keypath = process.env.KEYPATH || keymanager;
const obtainKeys = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://${keypath}:3220/`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  obtainKeys,
};
