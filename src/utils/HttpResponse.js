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
      message: ''
    }
  }
}

module.exports = HttpResponse;