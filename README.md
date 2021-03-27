# Deno+React Dynamic Script loading example

## Requirements

* Deno version: ^1.7.0
* Adds `~/.deno/bin` path to your system or user's `PATH` environment variable
```shell
# for *nix and MacOS
export PATH="${PATH};~/.deno/bin"

# for Windows
set PATH=%PATH%:%HOME%\.deno\bin
```
* Needs [denon](https://github.com/denosaurs/denon) for debugging/live reloading

## How to start

* npm
```shell
npm run build
npm start
```

* yarn
```shell
yarn run build
yarn start
```

* denon (version ^2.4)
```shell
denon start
```

## Setting ENV

Go to http://localhost:3000/?env={env} - where env is `(dev|prd)`. The app should dynamically load one of the scripts in `public/assets/js`

