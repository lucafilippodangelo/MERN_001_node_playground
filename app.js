//importing file sysyem in Javascript
// the function "require" is available globally. 'fs' is available in node for file sysyem
const fs = require('fs'); 

const userName = 'Max';

fs.writeFile('user-data.txt', 'Name: ' + userName, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('WROTE FILE');
});
