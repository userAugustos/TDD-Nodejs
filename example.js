// file just exports the routes
const express = require('express'); // here we use express, but if we want to change it, we can just rewrite the routes here, and nothing in the others files
const router = express.Router;

modeule.exports = () => {
  const route = new SingUpRouter(); // our class
  router.post('/singup', ExpressAdapter.adapt(route)); // static class doesn't need "new" statement and will had req, res anyway, the express callback are passing
}

// adapters, it's a pattern that adapter a class to other

class ExpressAdapter {
  static adapt(router) { // here the router class
    return async (req, res) => { // express always expects a async function with req, res in your callback, so we are returning what router.post will actually wxecute
      const httpRequest = { // só maper to express to our desired pattern, so the thing is if we ant to change express, all the requests it's just to change here in uor pattern
        body: req.body
      }

      const httpResponse = await router.route(httpRequest); // executing our actually router function
      res.status(httpResponse.statusCode).json(httpResponse.body); // we know that our singUpRouter is return a object in base of express pattern
    }
  }
}

// Presentation Layer
// singup-router na /routes
class SingUpRouter { //router
  async route(httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body;

    const user = new SignUpUseCase().singUp(email, password, repeatPassword); // here we are instantiating our class, it's a bad pattern, in our project we will use depencie injection, passing the dependency of a class in your constructor

    // if () {
    //   res.status(400).json({ error: 'Tal erro' })
    // }

    return {
      statusCode: 200,
      body: JSON.stringify(user)
    }
  }
}

// Domain Layer regras de negocio
//singup-usecase na /usecases
class SignUpUseCase {
  async singUp(email, password, repeatPassword) {
    if (password === repeatPassword) { //regra de negocio 
      const user = new AccountRepository().create(email, password);

      return user;
    }
    return error;
  }
}

// Ifra Layer
// account-repo
const mongoose = require('mongoose');
const AccountModel = mongoose.model('Account');

class AccountRepository {
  async create(email, password) {
    const user = await AccountModel.create({ email, password }); // o que deveria ser o adaptador de interface, conexão com o banco
    return user;
  }
}