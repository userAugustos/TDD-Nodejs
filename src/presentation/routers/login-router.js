const HttpResponse = require('../../utils/HttpResponse')
class LoginRouter {
	constructor(authUseCase) {
		this.authUseCase = authUseCase;
	}

	async route(httpRequest) {
		try {
			const { email, password } = httpRequest.body;

			if (!email) {
				return HttpResponse.badRequest('email');
			}
			if (!password) {
				return HttpResponse.badRequest('password');
			}

			const accessToken = await this.authUseCase.auth(email, password);
			if (!accessToken) {
				return HttpResponse.unauthorizeError();
			}

			return HttpResponse.authorized({ accessToken });
		} catch (error) {
			return HttpResponse.serverError();
		}
	}
}

module.exports = LoginRouter;