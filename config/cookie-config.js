/**
 * Cookie  configuration file
 * @param {string} cookieSecret : 防止篡改cookie
 * @param {string} key : cookie的名字
 * @param {object} mongoStore : mongo database configuration file
 */
module.exports = {
  cookieSecret: 'kangjian1990',
  key: 'basemvc',
  mongoStore: {
    db: '',
    host: '',
    port: '',
    url: 'mongodb://localhost/blog'
  }
};
