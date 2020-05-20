'use strict';

// create
exports.post = (req, res) => {
  res.send('Post User(s)');
};

// read
exports.get = (req, res) => {
  res.send('Get User(s)');
};

// 
exports.put = (req, res) => {
  res.send('Put User(s)');
};

exports.patch = (req, res) => {
  res.send('Patch set of changes made to User(s)');
};

exports.delete = (req, res) => {
  res.send('Delete User(s)');
};