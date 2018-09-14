const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const Todo = require('./../../models/todo');
const User = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

// Users array

const users = [
  {
    _id: userOneId,
    email: 'milos@example.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass'
  }
];

// Todos array

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }
];

// Todos populate function

const populateTodos = function(done) {
  Todo.remove({})
    .then(function() {
      Todo.insertMany(todos).then(function() {
        done();
      });
    })
    .catch(function(err) {
      done(err.message);
    });
};

// Users populate function

const populateUsers = function(done) {
  User.remove({})
    .then(function() {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(function() {
      done();
    });
};

module.exports = { todos, populateTodos, users, populateUsers };
