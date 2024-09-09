# React App

This is a single-page application project template using React and yarn. Run the following commands to get started.

```sh
cd react-app
yarn install
```

The `yarn install` command will automatically install the required dependencies. To start the dev server from the react-app directory, run:

```sh
yarn start
```

Then open http://localhost:3000 with your browser to see the result.

This bundles `src/index.tsx` and starts a development server that serves from the `public` and `build` directories. When the incoming request to `localhost:3000/` comes in, the following exchange occurs:

- The yarn server returns `public/index.html`.
- The browser renders this HTML, which contains a `script` tags with `src="/index.js"`. The browser requests this file.
- The server checks for this file, first in `public` (no match) then in `build`. It finds `build/index.js` and returns it to the browser.
- This file renders the React component in `src/App.tsx` inside the `div#root` element. The app is now ready to accept user input.

Start building your app by editing `src/App.tsx`.

# biov-frontend

The default credentials for non-admin users are:
username: [a,b,c]
password: [a,b,c]

The default credentials for admin users are:
username: [d,e,f]
password: [d,e,f]
