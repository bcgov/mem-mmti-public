# BCMI (mem-mmti-public)

https://mines.nrs.gov.bc.ca/

## Introduction

The Ministry of Energy, Mines, and Low Carbon Innovation (EMLI), Ministry of Environment and Climate Change Strategy (ENV), and Environmental Assessment Office (EAO) have collaborated to make information on the Province’s oversight of major mines in British Columbia accessible.

The application is being developed as an open source solution.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
1. [Running tests](#running-tests)
   - [Unit tests](#unit-tests)
   - [End-to-end functional tests](#end-to-end-functional-tests)
   - [BrowserStack Config](#browserstack-config)
1. [Architecture](#architecture)
1. [How to Contribute](#how-to-contribute)
   - [Contributing](#contributing)
1. [License](#license)
1. [Additional Documentation](#additional-documentation)

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

Git commit signing is required for commits. [How to setup git commit signing](https://sabbour.me/setting-up-signed-git-commits-on-macos/)

**Software Requirements**

- Node 20 or higher must be installed.
- @angular/cli should be installed.

### Installation

- [Clone the mem-mmti-public repository](https://help.github.com/en/articles/cloning-a-repository)

**To connect to the openshift dev database:**
  1. Login to openshift and copy the login token (Click your name in the top right)
  2. In a terminal paste and run the login command.
  3. Ensure no other postgres instance is running or choose another port (brew services stop postgresql)
  4. Run the command: (Note: If the pod restarts, the pod name may change.) ```oc port-forward cms-postgres-1-2cn2c 5432:5432 -n f00029-dev```


**To connect to the frontend:**
  1. Install angular/cli ```npm i -g @angular/cli```
  1. ``` cd bcmi ```
  1. ``` npm install ```
  1. ``` npm run start ```


  **To connect to Strappi and graphql:**
  1. create an .env file in the cms folder using the .env.template, find secrets in openshift
  1. ``` npm install ```
  1. ``` cd cms ```
  1. ``` npm install ```
  1. ``` npm run develop ```
  1. go to the pods openshift secrets to find the strappi login details
  1. Login to strapi admin at http://localhost:1337/admin
  1. See graphql queries at http://localhost:1337/graphql (ensure the strappi content has the 'find' role enabled)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Running tests:

### Unit tests

Set up via [Jest](https://github.com/jestjs/jest).
1. Run ```npm test``` to execute the unit tests.

### End-to-end functional tests

Set up with [BDDStack](https://github.com/BCDevOps/BDDStack) and [BrowserStack](https://www.browserstack.com/). Modify `GebConfig.groovy` to customise your preferred browser. Configured remotes, confirmed to work with current tests include Chrome, Firefox, and Edge. Internet explorer and Safari are available as well, but tests fail due to driver compatiblity with current tests.

### BrowserStack Config

Open Source projects have free access to Browserstack Live and Automate, for up to 5 team members. To run tests with Browserstack you need to set the following environemnt variables:

1. BROWSERSTACK_USERNAME
1. BROWSERSTACK_TOKEN
1. DEBUG_MODE (true or false)

#### Run tests against local application:

- Run `ng run e2e` to automatically start the application locally and execute the end-to-end tests against a headless Chrome.

    OR

- Download BrowserStack [binary](https://www.browserstack.com/local-testing) set `BASEURL` to your local application address, and run `./gradlew remoteChrome`

Note, e2e functional testing requires Java 10+.

#### Run tests against remote application:

1. Determine the URL at which the application is running.
1. Update the baseurl to the URL from step 1:
    - Either modify the GebConfig.groovy baseUrl directly.
    - Or set a `BASEURL` environment variable
1. See `functional-tests/readme.md` for how to execute the tests.

See the [BDDStack Wiki](https://github.com/BCDevOps/BDDStack/wiki) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Architecture

BCMI is built using TypeScript and Angular for the front end, with Jest for testing. It employs PostgreSQL for database management and Node.js for the server, alongside Bootstrap and jQuery for design and interactivity. GraphQL facilitates data querying, while Strapi acts as the headless CMS.

Our production and staging environments run on an OpenShift container platform cluster. OpenShift templates for services are located in the `openshift/` folder, along with more information about dev and staging environments on our cluster.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to Contribute

Feel free to create pull requests from the default "master" branch, click here to create one automatically: https://github.com/bcgov/mem-mmti-public/pull/new/master

### Contributing

Government employees, the public and members of the private sector are encouraged to contribute. Check the [BC Developer Exchange website](https://bcdevexchange.org/), where paid opportunities to build features are posted. Please read and follow our [Code of Conduct](https://github.com/bcgov/gwells/blob/master/CODE_OF_CONDUCT.md). 

All contributors retain original copyright, but are granting a world-wide, royalty-free, perpetual, irrevocable, non-exclusive, transferable license to all users. This project is covered by an [Apache v2.0 license](https://github.com/bcgov/gwells/blob/master/LICENSE).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Code released under the [Apache License, Version 2.0](https://github.com/bcgov/gwells/blob/master/LICENSE).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Additional Documentation

More documentation for the repository can be found in the following places

- [Frontend](/bcmi/README.md)
- [Strappi](/cms/README.md)
- [OpenShift](/openshift/README.md)
- [Tests](/functional-tests/readme.md)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
