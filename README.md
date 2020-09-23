# Frontend Workshop

This is the subject of the frontend workshop for students of EPITA - SIGL 2021.

The aim of the workshop is to implement a user insterface (UI) for Arlaide.
To implement it, we will use:
- NodeJS: to be able to use dependencies (other developper's code)
- TypeScript: to have types and more safety while writting our code (compared to JavaScript)
- ReactJS: to manage DOM elements rendering 
- XState: to manage the state of our application
- Material UI: to enjoy nice UI components without writting a single line of CSS (yeay!)
- Parcel: to bundle all our source files into a single javascript file (that will be our production artifact)

We are doing only the user interface without any data persistency (for now...).

## Step 1: Configure NodeJS in your project

### Requirements on your local machine

You need to install on your local machine Node.

Because NodeJS is a tool that evolves fast and has multiple versions, we will use a versionning tool to help us using multiple versions, depending on the project we're working on: [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager)

To install `nvm`, follow instructions in the README of the project: https://github.com/nvm-sh/nvm#installing-and-updating

Once `nvm` is install:
- Create a file `.nvmrc` with `v14` inside
- Install node v14 using `nvm`: `nvm install v14`

Then, everytime you work on your project, you can type `nvm use` command, and it will switch you to the version inside the `.nvmrc` file.

> Note: It may looks like overhead to use this tool for our context, but in companies you often have
> many frontend projects with different versions of node, and using `nvm` really helps.

You can verify if everything is fine by checking node version: `node -v`

### Install project dependencies

Node projects are defined by 2 files:
- `package.json`: define properties of the projects and its dependencies
- `package-lock.json`: stores the exact version of each dependencies (always push it)

To install all necessary dependencies:
- Copy the package.json file from this project into your project.
- Adapt package.json properties, by changing:
  - the name of the project proper to your group
  - the description proper to your group
  - the git url to your github's project
- Install dependencies using: `npm i` or `npm install` (both are exactly the same)

### Try out locally

Once you've install all dependencies, let's do a first test to see if everything works fine.

Take all files from `src/example` and add it under `src/` directory in your project.

Then, just run the command: `npm start`

After a short while, you should be able to see your page on: http://locahost:8000

## Step 2: Adapt your CD

Since we did quite some changes to our frontend, we want to make sure that we can still deploy in continuous.

We have a new player in town: our JavaScript bundle.

### Adapt your Dockerfile

In the previous version, we had only an `index.html` to expose via nginx.

All our fancy code with all dependencies will be compile in one javascript bundle.

So you only need to also expose this JavaScript file after you build your project.

To build our project, we need node in our base docker image. Then we need nginx to expose the static files generated from node.

You will use a nice feature of docker: [Multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/).

Here are the changes you need to do in your Dockerfile:
- Use node:14-alpine as your first base image. You can name this stage `build`
- copy your src folder in your image. You can put it under `/code/src`
- install node dependencies using the same command you've type on your local machine
- build your static files by runnin `npm run build`
- Use nginx:stable as your second base image.
- copy your files of the `dist/` folder of your previous stage to the /usr/share/nginx/html/ folder.

Test your image on your local machine:
```shell
# build your image
docker build -t arlaide-frontend:v1 .
# run it by publishing ports on 8000
docker run -p 8000:80 arlaide-frontend:v1
# You should be able to see your page on http://localhost:8000
```

### Deploy your changes

Once your app is running correctly, you can push your changes to master.

Make sure you see your app on your group address: http://groupeXX.arla-sigl.fr

## Step 3: Code your screen

Sofar, you know:
- how to build your project
- how to start it locally
- how to deploy changes to production

In this step, we will describe where to use each library you have installed with node.

### Parcel
### TypeScript

To make it simple, it's like JavaScript but with type safety.

Downside is that it complexify a bit our build.

> Feel free to read more about TypeScript on their documentation: https://www.typescriptlang.org

Upside is that we already configured the build for you.

### ReactJS

This is the famous framework of Facebook. 

Far in front on npm trends when you compare it with equivalents: https://www.npmtrends.com/react-vs-vue-vs-@angular/core-vs-ember-source

In short, this library manage for you the rendering cycle of your DOM elements.

This really helps performance of your frontend. following a very simple pattern.

You create components, representing a part of your DOM tree.
You render those components, meaning you create the HTML elements, using `react-dom`

### React DOM

To use React DOM in your project, nothing easier:

```ts
// inside your src/app.ts
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello React!</h1>,
  document.getElementById("app")
);
```

Where in your index.html, you would have:
```
<html>
 <head>...</head>
 <body>
  <div id="app"></div>
  <script src="app.js"></script>
 </body>
</html>
```

You can consider `react-dom` as your layer of  integration between the "real" DOM and your React code.

### React components

React components are the core of React.

Here is how a component looks like:
```ts
import React from 'react';

type ColoredParagraphProps = {
  color: string;
} 

export const ColoredParagraph: React.FC<ColoredParagraphProps> = ({color, children}) => <p style={{color}}>{props.children}</p>

```

And you can use it like:

```ts
// inside you src/app.ts file
import React from 'react';
import ReactDOM from 'react-dom';
import {ColoredParagraph} from './ColoredParagraph';


ReactDOM.render(
  <ColoredParagraph color="green">Hello React!</ColoredParagraph>,
  document.getElementById("app")
);

```

This was a dull example, in real world, we have something like:

```
// inside src/app.ts
import React from 'react';
import ReactDOM from 'react-dom';
import {Navigation, SideMenu, Content} from './components';

const App: React.FC = () => (
  <Layout>
    <Navigation>
      <Content />
    </Navigation>
  </Layout>
);

ReactDOM.render(
  App,
  document.getElementsById("app")
)

```

We almost always have:
- A Layout component, disposing differents visual elements in a certain way
- A Navigation component, when we to switch screens based on some menu or icons in the main layout
- The Content of the app, basically everything else, depending on which navigation item the user is on. 

### XState

This is the implementation of our state machine, in its pure sense.

Other libraries like Redux or MobX are equivalent solution. Redux being the most popular.

We chosed XState, because we believe it is easier to understand and it propose a very elegant way of handling your frontend's state.

### Material UI

 



