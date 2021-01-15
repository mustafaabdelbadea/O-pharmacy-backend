const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    //send token in header 
    const token = req.body.token;
    //check if token is exists and token is right
    if (token && token != null && token != undefined) {
        jwt.verify(token, 'pharmjwt', (err, decoded) => {
            if (err) {
                res.json('authentication fallid or error in token');
            }
            else {
                next()
            }
        })
    }
    else {
        res.json('error in token or token not provided');
    }
}