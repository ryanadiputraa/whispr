# Whispr

Silent meet application backend service.

Built using NestJS and Socket.io for real time data stream.

ERD: https://dbdiagram.io/d/whispr-6579ec4956d8064ca0f8f208

## Installation

```bash
yarn install
```

## Development

- Start DB using docker compose:

```bash
docker-compose up -d
```

- Copy `.env.example` file into `.env.development` and adjust your env
- Start development server

```bash
yarn run start:dev
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
