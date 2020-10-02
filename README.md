# Frontend Workshop

This is the subject of the frontend workshop for students of EPITA - SIGL 2021.

The aim of the workshop is to implement a user insterface (UI) for Arlaide.
To implement it, we will use:
- NodeJS: to be able to use dependencies (other developper's code)
- TypeScript: to have types and more safety while writting our code (compared to `JavaScript`)
- ReactJS: to manage DOM elements rendering and local component state
- XState: to manage the global state of our application
- Material UI: to enjoy nice UI components without writting a single line of CSS (yeay!)
- Webpack: to bundle all our source files into a single `JavaScript` file (that will be our production artifact)

We are doing only the user interface without any data persistency (for now...).

## Step 1: Configure your project

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

### IDE

We strongly encourage you to use [Visual Studio Code](https://code.visualstudio.com) for your frontend project.
It's totally free and open source (even written in TypeScript!).

You don't have to install any extra plugins for this workshop.

### Install project dependencies

Node projects are defined by 2 files:
- `package.json`: define properties of the projects and its dependencies
- `package-lock.json`: stores the exact version of each dependencies (always push it)

To install all necessary dependencies:
- Copy the `template` directory into your project
- Rename `template` by `frontend`
- Adapt `package.json` properties, by changing:
  - the name of the project proper to your group
  - the description proper to your group
  - the git url to your github's project
- Install dependencies using: `npm i` or `npm install` (both are exactly the same)

> Your dependencies are installed inside the `node_modules` folder.
> You never push this folder since it is very heavy. Instead you push your package-lock.json and package.json that tells you the exact version to download.

### Try out locally

Once you've install all dependencies, let's do a first test to see if everything works fine.

Run the command: `npm start`

After a short while, you should be able to see your page on: http://locahost:8000

You should see the template correctly.

## Step 2: Adapt your CD

Since we did quite some changes to our frontend, we want to make sure that we can still deploy in continuous.

We have a new player in town: our `JavaScript` bundle.

### Adapt your Dockerfile

In the previous version, we had only an `index.html` to expose via nginx.

All our fancy code with all dependencies will be compile in one `JavaScript` bundle.

So you only need to also expose this `JavaScript` file after you build your project.

To build our project, we need node in our base docker image. Then we need nginx to expose the static files generated from node.

You will use a nice feature of docker: [Multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/).

Here are the changes you need to do in your Dockerfile:
- Use `node:14-alpine` as your first base image. You can name this stage `build`
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

Once your app is running correctly, you can push your changes to `master`.

Make sure you see your app on your group address: https://groupeXX.arla-sigl.fr

## Step 3: Understand the template code

Sofar, you know:
- how to build your project
- how to start it locally
- how to deploy changes to production

In this step, we will describe where and how to use modules you have installed with node (via `npm i` or `npm install` command).

### Webpack

Webpack is here to help you prepare your artefact use in production.
It is use to `pack` your `web` application.

It's a node application that you run from your local machine, only use at developpment time. 

Its entrypoint is a `webapack.config.js` file (name by convention), and works with a system of plugins and loaders. 

- Loaders are extra packages that enables helps webpack to `compile` some extra languages that you may use in your project. This template is using `ts-loader` to compile our `TypeScript` files to `JavaScript` files that your browser can understand.
- Plugins are various tools to extend webapck. This template is using 2 plugins:
  - `CleanWebpackPlugin` to remove all build files before building files
  - `HtmlWebpackPlugin` to create/modify the `index.html` file with the `JavaScript` code built

`Webpack` comes with 2 other modules: `webpack-cli` and `webpack-dev-server`. They are here to make the developpment experience better.

When you run `npm start`, you are starting `webpack-dev-server`which will:
- build your code with `webpack`
- emulate a web server (like `nginx` or `traefik`)
- expose your code built on `localhost:8080`
- refresh the code built on every changes saved while developping (called "hot reload")

> We are using webpack when you are running `npm start` and `npm run build` commands


### TypeScript

To make it simple, it's like `JavaScript` but with type safety.

Downside is that it complexify a bit our build.

> Feel free to read more about TypeScript on their documentation: https://www.typescriptlang.org

Upside is that we already configured the build for you.

> Template is using `ts-loader` module with `webpack`

### ReactJS

This is the notorious framework of Facebook. 

In short, this library manage for you the rendering cycle of your DOM elements.

This really helps performance of your frontend. following a very simple pattern.

You create components, representing a part of your DOM tree.
You render those components, meaning you create the HTML elements, using `react-dom`

> Note: We had to install @types/react and @types/react-node to add TypeScript support.

### React DOM

To use React DOM in your project, nothing easier:

```ts
// inside your src/app.tsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello React!</h1>,
  document.getElementById("app")
);
```
> Note: all files that imports `react` must end with .tsx extension. This is needed both for webpack
> to know it's a typescript file with React and your IDE to load correct syntax.

Where in your `index.html`, you would have:
```html
<html>
 <head>...</head>
 <body>
  <div id="app"></div>
  <script src="app.js"></script>
 </body>
</html>
```

You can consider `react-dom` as your layer of integration between the "real" DOM and your React code.

For the template provided, `HtmlWebpackPlugin` is injecting `scripts` for us. This make sure there is no typo or unintended mistakes while integrating react code to the html.

### React components

React components are the core of React.

There are many different ways to write a React component:
- using `class`
- using `fonction`
- using `=>` ("arrow") with `const` (the way it is in template)

Here is how a component looks like:

```tsx
import React from 'react';

type ColoredParagraphProps = {
  color: string;
} 

export const ColoredParagraph: React.FC<ColoredParagraphProps> = ({color, children}) => { 
  return (
    <p style={{color}}>{props.children}</p>
  )
}
```

And you can use it like:

```tsx
// inside you src/app.ts file
import React from 'react';
import ReactDOM from 'react-dom';
import {ColoredParagraph} from './ColoredParagraph';


ReactDOM.render(
  <ColoredParagraph color="green">Hello React!</ColoredParagraph>,
  document.getElementById("app")
);

```

Conceptually, a React component is a `function` that takes properties (often called `props`) as parameter and return an HTML part. More precisely, it returns a React element which will be render as an HTML element when displayed.

> IMPORTANT: You can The HTML-like notation inside your code ONLY if you import React in the file. By convention, all files that contains react code ends with `.tsx`.

In the template, the react app is included in the `src/app.tsx` file:

```tsx
// inside src/app.tsx
import React from 'react';
import ReactDOM from 'react-dom';
// ...

ReactDOM.render(
  //...
      <TemplateLayout>
        <TemplateNavigation />
        <TemplateContent />
      </TemplateLayout>
  //...
  ,
  document.getElementsById("app")
)

```

We almost always have:
- A Layout component, disposing differents visual elements in a certain way
- A Navigation component, when we to switch screens based on some menu or icons in the main layout
- The Content of the app, basically everything else, depending on which navigation item the user is on. 

### React component local state

Often, you may need to use a local state on your React component. For example, the `TemplatePaper` component is using `React.useState(...)` api.

When user clicks on the paper, the color of the text is switching back and forth.

Since it's a behaviour that concerns only this component, it uses `React.useState`.
You can see more about this hook on react documentation: https://reactjs.org/docs/hooks-state.html

> If you worked with react, but without using hooks, we recommend this reading: https://reactjs.org/docs/hooks-intro.html


### Material UI

MaterialUI is a UI framework that provides lots of already designed html component.

Fortunately, it is written in TypeScript and intergrates perfectly to React.

Documentation and components can be found here: https://material-ui.com/getting-started/usage/

> Note: you already have it installed on your project at this point.

#### Customize your Theme

We provided you necessary boilerplate code to use a custom theme.

You can configure your theme by modifiying the file `src/theme/index.ts` file.

See all possible configurations here: https://material-ui.com/customization/theming/


#### Layout 

Template is using `Grid` layout describe here: https://material-ui.com/components/grid/

You can see how we implemented it in the template: src/components/Layout.tsx


#### Component customization

TemplatePaper is using custom styles, using the `makeStyles` and `createStyles` to create a `TemplatePaper`: src/components/TemplatePaper.tsx

`makeStyles` brings your UI theme object if you wish to reuse some template colors, dimensions or any other theme settings.

`createStyles` is creating your CSS code. You should have completion to know which css options you can use. 


### XState

Documentation: https://xstate.js.org/docs/about/concepts.html#finite-state-machines

This is the implementation of our state machine, in its pure sense.

> Other libraries like Redux or MobX are equivalent solution. Redux being the most popular.

We chosed XState, because we believe it is easier to understand and it propose a very elegant way of handling your UI's state.

> You can read about the concepts of `XState` here: https://xstate.js.org/docs/about/concepts.html

`Xstate` part of the project is living inside the `src/state` folder.

Inside, template is providing:
- `src/state/actions.ts`: where you define actions like changing value of your machine context.
- `src/state/machine.tsx`: where you configure your state machine
- `src/state/provider.tsx`: Higher-order component that makes the use of your machine inside your component simpler to use.

#### Machine configuration

The template machine is simple:
- There is 2 possible app screens, so 2 state in the machine:
  - View 1: displaying the view 1
  - View 2: displaying the view 2
- The initial state is on View 1
- There are 3 events:
  - 2 to transit from one view to another: `toView1` and `toView2`
  - 1 to update the `count` variable in the context
- There is one action: `assignNewCount`
  - This action is responsible of modifiying the machine's context value `count`
  - This action is triggered only by the `updateCount` event

We use enumeration (`enum`) to avoid typos mistakes in names of events, actions and states. Since you will use them in different part in the code.

To know more about 
  - states: 
  - transitions: 
  - actions: 
  - context (inc. assign actions): 

This configuration will evolve with the number of screens you need to implement, and the context adaptions you may do.

#### Using the machine inside a component

You may need to use the state machine inside React components.
This is the case for the component in the second view: `TemplateView2` in src/components/TemplateView2.tsx

The important lines are:
```tsx
  // 1. 
  const {machine, send} = React.useContext(TemplateMachineContext);
  // 2.
  const {count} = machine.context;
  // 3. 
  send({type: TemplateEvents.udpateCount, newCount: count + 1})
```

1. This line enable us to use the state `machine` that is created by the `TemplateMachineProvider`. You can see it as using a singleton of your machine thanks to `React.useContext` api.

2. This line reads the machine context, and it extracts only the `count` value (for later, you might have other values in your context)

3. `send` is sending an `Event` to your `machine`. This code is sending a new `updateCount` event with the count value incremented by one.
This will then trigger the action `assignNewCount` inside the src/state/actions.ts file, thanks to this statement in your `machine` configuration (src/state/machine.tsx):
```tsx
//...
        [TemplateEvents.udpateCount]: {
          actions: [TemplateActions.updateCount],
        },
//...
```

To recap, to update the count in the global state of your UI:
- you need to read the context value
- send the event to update the count
- have your machine configured to trigger the correct action when the update count event is send
- have an assign action modifiying the context's count value. here `assignNewCount`

## Step 4: Build your screens

Now that you understood template code, you can adapt the code to your project.

What we would like you to do:
- Implement your MVP's screen where you display "help requests" from other users
- Implement your MVP's screen where you offer the user to add his request
> You can of course reinvent your screens, you don't have to stick to your first ideas
- Customize a bit your theme to have your own colors and identity

Just hard code false requests to have a view of your UI with some content. 

Feel free to rename components and files using the `rename` function from Visual Studio Code or any other IDE.
