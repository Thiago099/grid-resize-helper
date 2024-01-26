## Description

This library allows you to drag on the configured edges of a grid layout to resize it

**Live Demo**: https://thiago099.github.io/grid-resize-helper-example/

**Source**: https://github.com/Thiago099/grid-resize-helper-example/

## Limitations

You must specify the areas of your grid you want to make resizable and assign them to control a part of the grid

## Usage:

```js
   import { makeGridAreasResizable } from "grid-resize-helper"

    let gridElement = document.querySelector('.container');

    makeGridAreasResizable(gridElement, 
    /* Elements */ 
    [
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
    ],
    /*Config */ { 
        //debugBackgroundColor:"rgba(255,0,0,0.3)", // Make the helpers this color instead of invisible
        thickness:"15px" // This can either be auto (the size of the gap) or a value, relative values are relative to each section of the grid
        minWidth: 30, // minium width of a section in pixels
        minHeight: 30, // minimun height of a section in pixels
    })
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
