const API_ROOT_URL = 'http://localhost:3010';

export default class {

  static handleResponseStatus(response) {
    if (!response.ok) {
      // do something
    }
    return response.json();
  }

  // options: method, content type, etc.
  static fetch(route, options) {
    return fetch(API_ROOT_URL + route, options).then(
      this.handleResponseStatus
    );
  }

  static GET(route) {
    return this.fetch(
      route
    );
  }

  static PUT(route, options) {
    return this.fetch(
      route,
      { method: 'PUT', ...options }
    );
  }

}
