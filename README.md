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

* The API returns standard HTTP status codes to indicate the success or failure of requests. Error responses include detailed messages to assist developers in troubleshooting issues.APIs will throw bad request upon faling any input validations

### Tech stack used:
* NodeJs V16.0.0+
* TypeScript V5.4.5+
* NestJs V10.3.2+
* PostgreSQL V14.1.0+
* Prisma V5.16.1
* Apollo 12.2.0

### Setting up project:
```
1 clone the repo: https://github.com/rohit114/book-review-sys.git
2 cd book-review-sys
3 npm install
4 add these variable in .env file JWT_SECRET_KEY = "xxxxxxDATABASE_URL = "postgresql://postgres@localhost:5432/book_review"
5 prisma migrate dev --name init
6 npm start

```

### API Documentation:

1. Register User:
    * METHOD: `POST`
    * URL: `{{BASE_URL}}/apis/book-review-sys/v1/user/register`
    * BODY: `{"name":"Rohit","username":"rohit114","email":"rohitkumardas114@gmail.com","password":"ur_password"}`
    * api will return created user with user_id with status code 201

2. User Login to get the access-token:
    * METHOD: `POST`
    * URL: `{{BASE_URL}}/apis/book-review-sys/v1/user/login`
    * BODY: `{"email":"rohit@example.com", "password": "ur_password"}`
    * Api will return the `access_token`, use this token in request header `Authorization` for api calls

3. Add Book:
    * METHOD: `POST`
    * HEADER: Authorization
    * URL: `{{BASE_URL}}/apis/book-review-sys/v1/book/add`
    * BODY: `{"title":"Atomic Habits","author_id":1,"published_year":"2018-10-16"}`
    * Api will return newly added book

4. Add Review:
    * METHOD: `POST`
    * HEADER: Authorization
    * URL: `{{BASE_URL}}/apis/book-review-sys/v1/review/add`
    * BODY: `{"book_id":1,"rating":10,"comment":"awesome book"}`
    * Api will return newly added review

5. Update Review:
    * METHOD: `POST`
    * HEADER: Authorization
    * URL: `{{BASE_URL}}/apis/book-review-sys/v1/review/update`
    * BODY: `{"review_id":1,"rating":9,"comment":"must read, amazing book"}`
    * Api will return updated review or Forbidden for unauthorized user

5. Delete Review:
    * METHOD: `DELETE`
    * HEADER: Authorization
    * URL: `{{BASE_URL}}/apis/book-review-sys/v1/review/delete/1`
    * Api will return true on success or Forbidden for unauthorized user

6. GraphQL Search Queries:
    * METHOD: `POST`
    * HEADER: Authorization
    * URL: `{{BASE_URL}}/graphql`
    * BODY: `ur query`
      ### Get all books with pagination:
      ```
      { "query": "{ getBooks(offset: 3, limit: 8) { id title author { id username } publishedYear } }"}
      ```

      ### Get book by id
      ```
        "query": "{ getBookById(id: 1) { id title author { id username } publishedYear } }"
      ```

      ### Search book
      ```
        { "query": "{searchBooks(searchTerm: \"nodejs\") {id title author { id username } publishedYear}}" }
      ```

      ### Get all reviews with pagination:
      ```
        "query": "{ getReviews(offset: 0, limit: 10) { id rating, comment book {id, title, publishedYear } user {id, username}  } }"
      ```

      ### Get my reviews:
      ```
        "query": "{ getMyReviews(userId: 24, offset: 0, limit: 10) { id rating, comment book {id, title, publishedYear } user {id, username}  } }"
      ```


* You can find the all curl of the apis in the postman collection `book-review-sys.postman_collection.json` inside the book-review-sys repo

## Stay in touch
- email me at rohitkumardas114@gmail.com for support or reporting any issues
- Linkedin - [Rohit Kumar](https://www.linkedin.com/in/rohit-kumar-das/)
