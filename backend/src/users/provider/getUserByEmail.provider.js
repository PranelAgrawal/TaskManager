const User = require("../user.schema.js");

async function getUserByEmail(email){
    try{
        user = await User.findOne({email: email});
        return user;
    }catch(error){
        return null;
    }
}

module.exports = getUserByEmail;