# Angular PWA Lesson Plan

This lesson plan is for teaching the DAT Academy how to build and deploy a Progressive Web Application (PWA) with GitHub Actions and Pages for Continuous Integration and Continuous Delivery (CI/CD) while following some Test Driven Development (TDD) practices.

## What You Need

* VS Code or IDE of your choice
  * Angular Language Service extension (provides syntax highlighting for VS Code)
* Node JS and NPM installed
* GitHub account and git installed on your machine
* Google Chrome

## What is a PWA?

* Progressive Web Apps are user experiences that have the reach of the web, and are:
  * Reliable - Load instantly and never show the downasaur, even in uncertain network conditions.
  * Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
  * Engaging - Feel like a natural app on the device, with an immersive user experience.
* This new level of quality allows Progressive Web Apps to earn a place on the user's home screen and be downloaded on any device.
* For more information, see [Google's developer documentation](https://developers.google.com/web/progressive-web-apps)

## Set up

1) Install the Angular CLI in the terminal if needed
```
npm install -g @angular/cli
```
* This CLI (command-line interface) allows us to initialize, develop, scaffold, and maintain Angular applications.

2) Generate a new Angular app
```
ng new myAppName
```

* Say yes to Angular routing
* Choose SCSS for your stylesheet
* Open your generated `package.json` file
  * This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies
  * Add `--open` to the start script

3) Run your test suite (automatically runs in watch mode)
```
npm run test
```

4) Start the application
```
npm run start
```
(If you see the `Job name "..getProjectMetadata" does not exist` error: You might have to change `package.json` to: "@angular-devkit/build-angular": "^0.803.8" and run `npm install`)

## TDD Intro

* Test-driven development is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the code is improved so that the tests pass.
* The `app.component.spec.ts` file houses our test cases and is a implementation of the requirements. Change the title of the application in the test case to a title of your choice and watch the test fail.
* Update `app.component.ts` and `app.component.html` files to make tests pass
  * This is a very basic example, but the main idea here is write your test code for what you want the application to do. Then make sure the test fails as expected and write the necessary application code to make the test pass.

## Add CI/CD with GitHub Workflow

* Continuous integration (CI) is the practice of automating the integration of code changes from multiple contributors into a single software project. The CI process is comprised of automatic tools that assert the new code's correctness before integration.
* Continuous delivery (CD) is a software engineering approach in which teams produce software in short cycles, ensuring that the software can be reliably released at any time and, when releasing the software, doing so manually. It aims at building, testing, and releasing software with greater speed and frequency.
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
* Update your npm scripts to run in headless mode
  * We're doing this so tests can run in the GitHub Workflow we created above
  * Add this script to `package.json` for exiting the CI build
    * `"test:ci": "ng test --browsers='ChromeHeadless' --watch=false"`
    * Update the test script to: `ng test --browsers='ChromeHeadless'` (personal preference)
* Set your git config `user.name` and `user.email` to your GitHub account information
* Commit to GitHub repository and watch the GitHub Workflow do its magic!

## Make it a PWA and Deploy it!

* Add a service worker (more info on that [here](https://angular.io/guide/service-worker-getting-started))
* Run this in termimal to generate JS needed to load a service worker into app.
```
ng add @angular/pwa
```
* The new `ngsw-config.json` file helps you customize behavior of service worker and the worker is there primarily to allow your service worker to work offline. 
* The new `manifest.webmanifest` file references web icons for the install button of the app. It also has other settings on how the app will appear natively.
* Update the webmanifest with the name of your repoistory:
```
  "scope": "/yourAppName/",
  "start_url": "/yourAppName/",
```
* Update the baseHref and outputPath of `angular.json`:

```
"baseHref": "/your-repository-name/",
"outputPath": "docs/",
```
* Update your build script in the `package.json`:
```
"build": "ng build --prod && cp docs/index.html docs/404.html",
```
* Now run:
```
npm run build
```
* Commit your changes
* Update your GitHub repository's settings
  * There is a setting for GitHub Pages which should have a `Source` set to `master branch /docs folder`
* You should soon see your app deployed
* Open the JS console in Chrome
  * Click on the audit tab and generate a report
* If all goes well, you should pass the PWA checks and see that your app is downloadable via the plus icon to the right of the URL

## Now What!?

* You now have a template for building an application of your choice capable of being run on any device! 
* If you're new to Angular, learn more check out some of their documentation at [angular.io](https://angular.io/)
* While working on my own PWA with this process, here are some my good/bad takeaways:

| The Good | The Bad |
|---       |---      |
| <ul><li>Downloadable on any device</li> <li>Completely free</li> <li>Good option for making a quick POC</li> <li>Performance is great</li> <li>One repo for any device</li></ul> | <ul><li>Native application is dependent on the browser it is download with</li> <ul><li>Safari for iPhones and Chrome for Android</li></ul> <li>I've seen the download fail occasionally on iPhone</li> <li>Sound on Safari/iPhone is challenging due to autoPlay being false</li> <li>Updates don't always install gracefully on iPhone</li></ul> | 
