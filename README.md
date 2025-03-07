# Heroes App

This is a web application built with Angular that allows managing a list of heroes.
Heroes can be fetched from an API, stored in localStorage, and CRUD operations (create, read, update, delete) can be performed.
The app also allows filtering heroes by name.

## Main Features

* View the list of heroes.
* Create, update, and delete heroes.
* Store heroes in localStorage.
* Filter heroes by name.
* Integration with an external API to fetch the list of heroes.

## Technologies Used

* Angular 18: Frontend development framework.
* RxJS: Library for handling asynchronous operations and events.
* Angular HttpClient: For making HTTP requests to the API.
* Angular Material: as a component library.
* Jasmine & Karma: For unit and integration tests.

## Prerequisites

Before getting started, ensure you have the following installed:

* Node.js (version 18 or higher).
* npm (Node.js package manager).
* Angular CLI (optional for fast development).

## Installation

Follow these steps to set up the project on your local machine:

1 - Clone the repository:

    git clone https://github.com/FacuGonzales/pruebaTecnicaFrontMD.git.
    cd heroes-app

2 - Install the project dependencies using npm:

    npm install

3 - Once the dependencies are installed, you can start the development server:

    npm start

This will start the application and a new window will automatically open at the url <http://localhost:4200/>.

## Usage

### Viewing Heroes

The application automatically loads a list of heroes from an external API when the localStorage is empty. If the heroes are already stored, the application loads them from the localStorage.

### CRUD Operations

* Create hero: You can add a new hero to the list.
* Update hero: You can update the information of an existing hero.
* Delete hero: You can remove a hero from the list.
* Filter heroes: You can search for heroes by name.

## Testing

The application includes unit and integration tests to ensure that components and services function correctly.

### Running Tests

To run unit tests for the application, use the following command:

    ng test 
This will execute the tests using Jasmine and Karma. Tests will run in a browser, and results will be shown in the terminal.

    ng test --code-coverage
This option causes Karma to generate a code coverage report. The report shows what percentage of your application's lines of code are covered by unit tests.

## API Configuration

The application connects to an API to fetch the list of heroes. The API URL is configured in the api.config.ts and proxy.conf.json file:

{
  "/api": {
    "target": "<https://akabab.github.io/superhero-api/>",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}

export const API_CONFIG = {
  baseUrl: 'api'
};

## Additional Notes

localStorage is used to store heroes in the browser, allowing the data to persist between sessions.
