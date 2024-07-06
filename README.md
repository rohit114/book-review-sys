<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

### Introduction
* The Book Review System API allows users to add books, create, edit, and delete review. Users can sign up for an account, log in to obtain an access token, and use this token to authenticate their requests. Unauthorized access attempts will result in a 403 Forbidden response.

* To access protected endpoints, users must include their access token in the request headers under the Authorization field. Without a valid access token, users will not be able to perform actions on the system.

* This system has GraphQL based queries where a user can get his written reviews, others reviews,
add books, search books by author and title

* The API returns standard HTTP status codes to indicate the success or failure of requests. Error responses include detailed messages to assist developers in troubleshooting issues.

### Tech stck used:
* NodeJs V16.0.0+
* TypeScript V5.4.5+
* NestJs V10.3.2+
* PostgreSQL V14.1.0+
* Prisma V5.16.1
* Apollo 12.2.0

### Setting up project:
$ clone the repo: https://github.com/rohit114/book-review-sys.git
$ cd book-review-sys
$ npm install
$ add these variable in .env file JWT_SECRET_KEY = "xxxxxxDATABASE_URL = "postgresql://postgres@localhost:5432/book_review"
$ prisma migrate dev --name init
$ npm start


## Stay in touch
- email me at rohitkumardas114@gmail.com for support or reporting any issues
- Linkedin - [Rohit Kumar](https://www.linkedin.com/in/rohit-kumar-das/)
