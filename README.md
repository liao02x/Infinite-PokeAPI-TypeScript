# Infinite-PokeAPI-TypeScript showcase

This project demonstrates an implementation of an infinite scroll list of Pokémon using TypeScript and the [PokeAPI](https://pokeapi.co/). The goal is to build the infinite scroll mechanism from scratch and paginate the API requests.

## Features

- Implement infinite scroll from scratch
- Paginate API requests
- Load more Pokémon as the user scrolls to the bottom of the list
- Utilize custom hooks for better code organization

## PokeAPI

Retrieve Pokémon list data from https://pokeapi.co/api/v2/pokemon. Implement pagination by adding the `limit` and `offset` query parameters to the API call.

## Getting Started

To set up the app locally, run the following commands:

```shell
$ yarn install
$ yarn dev
```

Open http://localhost:3000 to view the project in the browser.

## Project Structure

This project was bootstrapped with [Vite](https://vitejs.dev/), a build tool and development server for lightning-fast development and optimized production builds.

`hooks.ts` contains the custom hooks for supporting the infinite scroll feature with support from Intersection Observer Web API. The list component is using InfiniteScrollList component and uses the `useInfiniteLoading` hook.

The Intersection Observer Web API has 96%+ support in modern browsers according to caniuse.com. If we are targeting older browsers, we can use a polyfill.

