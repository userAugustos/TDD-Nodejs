const LoginRouter = require('../login-router');

describe('Login Router', () => {
  it('Should return 400 if no  email is provided', () => {
    const systemUnderTest = new LoginRouter(); // S.U.T (System Under Test) is a commom TDD pattern to specify what is actually being tested, they use `sut` but i'll use `systemUnderTest` just ot be clear in this studies repo

    const httpRequest = { // so the request doesn't have email
      body: {
        password: 'testpass1'
      }
    }
    const httpResponse = systemUnderTest.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400); // has no email, só a user error
  })
})