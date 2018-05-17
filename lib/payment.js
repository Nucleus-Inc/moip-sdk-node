var request = require('request')
var moip = require('./moip')

var basicAuth = null
var endpoint = null

var payment = {}

payment.getOne = function (id, callback) {
  var options = {
    url: endpoint.v2.url + '/payments/' + id,
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

payment.create = function (orderId, payment, callback) {
  var options = {
    url: endpoint.v2.url + '/orders/' + orderId + '/payments',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: payment,
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

payment.preAuthorize = function (id, callback) {
  var options = {
    url: endpoint.v2.url + '/payments/' + id + '/capture',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
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

payment.authorize = function (id, amount, callback) {
  var options = {
    url: endpoint.v2.authorizeUrl + '?payment_id=' + id + '&amount=' + amount,
    headers: {
      'Authorization': basicAuth
    },
    method: 'GET',
    json: true
  }

  request(options, function (error, response) {
    if (response) {
      callback(error, response)
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

  return payment
}
