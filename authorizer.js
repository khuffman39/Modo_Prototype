const jwt = require('jsonwebtoken');
const jwk = require('jwk-to-pem');
const key = {"kid":"b1cc20c8-9118-4fdd-b8da-8de12d393211","kty":"RSA","n":"s6fvHnLTRpqL9i7ZzQCiV8uMP-FJL5mO94PGRobQCnFwFpFFravTkOChxQA4LZ94fWHtE85qibiMGCyRq9aaRfmbU1sYZ1NmGwBXGg3jMDJX3Z7IFDubQdvH4KrCz54yXOvMDbEsxwFBryYqRdllxIrxHD1FT82BVJ9GBTkJddhwxUenCk7X8oziOglfpic1W9MxGO2F22f11Q8Hm6ZtSPMsl0HXzbct9WRqC5IbzuAAoj6oZ8qMz3bP7kkfHnI7Te6pDnkEjk8uho-9KwAllipWoT9FrnZMpXx3yIo4afrnR6r5tb5-zPJ7iJphQjuk0lcT_xRYYV1quBAsBqbBdQ","e":"AQAB"};

/**
 * decodes payload using json web token and jwk to pem
 * @param {string} headerVal - usually req.headers.authorization
 * @returns - json object with decoded payload
 */
function getPayload(headerVal) {
    let payload = null;
    payload = jwt.verify(headerVal.replace("Bearer ", ""), jwk(key));
    return payload;
}
module.exports.getPayload = getPayload;

function test() {

}
module.exports.test = test;