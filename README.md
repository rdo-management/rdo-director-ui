# Environment setup

## Prerequisities

1. Install RDO Manager https://repos.fedorapeople.org/repos/openstack-m/docs/master/environments/virtual.html
2. install nodejs and npm ```sudo yum install nodejs``` (probably requires EPEL)
3. To compile and install native addons from npm you may also need to install build tools:
   ```yum install gcc-c++ make```


## Running the App

1. ```git clone https://github.com/jtomasek/tripleo_ui.git```
2. ```cd tripleo_ui```
3. Install dependencies ```npm install --dev```
4. Install Gulp globally ```sudo npm install -g gulp```
5. Serve the App ```gulp```
6. Navigate to ```http://<machine_hostname>:3000/```


## Tests

- ```npm test``` to run tests (alternatively run ```gulp jest```)
- ```npm run lint``` to run ESLint
- ```npm test && npm run lint``` to run Tests and ESLint
- ```gulp test``` to start watcher that runs tests everytime any js file changes
- ```npm run testdbg``` to debug tests (http://ttrmw.co.uk/code/debugging_jest_tests.html)

(Info on Linting setup here: https://medium.com/@dan_abramov/lint-like-it-s-2015-6987d44c5b48)


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
