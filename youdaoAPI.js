const axios = require('axios');
const CryptoJS = require('crypto-js');

function truncate(q) {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

const fs = require('fs');
const matter = require('gray-matter');

const url = 'https://openapi.youdao.com/api';
const key = 'AhoYbUiuaM0RPKklDFj9maZjZ2KYVzmo';
const date = new Date();

const markdownContent = fs.readFileSync(
  './00_the_origin_of_stimulus.md',
  'utf8',
);
const data = {
  q: markdownContent,
  appKey: '6a769d303dba9c7a',
  salt: date.getTime(),
  from: 'en',
  to: 'zh-CHS',
  sign: '',
  signType: 'v3',
  domain: 'computers',
  curtime: Math.round(new Date().getTime() / 1000),
  vocabId: '18AD73C4377349E38E297B841ADC181C',
};
data.sign = CryptoJS.SHA256(
  data.appKey + truncate(data.q) + data.salt + data.curtime + key,
).toString(CryptoJS.enc.Hex);
axios({
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  url,
  method: 'post',
  data,
})
  .then((res) => {
    console.log(res.data.translation[0]);
  })
  .catch((err) => {
    console.log(err);
  });
// (async () => {
//   // const res = await axios({
//   //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//   //   url,
//   //   method: 'post',
//   //   data,
//   // });
//   // console.log(res.data.translation[0]);
//   console.log(markdownContent);
// })();
