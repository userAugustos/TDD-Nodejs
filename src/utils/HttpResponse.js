const MissingParamError = require('../utils/Errors');

class HttpResponse {
  static badRequest(param) {
    return {
      statusCode: 400,
      body: new MissingParamError(param)
    }
  }
  static serverError() {
    return {
      statusCode: 500,
      // message: ''
    }
  }
  static unauthorizeError() {
    return {
      statusCode: 401,
      message: 'Unauthorized'
    }
  }
  static authorized(accessToken) {
    return {
      statusCode: 200,
      body: accessToken
    }
  }
}

module.exports = HttpResponse;