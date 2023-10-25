var Git = require('nodegit')

var pathToRepo = require('path').resolve('./.git')

let repo = Git.Repository.open(pathToRepo)

Git.Diff.indexToIndex(repo, 'null', null).then(function (diff) {
  console.log(diff)
})
