const crypto = require("crypto")
const { createHash } = require("crypto")
const fs = require('fs')
const cfsign = require('aws-cloudfront-sign')



const privKey = fs.readFileSync('./app/config/donsider-aws-cf-priv-key.pem', 'utf-8')
const CLOUDFRONTDOMAIN = 'https://d1c99iomjiepbv.cloudfront.net/'
const publicKeyId = "K2QO15VP07090U"
// TODO This is so slopppy, this whole file is, but si need to figure out how this works
// CLEAN IT UP!!!!!
module.exports.privKey = privKey
module.exports.CLOUDFRONTDOMAIN = CLOUDFRONTDOMAIN
module.exports.publicKeyId  = publicKeyId

module.exports.s3BucketParams = {
    Bucket: "donsider-attachments-v1"

}

const EXPIRATION = 30 * 1000

module.exports.getUTCTimestamp = () => {
    const currentDate = new Date()
    return Math.floor(currentDate.getTime() / 1000) + EXPIRATION
}
const getUTCTimestampMs = () => {
    const currentDate = new Date()
    return Math.floor(currentDate.getTime() ) + EXPIRATION
}
module.exports.getUTCTimestampMs = getUTCTimestampMs
module.exports.createPolicy = (filepath, timestamp) => {

    // TODO this policy does not account for any query params that I might be adding, unless I pass the string in that way. 
    // That is super ambiguous, and I will need to address it if the need arrives, but as of right now, I have no
    // reason to think I'll need to do that
    const policy = {
        "Statement": [
            {
                "Resource": "https://d1c99iomjiepbv.cloudfront.net/044eec81-5046-46b5-a756-66e49df14a76_qbo-plus.png",
                "Condition": {
                    "DateLessThan": {
                        "AWS:EpochTime": 1636186089
                    }
                }
            }
        ]
    }
    const policyString = JSON.stringify(policy).replace(/\s/g, '')
    return policyString
}
const sanitizeSignature = (signature) => {
    const replacements = { "+": "-", "=": "_", "/": "~" }
    const cleanSignature = signature.replace(/[+=/]/g, char => replacements[char])
    return cleanSignature
}

module.exports.createSignature = (policy) => {
    const sign = crypto.createSign('RSA-SHA1')
    sign.update(policy)
    sign.end()
    const signature = sign.sign(privKey, "base64")
    return sanitizeSignature(signature)
}
module.exports.createSignature2 = (policy) => {
    const hashAlgos = crypto.getHashes()
    const hash = createHash("RSA-SHA1")
    hash.update(policy)

    // const sign = crypto.createSign('SHA1')
    // sign.update(policy)
    // sign.end()
    // const signature = sign.sign(privKey)
    // return sanitizeSignature(signature.toString('base64'))
}
module.exports.createSignedUrl = (filename, timestamp, params, signature) => {
    let url = CLOUDFRONTDOMAIN + filename + "?"
    if (params) {
        url.concat("", params)
    }
    url += "Expires=" + timestamp + "&Signature=" + signature + "&Key-Pair-Id=" + publicKeyId

    return url
}
const getSigningParams = ()=> ({
    keypairId: "K2QO15VP07090U",
    privateKeyPath: "./app/config/donsider-aws-cf-priv-key.pem",
    expireTime: getUTCTimestampMs()
})
cfsign.getSignedCookies
module.exports.generateSignedUrl = (itemPath) => {
    const signedURL = cfsign.getSignedUrl(
         'https://d1c99iomjiepbv.cloudfront.net/' + itemPath,
         getSigningParams()
    )
    return signedURL
}
module.exports.readStream = (stream) =>{

}
