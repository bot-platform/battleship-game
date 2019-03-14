# Battleship game with Phaser 3 and TypeScript

## Getting started

### Installing

```
npm install
```

### Building and Running

Perform a quick build (bundle.js) and start server:

```
npm run dev
```

### Usage example 1
```js
const game = new Battleship({
  server: 'ws://localhost:8080/io/games/15554',
  parent: document.querySelector('#game'),
});
battleship.run();
```

### Usage example 2
* Install package
```
npm install ... --save
```
* Import in your application

```ts
import {Battleship, Options} from "battleship";

const game = new Battleship(<Options>{
  server: 'ws://localhost:8080/io/games/15554',
  parent: document.querySelector('#game'),
});
```
