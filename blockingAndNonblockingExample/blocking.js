var fs = require('fs')
var contents = fs.readFileSync('/etc/hosts');
console.log(contents);
console.log('Doing something else');
