# NEMP-Starter-Kit
Simple Node Express Mongoose Passport starter kit.

## Installation
1. Clone this Repo `git clone https://github.com/garnetlabsnyc/nemp-starter-kit <your-project-name>`
2. `yarn install` or `npm -i`
3. Have Fun!

## Features

- **Default Express Configuration** - Basic implementation of express complete with body/cookie parsing, logging, and MongoDB connections via Mongoose
- **Default Mongoose Configuration** - Implemented via Environment Vairables.
- **Default Passport configuration** - Login and Register has been implemented and tested working. Client is delivered a JWT to authenticate against the app.

## Supplied Routes

### POST User-Register(post)
**localhost:3001/users/register**

Registers a user for the application.

Required Data:
```
{ 
  firstName: 'first name of the user',
  lastName: 'last name of the user',
  emailAddress: 'email Address of the user', //validated, unique 
  password: 'password of the user', //validated 
  password2: 'confirm password for the user' //validated 
}
```


### POST Users-Login(post)
**localhost:3001/users/login**

Logs in a user to the applicaton. This essentially passes a JWT back to the user that represents the user's authorization to the rest of the application.

Required Data:
```
{ 
  emailAddress: 'string for the email address.', //validated 
  password: 'clear text string for the password' //validated 
}
```


## Configuartion

1. **PORT**=Port this app will listen on.
2. **DB_PORT**=Port for MongoDB instance
3. **DB_URL**=URL for MongoDB instance
4. **DB_COLLECTION**= collection for MongoDB
5. **SECRET**= secret for signing tokens with passport

Please ensure that there are entries in your .env file for each of these items.

There needs to be a `logs` folder created prior to running. 

## File Structure

Database models are defined in the Models folder. Express Routes are defined in the Routes folder. 
