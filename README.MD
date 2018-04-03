# NG-HOUSE

NG-House is a sample real-estate web application, allowing its user doing tasks such as:
* viewing all current housing offers
* searching offers by criteria
* bookmarking housing offer
* creating and editing owned housing offer
* contact the owner of the offer
* authentication via username and password

## Demo

Have a look at the [sample app](https://nghouse.viewdns.net/) running on a Rpi.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* NodeJS & NPM
* MySQL

### Installing

Install the dependencies

```
npm install
```
Set up mySQL for the application

```
npm setup
```

```
Do you want to clean all entries in these tables ? [y/n]: 
```
Choose yes

```
Do you want to re-create all the views ? [y/n]:  
```
Choose yes

Result

```
Do you want to clean all entries in these tables ? [y/n]: y
Creating tables.
Tables successfully created.
Inserting default values
Tables successfully inserted.
Do you want to re-create all the views ? [y/n]: y
Creating views.
View created.
Setup finished.
```
An .env file is created with the similar result as this:
```
NODE_ENV = development_environment
DB_HOST = database_host
DB_USER = user
DB_PASSWORD = password
DB_TEST = development_database
DB_PRODUCTION = production_database
DB_POOL_LIMIT = 100
```
## Start the server

```
npm start
```

## Running the tests

Install Mocha

```
npm install -g mocha
```
Run the test

```
npm test
```

## Deployment

* Use nodemon automatically restart the app
* Use pm2 to automatically start the app on machine start

## Authors

* **Hoang Son Nguyen**

See also the list of [contributors](https://github.com/eragonwien/NG-House/graphs/contributors) who participated in this project.
