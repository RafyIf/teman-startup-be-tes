# ![Node/Express/Mongoose Example App](project-logo.png)

[![Build Status](https://travis-ci.org/anishkny/node-express-realworld-example-app.svg?branch=master)](https://travis-ci.org/anishkny/node-express-realworld-example-app)

> ### Example Node (Express + Typescript + Postgresql + Swagger) codebase containing real world examples (get all orders, get one orders) that adheres to the [RealWorld](https://teman-startup-be.herokuapp.com/api/orders) API spec.
<a href="https://teman-startup-be.herokuapp.com/api-docs" target="_blank">api docs swagger</a>

This repo is functionality complete — PRs and issues welcome!

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install OR yarn install` to install all required dependencies
- `npm run test OR yarn test` to start test with jest
- `npm run build OR yarn build` to build typescript app
- `npm run start:dev OR yarn start:dev` to start the local server dev
- `npm run start:prod OR yarn start:prod` to start the local server production

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [typescript](https://github.com/microsoft/TypeScript) - TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications
- [swagger ui](https://github.com/swagger-api/swagger-ui) - Swagger UI allows anyone — be it your development team or your end consumers — to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from your OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for back end implementation and client side consumption.

## Application Structure

- `app.ts` - The entry point to our application. This file defines our express server application.
- `components/` - This folder contains configuration logic and route service API.
- `utils/` - This folder contains the custom function.
