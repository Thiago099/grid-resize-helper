## Description

This library allows you to drag on the configured edges of a grid layout to resize it

**Live Demo**: https://thiago099.github.io/grid-resize-helper-example/

**Source**: https://github.com/Thiago099/grid-resize-helper-example/

## Limitations

You must specify the areas of your grid you want to make resizable and your grid must have a gap in order for it to work

## Usage:

```js
   import { makeGridAreasResizable } from "grid-resize-helper"

    let gridElement = document.querySelector('.container');

    makeGridAreasResizable(gridElement, [
        { 
            query: ".menu", // This element will be used to create the helper, it will only be as wide as the element
            helpers: [
                { 
                    position: "x+", // This is where on the element the helper will be
                    edge: 0 // This is wich edge of your grid the in the respective axis of the position
                },
            ]
        },
        {
            query: ".right",
            helpers: [
                {
                    position: "x-",
                    edge: 1
                },
            ]
        },
        {
            query: ".header",
            helpers: [
                {
                    position: "y+",
                    edge: 0
                },
            ]
        },
        {
            query: ".footer",
            helpers: [
                {
                    position: "y-",
                    edge: 1
                },
            ]
        }
    ])
```

Here is the html for the example:

```html
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div class="container">
      <div class="menu">
      </div>
      <div class="header">
      </div>
      <div class="main">
      </div>
      <div class="footer">
      </div>
      <div class="right">
      </div>
  </div>
  
  <style>
      body {
          margin: 0;
      }
  
      .container {
          display: grid;
          grid-template-areas:
              'header header header'
              'menu main right'
              'menu footer right';
          grid-template-columns: 1fr 3fr 1fr;
          grid-template-rows: 50px 4fr 2fr;
          gap: 10px;
          background-color: #2196F3;
          height: 100vh;
          width: 100vw;
          padding: 5px;
          box-sizing: border-box;
      }
  
      .container > div {
          background-color: rgba(255, 255, 255, 0.8);
      }
  
      .menu {
          grid-area: menu;
      }
  
      .main {
          grid-area: main;
      }
  
      .right {
          grid-area: right;
      }
  
      .footer {
          grid-area: footer;
      }
  
      .header {
          grid-area: header;
      }
  </style>
```
