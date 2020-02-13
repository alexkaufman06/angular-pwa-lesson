# Angular PWA Lesson Plan

This lesson plan for teaching the DAT Academy how to build and deploy a Progressive Web Application (PWA) with GitHub Actions for Continuous Integration and Continuous Delivery (CI/CD) while following some Test Driven Development (TDD) practices.

## What You Need

* VS Code or IDE of your choice
  * Angular Language Service extension (provides syntax highlighting)
* Node JS and NPM installed
* GitHub account and git installed on your machine

## Set up

Install the Angular CLI in the terminal if needed
```
npm install -g @angular/cli
```

Generate a new Angular app
```
ng new myAppName
```

* Say yes to Angular routing
* Choose SCSS for your stylesheet
* Open your generated `package.json` file
  * This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies
  * Add `--open` to the start script

Run your test suite
```
npm run test
```

Start the application
```
npm run start
```
(If you see the `Job name "..getProjectMetadata" does not exist` error: You might have to change `package.json` to: "@angular-devkit/build-angular": "^0.803.8" and run `npm install`)

## TDD Intro

* Test-driven development is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the code is improved so that the tests pass.
* The `app.component.spec.ts` file houses our test cases and is a implementation of the requirements. Change the title of the application in the test case to a title of your choice.
* Update `app.component.ts` and `app.component.html` files to make tests pass