
const cfsign = require('aws-cloudfront-sign')
const {getUTCTimestampMs} = require("../config/files.config")
const {publicKeyId} = require("../config/files.config")
const {CLOUDFRONTDOMAIN} = require("../config/files.config")

const setCookies = (req, res, next) =>{
    const timestamp = getUTCTimestampMs()
    const cookies = cfsign.getSignedCookies(CLOUDFRONTDOMAIN, {
        keypairId: publicKeyId,
        privateKeyPath: "./config/donsider-aws-cf-priv-key.pem",
        expireTime: timestamp
    })
    // Remove cloudfront-policy
    delete cookies["CloudFront-Policy"]
    cookies['CloudFront-Expires'] = timestamp
    for(cookie in cookies){
        res.cookie(cookie, cookies[cookie])
    }

    // TODO what was my thought process here? What was I trying to pass aas that third param? 
    // res.cookie('test', 'test', {path: "/plans"})
    next()

}
module.exports = {
    setCookies
}
