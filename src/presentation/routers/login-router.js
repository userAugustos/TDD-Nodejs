const HttpResponse = require('../../utils/HttpResponse')
class LoginRouter {
  route(httpRequest) {
    if (!httpRequest?.body) { // with the "?" i already testing if exists httpRequest and .body
      return HttpResponse.serverError();
    }
    const { email, password } = httpRequest.body;

    if (!email) {
      return HttpResponse.badRequest('email');
    }
    if (!password) {
      return HttpResponse.badRequest('password');
    }
  }
}

module.exports = LoginRouter;