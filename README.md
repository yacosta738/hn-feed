# HnFeed

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Powerful, Extensible Dev Tools**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development client app
$ npm run start
# development server app
$ npm run start:server


# build the app
$ npm run build
```

## Docker

There is a `docker-compose.yml` file for starting MongoDB with Docker.

`$ docker-compose up`

After running, you can stop the Docker container with

`$ docker-compose down`

## Getting with Curl Posts

```bash
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3333/api/posts  
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3333/api/posts/:id 
    $ curl -H 'content-type: application/json' -v -X POST -d '{"objectID": "987655", "title": "title #1", "url": "https://www.blastkode.com", "author": "Yuniel Acosta", "createdAt": "2021-05-06T19:23:46.000Z"}' http://127.0.0.1:3333/api/posts 
    $ curl -H 'content-type: application/json' -v -X PUT -d '{"objectID": "987656", "title": "title #1", "url": "https://www.blastkode.com", "author": "Yuniel Acosta", "createdAt": "2021-05-06T19:23:46.000Z"}' http://127.0.0.1:3333/api/posts/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3333/api/posts/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3333/api/posts/remove/:id 
```

## Getting Pagination using limit and offset

```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3333/api/posts?limit=10
```

```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3333/api/posts?offset=10
```
