const axios = require('axios');

const obtainKeys = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('http://KeyManager:3220/')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  obtainKeys,
};
