# BC Mine Information

## Maintenance Mode

### Usage

Caddy pods serving static html are deployed to our prod environment. To enable maintenance mode switch the routes between the mem-public and mem-proxy-caddy services.  A namespace (project) for deployment must be specified.

Expected namespaces:

* mem-mmt-prod

For the sake of simplicity all examples will use mem-mmt-prod and be run on OS X.

1. ##### Enable/Disable by Script

    Maintenance mode on.

    ```
    ./maintenance.sh mem-mmt-prod on
    ```

    Maintenance mode off.

    ```
    ./maintenance.sh mem-mmt-prod off
    ```

2. ##### Enable/Disable by Command line

    Maintenance mode on.

    ```
    oc patch route mmti-public-new -n mem-mmt-prod -p \
        '{ "spec": { "to": { "name": "proxy-caddy", "port": { "targetPort": "2015-tcp" }}}'
    oc patch route proxy-caddy -n mem-mmt-prod -p \
        '{ "spec": { "to": { "name": "mem-public" }, "port": { "targetPort": "8080-tcp" }}}'
    ```

    Maintenance mode off.

    ```
    oc patch route mmti-public-new -n mem-mmt-prod -p \
        '{ "spec": { "to": { "name": "mem-public" }, "port": { "targetPort": "8080-tcp" }}}'
    oc patch route proxy-caddy -n mem-mmt-prod -p \
        '{ "spec": { "to": { "name": "proxy-caddy" }, "port": { "targetPort": "2015-tcp" }}}'
    ```

3. ##### Enable/Disable by OpenShift GUI Console

    a. Navigate to [OpenShift Container Platform Console](https://console.pathfinder.gov.bc.ca:8443/console/)
    - [mem-mmt-test](https://console.pathfinder.gov.bc.ca:8443/console/project/mem-mmt-test/browse/routes)
    - [mem-mmt-prod](https://console.pathfinder.gov.bc.ca:8443/console/project/mem-mmt-prod/browse/routes)

    b. Edit the route pointing to the `mem-public` service to point to the `mem-proxy-caddy` service instead
    - [mem-mmt-prod](https://console.pathfinder.gov.bc.ca:8443/console/project/mem-mmt-prod/edit/routes/mmti-public-new)

    c. Confirm that the Maintenance screen is up
    - [mem-mmt-prod](http://mines.nrs.gov.bc.ca/)

    Maintenance mode off.

    a. Navigate to [OpenShift Container Platform Console](https://console.pathfinder.gov.bc.ca:8443/console/)
    - [mem-mmt-test](https://console.pathfinder.gov.bc.ca:8443/console/project/mem-mmt-test/browse/routes)
    - [mem-mmt-prod](https://console.pathfinder.gov.bc.ca:8443/console/project/mem-mmt-prod/browse/routes)

    b. Edit the route to point back to the original service (e.g. `mem-public`) instead of the `mem-proxy-caddy`
    - [mem-mmt-prod](https://console.pathfinder.gov.bc.ca:8443/console/project/mem-mmt-prod/edit/routes/mmti-public-new)

    c. Confirm that the Maintenance screen is up
    - [mem-mmt-test](http://mines.nrs.gov.bc.ca/)

### Build and Deployment

This application's template has been broken down into build and deploy components.

##### Build

Template:

* ../templates/caddy.bc.json

Contains:

* ImageStream
* BuildConfig

Default vars:

* NAME: proxy-caddy
* IMG_SRC: bcgov-s2i-caddy
* GIT_REPO: https://github.com/bcgov/mem-mmti-public.git
* GIT_BRANCH: dev

Build Project:

* mem-mmt-tools


1. ##### Build by Script

    ```
    ./maintenance.sh mem-mmt-tools build
    ```

2. ##### Build by Command line

    ```
    oc process -f ../templates/caddy.bc.json -p NAME=proxy-caddy \
      GIT_REPO=https://github.com/bcgov/mem-mmti-public.git GIT_BRANCH=dev \
      IMG_SRC=bcgov-s2i-caddy | oc apply -f -

    ```

##### Deploy

Template:

* ../templates/caddy.dc.json

Contains:

* DeploymentConfig
* Service

Default vars:

* NAME: mem-proxy-caddy
* BUILD_PROJECT: [specified namespace]

Build (Source) Project:

* [specified namespace]

Deploy Projects Available:

* mem-mmt-test
* mem-mmt-prod
* mem-mmt-dev


1. ##### Deploy by Script (must be built in the same namespace)

    ```
    ./maintenance.sh mem-mmt-prod deploy
    ```

2. ##### Deploy by Command line

    ```
    oc process -f ../templates/caddy.bc.json -n mem-mmt-prod -p NAME=proxy-caddy \
        BUILD_PROJECT=mem-mmt-prod | oc apply -f -
    oc expose svc proxy-caddy
    ```

##### Deploy from Tools

Template:

* ../templates/caddy.dc.json

Contains:

* DeploymentConfig
* Service

Default vars:

* NAME: mem-proxy-caddy
* BUILD_PROJECT: mem-mmti-tools

Build (Source) Project:

* mem-mmt-tools

Deploy Projects Available:

* mem-mmt-test
* mem-mmt-prod
* mem-mmt-dev


1. ##### Deploy by Script to Desired Namespace From Tools

    ```
    ./maintenance.sh mem-mmt-prod deploy-from-tools
    ```

2. ##### Deploy by Command line

    ```
    oc process -f ../openshift/templates/caddy.bc.json -n mem-mmt-prod -p NAME=mem-proxy-caddy \
        BUILD_PROJECT=mem-mmt-tools | oc apply -f -
    oc expose svc mem-proxy-caddy
    ```

### Initial Setup

Starting from scratch the above steps will be reordered (storing builds in tools namespace is best prctice):

1. Build in tools namespace (eg. mem-mmti-tools)
2. Deploy (deplly-from-tools) in desired namespace (eg. mem-mmti-prod)
3. Maintenance on
4. Maintenance off
