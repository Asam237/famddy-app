const uid = "64c314ee0c12bff76fbd1a9e";
const timestamp = 1690506909305;
const authToken = "ejuvf0z21dHRwOUtfyJVMHgaQxxCcDJBqWoSspMcri33njKfw5MyRdmFN2QNag1c";

const sha1 = require('js-sha1');

let build = sha1(uid + '$' + timestamp + '$' + authToken);

console.log(build);