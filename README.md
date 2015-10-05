# Environment setup

## Prerequisities

1. Install RDO Manager https://repos.fedorapeople.org/repos/openstack-m/docs/master/environments/virtual.html
2. install nodejs and npm ```sudo yum install nodejs``` (probably requires EPEL)
3. To compile and install native addons from npm you may also need to install build tools:
   ```yum install gcc-c++ make```


## Running the App

1. ```git clone ssh://jtomasek@review.gerrithub.io:29418/rdo-management/rdo-director-ui```
2. ```cd rdo-director-ui```
3. Install Gulp globally ```sudo npm install -g gulp```
4. Install dependencies ```npm install```
5. Serve the App ```gulp```
6. Navigate to ```http://<machine_hostname>:3000/```

## NPM install troubleshooting

In case of errors during ```npm install```, remove node_modules dir and clean npm cache
```npm cache clean```. Then run ```npm install``` again.

Temporary:
reqwest has a temporary issue in latest version. Downgrade to 2.0.2 to work around ```npm install reqwest@2.0.2```.
(https://github.com/ded/reqwest/issues/204#issuecomment-145295384)


## Contributing

Use GerritHub for patches and reviews (http://docs.openstack.org/infra/manual/developers.html).

1. ```git clone ssh://jtomasek@review.gerrithub.io:29418/rdo-management/rdo-director-ui```
2. Install git-review ```sudo dnf install git-review```
3. Setup Gerrit by running ```git review -s```
4. Develop on feature-branch locally
5. run ```git review``` to push patch for review.
6. Review and merge patches on GerritHub: https://review.gerrithub.io/#/q/project:rdo-management/rdo-director-ui


## Tests

#### Single test run:

- ```npm test``` (alternatively run ```karma start --single-run```)
- ```npm run lint``` to run ESLint
- ```npm test && npm run lint``` to run Tests and ESLint

(Info on Linting setup here: https://medium.com/@dan_abramov/lint-like-it-s-2015-6987d44c5b48,
.eslintrc rules tweaks here: http://blog.javascripting.com/2015/09/07/fine-tuning-airbnbs-eslint-config/)

Style guide: https://github.com/airbnb/javascript

#### Tests during development:

By running ```gulp serve``` (or ```gulp``` as a shortcut), karma server is also started, and tests are run every time any .js file is saved. In case you want to explicitly run the tests, run ```gulp test-run```.

#### Debugging test

1. option:
  - use ```console.log``` in the test and see the output in karma server output
2. option:
  - install karma-chrome-launcher npm module ```npm install karma-chrome-launcher --save-dev```
  - replace/add 'Chrome' to browsers in ```karma.conf.js```
  - now Karma will launch Chrome to run the tests
  - use ```debugger;``` statement in test code to add breakpoints
  - in Karma Chrome window click 'debug' button and debug in chrome developer tools as usual
  - optionally you can use karma-jasmine-html-reporter for better test output (https://www.npmjs.com/package/karma-jasmine-html-reporter)
  - make sure you don't push those changes to ```karma.conf.js``` and ```package.json``` as part of your patch

## Make Undercloud API Services available when running app from laptop

UI requires the openstack API services to be publicly accessible. To mimic this use this guide:
https://wiki.openstack.org/wiki/Tuskar/Instack#Connecting_to_Undercloud_from_external_place_.28e.g._your_laptop.29


## Enable Keystone CORS (temporary solution)

https://ianunruh.com/2014/11/openstack-cors.html

keystone-paste.ini is at /usr/share/keystone/keystone-dist-paste.ini
on Undercloud VM

```systemctl restart openstack-keystone```


### Official CORS Support in progress

http://docs.openstack.org/developer/oslo.middleware/cors.html#configuration-for-oslo-config
http://specs.openstack.org/openstack/openstack-specs/specs/cors-support.html

Ironic: https://review.openstack.org/#/c/199769/
...


## Basic OpenStack API Usage

http://docs.openstack.org/api/quick-start/content/index.html#authenticate
