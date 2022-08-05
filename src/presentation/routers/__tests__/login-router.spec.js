const LoginRouter = require('../../routers/login-router');
const MissingParamError = require('../../../utils/Errors');
const simpleHashGenerator = require('../../../utils/simpleHashGenerator');
const ServerError = require('../../../utils/Errors');

jest.mock('../../../utils/simpleHashGenerator')

const makeSut = () => {
	class AuthUseCaseSpy { // this is not the right useCase is just a mock to test login-router
		// spy is for return and comparing values
		async auth(email, password) {
			this.email = email;
			this.password = password;

			this.accessToken = simpleHashGenerator(this.email)

			return this.accessToken; // mocking valids returns, because if we want to in the future test another dependecy that is beeing injecting in LoginRouter, the return of the others injections will need to be good, to the component life cicle, so the defualt return of our depencies needs to be good and if we want to test then not working, we mock invalid
		}
	}

	const authUseCaseSpy = new AuthUseCaseSpy();
	const sut = new LoginRouter(authUseCaseSpy);
	// authUseCaseSpy.accessToken = 'validHash'; 

	return {
		authUseCaseSpy,
		sut
	}
}

describe('Login Router', () => {
	const { sut } = makeSut(); // S.U.T (System Under Test) is a commom TDD pattern to specify what is actually being tested, they use `sut` but i'll use `systemUnderTest` just ot be clear in this studies repo

	it('Should return 400 if no email is provided', async () => {
		const httpRequest = { // so the request doesn't have email
			body: {
				password: 'testpass1'
			}
		}
		const httpResponse = await sut.route(httpRequest);
		expect(httpResponse.statusCode).toBe(400); // has no email, só a user error
		expect(httpResponse.body).toEqual(new MissingParamError('email'));
	})
	it('Should return 400 if no password is provided', async () => {

		const httpRequest = {
			body: {
				email: 'test@mail.com'
			}
		}
		const httpResponse = await sut.route(httpRequest)
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('password'));
	})
	it('Should return 500 if no httpRequest param is provided', async () => {

		const httpResponse = await sut.route();
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.body).toEqual(new ServerError());
	})
	it('Should call AuthUseCase with correct params', async () => {
		const { authUseCaseSpy, sut } = makeSut(); // need to run sut again here, because of dependency injection
		const httpRequest = {
			body: {
				email: 'someEmail@.com',
				password: 'any_password'
			}
		}

		await sut.route(httpRequest);
		expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
		expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
	})
	it('Should return 500 if no AuthUseCase is provided', async () => {
		const sut = new LoginRouter(); // my on sut, because i don't wanna inejct AuthUseCase in this test
		const httpRequest = {
			body: {
				email: 'invalidEmail@.com',
				password: 'invalid_password'
			}
		}

		const httpResponse = await sut.route(httpRequest);

		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.body).toEqual(new ServerError());
	})
	it('Should return 500 if AuthUseCase has no auth method', async () => {
		const sut = new LoginRouter({}); // class, but without any methods
		const httpRequest = {
			body: {
				email: 'validEmail@.com',
				password: 'any_password'
			},
		}
		const httpResponse = await sut.route(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.body).toEqual(new ServerError());
	})
	it('Should return 401 if invalid credentials are provided', async () => {
		const { sut } = makeSut();
		const httpRequest = {
			body: {
				email: 'invalidEmail@.com',
				password: 'invalid_password'
			}
		}

		const httpResponse = await sut.route(httpRequest);
		simpleHashGenerator.mockImplementation(() => Promise.resolve(null))

		expect(httpResponse.statusCode).toBe(401);
	})
	it('Should return 500 if AuthUseCase throws', async () => {
		// here we heally test the catch in code block, with an unexpected exception
		class AuthUseCaseSpy {
			auth() {
				throw new Error();
			}
		}

		const authUseCaseSpy = new AuthUseCaseSpy();
		const sut = new LoginRouter(authUseCaseSpy);

		const httpRequest = {
			body: {
				email: 'validEmail@.com',
				password: 'any_password'
			},
		}
		const httpResponse = await sut.route(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
	})
	it('Should return 200 valid credentials is provided', async () => {
		const { sut } = makeSut();
		simpleHashGenerator.mockImplementation(() => Promise.resolve('4ashfasdo'))
		const httpRequest = {
			body: {
				email: 'validEmail@.com',
				password: 'valid_password'
			}
		}

		const httpResponse = await sut.route(httpRequest);

		expect(httpResponse.statusCode).toBe(200);
		expect(httpResponse.body.accessToken).toEqual('4ashfasdo');
	})
})
