/**
 * @description: 加密方法
 * @author: lau
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/secretKeys')

/**
 * @param {String} content 要加密的明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * @param {*} content 明文
 * @description: 加密方法
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto
