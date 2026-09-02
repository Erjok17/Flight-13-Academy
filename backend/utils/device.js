const { UAParser } = require('ua-parser-js');
const crypto = require('crypto');

const parseDevice = (userAgentString) => {
  const parser = new UAParser(userAgentString || '');
  const result = parser.getResult();
  return {
    browser: result.browser.name || 'Unknown browser',
    os: result.os.name || 'Unknown OS',
  };
};

const getFingerprint = (ip, userAgentString) => {
  return crypto.createHash('sha256').update(`${ip}|${userAgentString}`).digest('hex');
};

const getClientIP = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || req.ip;
};

module.exports = { parseDevice, getFingerprint, getClientIP };