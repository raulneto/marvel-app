This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Marvel App 

Simple App to scroll through all the comics provided from Marvel developer API https://developer.marvel.com/.

## Project Setup

```
yarn
```
or
```
npm i
```

Set your api keys `MARVEL_PUBLIC_KEY` and `MARVEL_PRIVATE_KEY` into `src/app.config.json` file

```
npm run start
```

## Run tests

```
npm run test
```

## Features

* Retrieving and list all the comics caching every request;
* Pagination;
* Search comics by Character;
* Upvoting favourites comics. The favourites comics are been storage in localStorage;


## Development

* [React Query](https://react-query.tanstack.com/) - Library for fetch and caching data. This is a powerful and simple library that allows work with data synchronization providing all of the options needed;


---
⌨️ By [Raul Neto](https://github.com/raulneto/) 😊
