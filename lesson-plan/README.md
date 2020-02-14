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

Run your test suite (automatically runs in watch mode)
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

## Add CI with GitHub Workflow

* Create `.github/workflows` folders
* Create `nodejs.yml` file in `workflows` folder

```
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-18.04

    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js 12.8
      uses: actions/setup-node@v1
      with:
        node-version: 12.8
    - name: Install dependencies
      run: npm install
    - name: Lint
      run: npm run lint
    - name: Build
      run: npm run build
    - name: Test
      run: npm run test:ci
```
* Update your `karma.conf.js` file per the Nov 9, 2017 comment on this GitHub [issue](https://github.com/angular/angular-cli/issues/2013)
  * We're doing this so tests can run in the GitHub Workflow we created above
  * Add this script to `package.json` for exiting the CI build
    * `"test:ci": "ng test --browsers='ChromeHeadless' --watch=false"`
* Set your git config `user.name` and `user.email` to your GitHub account information
* Commit to GitHub repoistory
