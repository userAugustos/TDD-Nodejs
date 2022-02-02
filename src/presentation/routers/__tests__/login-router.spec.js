const LoginRouter = require('../../routers/login-router');
const MissingParamError = require('../../../utils/Errors');

const makeSut = () => {
  class AuthUseCaseSpy { // this is not the right useCase is just a mock to test login-router
    // spy is for return and comparing values
    auth(email, password) {
      this.email = email;
      this.password = password;
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy();
  const sut = new LoginRouter(authUseCaseSpy);

  return {
    authUseCaseSpy,
    sut
  }
}

describe('Login Router', () => {
  const { sut } = makeSut(); // S.U.T (System Under Test) is a commom TDD pattern to specify what is actually being tested, they use `sut` but i'll use `systemUnderTest` just ot be clear in this studies repo

  it('Should return 400 if no email is provided', () => {
    const httpRequest = { // so the request doesn't have email
      body: {
        password: 'testpass1'
      }
    }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400); // has no email, só a user error
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  })
  it('Should return 400 if no password is provided', () => {

    const httpRequest = {
      body: {
        email: 'test@mail.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  })
  it('Should return 500 if no httpRequest param is provided', () => {

    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toBe(500);
  })
  it('Shoudl call AuthUseCase with correct params', () => {
    const { authUseCaseSpy, sut } = makeSut(); // need to run sut again here, because of dependency injection
    const httpRequest = {
      body: {
        email: 'someEmail@.com',
        password: 'any_password'
      }
    }

    sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  })
})