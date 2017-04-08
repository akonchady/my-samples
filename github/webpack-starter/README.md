Modules added:
Empty folder
npm init // package.json generated
npm i -D webpack
npm i -g webpack
npm view webpack versions --json
npm i -D webpack@2.2.0

npm run dev
npm i -D css-loader // To load CSS
npm i -D style-loader // To get CSS into the page
npm i -D sass-loader node-sass webpack // To write SASS
npm i -D extract-text-webpack-plugin // For saving styles into a new file
npm i -D webpack-dev-server // Sets up localhost and hot reloading

React:
npm i -D react react-dom
create .babelrc
npm i -D babel-loader babel-core
npm i -D babel-preset-es2015 babel-preset-react

Hot Module Replacement (HMR):
Extract text plugin doesn't work with HMR. Hence using isProd flag.

