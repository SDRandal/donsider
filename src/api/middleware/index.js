const authJwt = require("./authJwt")
const verifySignUp = require("./verifySignUp")
const verifyOwnership = require("./verifyOwnership")
const verifyUserAllowedToUpdateRequestedUser = require("./verifyUserAllowedToUpdateRequestedUser")

module.exports = {
    authJwt,
    verifySignUp,
    verifyOwnership, 
    verifyUserAllowedToUpdateRequestedUser
}
// TODO DO the Object.assign({}, [requires(),...]) thing here