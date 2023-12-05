const schedule = require('node-schedule');
const { diffCommit } = require('./main');

// 凌晨4点刷新
const job = schedule.scheduleJob('0 0 4 * * *', () => {
  console.log(new Date());
  diffCommit();
});
