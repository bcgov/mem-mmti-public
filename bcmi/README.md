# BCMI (mem-mmti-public)

# Prerequisites

## Node and NPM

Node 10.19 must be installed.

## Install angular/cli

**Note, use `angular/cli`, do not use `angular/angular-cli`**

```
npm i -g @angular/cli
```

`ng` is the CLI itself

**Verify the installation**

```
npm list -g @angular/cli --depth=0
ng -v
```

## Fork, Build and Deployment

1. After installing Node and Angular CLI, you can fork or straight download a copy of this application to start your own app.
1. First download all the dependencies with `npm install`
1. Run `npm start` to start the webpack server to run the application on port 4300

    Go to http://localhost:4300 to verify that the application is running

    :bulb: To change the default port, open `.angular-cli.json`, change the value on `defaults.serve.port`

1. Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build, like so: `ng serve --prod` to run in production mode.
1. Run `npm run lint` to lint your app code using `TSLint`
1. Run `npm run test` to run the unit tests
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

### Example: Generate a customer component

```
ng g c customer
```

### Example: Generate a directive: search-box

```
ng g d search-box
```

### Example: Generate a service: general-data

```
ng g s general-data
```

Angular will give out a warning line after this command,

> WARNING Service is generated but not provided, it must be provided to be used

After generating a service, we must go to its owning module and add the service to the `providers` array.

### Example: Generate a service and include it in a module automatically

```
ng g s general-data2 -m app.module
```

### Example: Generate a class, an interface and enum

```
# class
ng g cl models/customer

# interface
ng g i models/person

# enum
ng g enum models/gender
```

### Example: Generate a pipe

```
ng g pipe shared/init-caps
```

## Generate a module

Create a login directory and generate a login module in that directory

```
ng g module login/login.module
```

## Add/Generate Routing Features

Generate a module called admin and add routing feature to it.

```
ng g module admin --routing
```

## Running Tests

### Unit tests
1. Run `ng test` to execute the unit tests.

### End-to-end functional tests

Set up with [BDDStack](https://github.com/BCDevOps/BDDStack) and [BrowserStack](https://www.browserstack.com/). Modify `GebConfig.groovy` to customise your preferred browser. Configured remotes, confirmed to work with current tests include Chrome, Firefox, and Edge. Internet explorer and Safari are available as well, but tests fail due to driver compatiblity with current tests.

### BrowserStack Config

Open Source projects have free access to Browserstack Live and Automate, for up to 5 team members. To run tests with Browserstack you need to set the following environemnt variables:

1. BROWSERSTACK_USERNAME
2. BROWSERSTACK_TOKEN
3. DEBUG_MODE (true or false)

#### Run tests against local application:

- Run `ng run e2e` to automatically start the application locally and execute the end-to-end tests against a headless Chrome.

    OR

- Download BrowserStack [binary](https://www.browserstack.com/local-testing) set `BASEURL` to your local application address, and run `./gradlew remoteChrome`

Note, e2e functional testing requires Java 10+.

#### Run tests against remote application:

1. Determine the URL at which the application is running.
2. Update the baseurl to the URL from step 1:
    1. Either modify the GebConfig.groovy baseUrl directly.
    2. Or set a `BASEURL` environment variable
3. See `functional-tests/readme.md` for how to execute the tests.

See the [BDDStack Wiki](https://github.com/BCDevOps/BDDStack/wiki) for more information.

## Change aspects of the application

### Change style dialect

```
ng set default.styleExt css
```

## Regenerate a brand new project with routing and scss options

```
ng new my-app --routing --style scss
```

## Getting Help

1. To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)
1. `ng doc component` to look up documentation for features
1. `ng serve --help` to look up doc for `ng serve` command

# Build and Deployment

For dev, test, and production builds on OpenShift/Jenkins see [openshift/README.md](https://github.com/bcgov/mem-mmti-public/blob/master/openshift/README.md) for detailed instructions on how to setup in an OpenShift environment using nginx.

# Visual Studio Code

To use our Visual Studio Code extensions copy the contents of vscodeextensions.txt in the scripts directory and paste it into bash. If it doesnt work, make sure you have the Code CLI installed `code --version` and if it's not installed open the command palette (shift + command + p) and run `Shell Command: install 'code' command in PATH`.

# How to Contribute

Feel free to create pull requests from the default "master" branch, click here to create one automatically: https://github.com/bcgov/mem-mmti-public/pull/new/master

# Testing Thanks

Thanks to BrowserStack for Testing Tool support via OpenSource Licensing ![BrowserStack](docs/browserstack-logo-white-small.png)
