const HttpResponse = require('../../utils/HttpResponse')
class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  route(httpRequest) {
    if (!httpRequest?.body || !this.authUseCase) { // with the "?" i already testing if exists httpRequest and .body
      return HttpResponse.serverError();
    }
    const { email, password } = httpRequest.body;

    if (!email) {
      return HttpResponse.badRequest('email');
    }
    if (!password) {
      return HttpResponse.badRequest('password');
    }

    const accessToken = this.authUseCase.auth(email, password);
    if (!accessToken) {
      return HttpResponse.unauthorizeError();
    }
    return HttpResponse.authorized(accessToken);
  }
}

module.exports = LoginRouter;