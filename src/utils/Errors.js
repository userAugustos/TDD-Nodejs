module.exports = class MissingParamError extends Error {
  constructor(param) {
    super(`Missing parameter ${param}`);
    this.name = 'MissingParamError';
  }
}

module.exports = class ServerError extends Error {
	constructor(param) {
		super('Internal error')
		this.name = 'Unauthorized Error';
	}
}
