# mem-mmti-public

# Prerequisites

## Node and NPM

Node 6.x or greater must be installed.

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

## Install [yarn](https://yarnpkg.com/lang/en/docs/install/#alternatives-tab).

```
npm i -g yarn
```

## Fork, Build and Deployment

1. After installing Node and Yarn, you can fork or straight download a copy of this application to start your own app.
1. First download all the dependencies with `yarn install`
1. Run `npm start` to start the webpack server to run the application on port 4300

    Go to http://localhost:4300 to verify that the application is running

    :bulb: To change the default port, open `.angular-cli.json`, change the value on `defaults.serve.port`

1. Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build, like so: `ng serve --prod` to run in production mode.
1. Run `npm run lint` to lint your app code using `TSLint`

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

Set up via [Karma](https://karma-runner.github.io), [Jasmine](https://jasmine.github.io/).
1. Run `ng test` to execute the unit tests.

### End-to-end functional tests

Set up with [BDDStack](https://github.com/BCDevOps/BDDStack).

#### Run tests against local application:

1. Run `ng run e2e` to automatically start the application locally and execute the end-to-end tests.

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

# How to Contribute

Feel free to create pull requests from the default "master" branch, click here to create one automatically: https://github.com/bcgov/mem-mmti-public/pull/new/master
