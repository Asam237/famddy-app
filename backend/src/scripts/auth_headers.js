const uid = "6520568821215faa939df3fb";
const authToken = "vgmayMy5GH32Iq6fVDhKd9hVZVCqmRcUP0aQXCevjePhfDBSGfL3XDPxs3YcSKXa";

const sha1 = require('js-sha1');

let build = sha1(uid + '$' + authToken);

console.log(build);