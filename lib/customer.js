var request = require('request')
var moip = require('./moip')

var basicAuth = null
var endpoint = null

var customer = {}

customer.getOne = function (_id, callback) {
  var options = {
    url: endpoint.v2.url + '/customers/' + _id,
    headers: {
      'Authorization': basicAuth
    },
    method: 'GET',
    json: true
  }

  request(options, function (error, response, body) {
    if (body) {
      callback(error, body, response)
    } else {
      callback(error)
    }
  })
}

customer.create = function (customer, callback) {
  var options = {
    url: endpoint.v2.url + '/customers',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: customer,
    json: true
  }

  request(options, function (error, response, body) {
    if (body) {
      callback(error, body, response)
    } else {
      callback(error)
    }
  })
}

module.exports = function (_basicAuth, _production) {
  basicAuth = _basicAuth

  if (_production) {
    endpoint = moip.production
  } else {
    endpoint = moip.sandbox
  }

  return customer
}
