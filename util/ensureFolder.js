const fs  = require('fs');

const promisify = require('util').promisify;

const mkdir = promisify(fs.mkdir);

module.exports = ensureFolder = (path, mask) => {
  return new Promise((resolve, reject) => {
    if(typeof mask === 'undefined'){
        mask = 0777;
    } 
    fs.mkdir(path, mask, (err) => {
        if(err){
            if(err.code === "EEXIST") resolve(null);
            reject(err);
        } else {
            resolve(null);
        }
    });
  });
};