# Adapt React Coding Challenge

Three step form to manage and update your book list.

## What is the solution?
* Built with a minimal custom setup needed just for this task. No boilerplate.
* App is divided into functional components. State is managed with native and custom hooks, so it has zero class components.
* Each user interface or application component has a separate style written with SCSS using BEM methodology. Some global colours, sizes and typography elements were defined to reuse and manage them more simply.
* No external libraries were used except packages for development.

## What could be improved?
* App state could be managed with reducers instead of separate hooks, similar how form is being managed.
* Form itself does not let you edit all the data, but in a case it would, uncontrolled form should be considered with a different data management approach, since it is quite complicated.
* There are some lint comments across the code, so it could also be fixed. Keys for components should be improved as well.
* ... and cover components with tests.

## Final thoughts?
I wanted to make this task useful for myself, so I've experimented and tried new things a.k.a hooks and effects instead of more classic lifecycle methods. Enjoyed it and still learned something new. Spent approximately 4 hours.

## What's inside?
* React
* Webpack
* Babel
* ESLint (Airbnb)
* Sass (SCSS)

## How to launch project?
* Install required packages with `yarn install`
* Start the project with `yarn start`
* ... and visit `http://localhost:8080/`

## How to build?
* Simple production version can be built with `yarn build` to the `./build` directory.

