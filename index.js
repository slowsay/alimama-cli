#!/usr/bin/env node

var exec = require('child_process').exec
var cd = exec('gulp publish')

cd.stdout.on('data', function(data) {
  console.log(data)
})
