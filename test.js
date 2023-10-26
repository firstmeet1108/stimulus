var nodegit = require('nodegit')
const path = require('path')
// 8cbca6db3b1b2ddb384deb3dd98397d3609d25a0
nodegit.Repository.open(path.resolve(__dirname, '.git')).then(async (repo) => {
  let remote = await repo.getRemote('subscription')
  await remote.connect(nodegit.Enums.DIRECTION.FETCH)
  let references = await remote.referenceList()
  console.log(references.length)
})
