const jsonServer = "http://localhost:3010";
const subjects = "/subjects";
const books = "/books";

const endpoint = {
  getSubjects() {
    const callback = `${jsonServer}${subjects}`;
    return fetch(callback, {
      headers: {
        Accept: "application/vnd.api+json",
      },
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse;
      });
  },
};

export default endpoint;
