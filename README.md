# Demo Credit

Demo Credit is a mobile lending app that has a wallet system for users. It is an
MVP product that enables crediting, debiting and transfering of funds to and
from the wallet. The app is built with Nodejs, Typescript and MySQL with a Knex
orm.

## Project Installation

To use the app, you will require Node.js runtime environment and mysql server
running on your machine Once these are made available then you caan follow the
steps below to run the app

- Clone the repo
- Run `npm install` or `yarn install` to install the packages
- Create a .env file and add the environmental variables. You can find an
  env.example to know which environmental variables are required.
- Run the `npm run db:migrate` or `yarn db:migrate` to run the database
  migration
- Once the migration is done then run `npm start` or `yarn start` to run the
  application

NB in dev mode the start `watch` script can be used. (Reference the package.json
for the scripts)

## Application Architecture

The App leverages several design patterns in creating an organized file
heirachy. First there a three main domains including

- auth
- user
- wallet

This domains in turn use the MVC patter in spliting the controllers, services
and models.

### Folders

app - which handles configurations pertaining to the app bin - includes the
startup scripts and application entry point. components - The domains of the
application config - configuration and enviroment setup for the application db -
database configuration and connection settings go here. The Base model also goes
her library - the middlewares, utilities and helper functions are kept in the
library types - since this is a typscript based applications, the type
definitions for variables, methods and classes are stored in the types folder

### Routes

The routes and definition can be found on the postman documentation page
https://documenter.getpostman.com/view/9605078/2s8ZDR7RLS

### Models

All models inherit from the `BaseModel` class which is build with the ORM. Hence
the models can have access to orm methods without having to repeat the logic in
every single Model class The User model defines the user and its properties
include

- firstname
- lastname
- email
- password

The Wallet models defines a user wallet and is related to the user by userId

- userId
- balance

The Transaction model holds the record of every transaction on a wallet

- userId
- walletId
- recipientId
- amount
- type
- status
- referenceId

### ER diagram

![ER](/src/assets/er-diagram.png)
