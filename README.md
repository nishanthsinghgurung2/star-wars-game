# Star Wars Top Trumps

NOTE: 
* Please use node version 12(ideally) or greater as node supports flatMap in version 12 or higher. Otherwise some of the unit tests would break.
* I had to clone the swapi-graphQL repo and run it locally. The `https://graphql.org/swapi-graphql` server gave CORS error when used directly. This error can be fixed on the server side which i don't have access to. 

Steps to run swapi-graphQl server on local
* Open terminal and run the following command to clone swapi-graphql repo `git clone git@github.com:graphql/swapi-graphql.git` 
* cd into `swapi-graphql` directory and run `npm install`
* Next run `npm start` to start the swapi graphQL server. It should start listening at port 61451(http://localhost:61451).

Steps to run star wars game on local
* After cloning the repo, cd into `StarWarsGame` directory and run `yarn` command to install dependencies
* Go back to the other terminal where we had `StarWardsGame` directory and run `yarn start` to run the project.
* Go to `localhost:3000` on the browser to play the game.
* Run `yarn test` to run the unit test.



