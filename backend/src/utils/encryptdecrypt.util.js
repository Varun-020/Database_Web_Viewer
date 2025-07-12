var crypto = require("crypto");
const config = require("../config/config");

const keyBase64 = "weJiS~vR&yAC%f$B";
const ivBase64 = "ssdkF$HUy2A#D%kd";

function getBytes(string) {
  var utf8 = unescape(string);
  var arr = [];

  for (var i = 0; i < string.length; i++) {
    arr.push(utf8.charCodeAt(i));
  }
  return arr;
}

function getAlgorithm(keyBase64) {
  var key = Buffer.from(getBytes(keyBase64), "base64");
  switch (key.length) {
    case 16:
      return "aes-128-cbc";
    case 32:
      return "aes-256-cbc";
  }

  throw new Error("Invalid key length: " + key.length);
}

function encrypt(plainText) {
  const key = Buffer.from(getBytes(keyBase64), "base64");
  const iv = Buffer.from(getBytes(ivBase64), "base64");

  const cipher = crypto.createCipheriv(
    getAlgorithm(getBytes(keyBase64)),
    key,
    iv.slice(0, 32)
  );
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

function decrypt(messagebase64) {
  const key = Buffer.from(getBytes(keyBase64), "base64");
  const iv = Buffer.from(getBytes(ivBase64), "base64");
  try {
    const decipher = crypto.createDecipheriv(
      getAlgorithm(getBytes(keyBase64)),
      key,
      iv.slice(0, 32)
    );
    let decrypted = decipher.update(messagebase64, "base64");
    decrypted += decipher.final();
    return decrypted;
  } catch (error) {
    return messagebase64;
  }
}

module.exports = {
  decrypt,
  encrypt,
};
