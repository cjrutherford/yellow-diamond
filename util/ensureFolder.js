const fs  = require('fs');

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
    })
  });
};