# TSC-UI

![Logo](./assets/demo/tsc-ui-logo.png)

TSC UI is tool to monitor in realtime your typescript project quality.

It is based on the original tsc compiler and uses it in the background in watch mode to
collect issues and return back to the console.

## Installation

For local install: `npm install tsc-ui`  or `yarn add tsc-ui`

For global install: `npm install -g tsc-ui` or `yarn global add tsc-ui`

**Note**: you should have `typescript` as dependency or have it installed globally, 
as `tsc-ui` requires it as peer dependency.

## Usage

Run `tsc-ui` in terminal in the typescript project directory.  

### Diagnostics page

In this page you could find current problems in your codebase.

Bonus features:

- you could click on the file path and it will open it in VSCode
- you could click on the error code to find it's explanation in Google

![Diagnostics](./assets/demo/diagnostics.png)


### Project Status page

In this page you could get your overall project analytics

![Status](./assets/demo/status.png)


## Configuration

By default, `./tsconfig.json` is used and port `3000` is taken for `tsc-ui-dashboard`.

You could override the tsconfig path and port of the dashboard service:

`--config=../../tsconfig.dev.json --port=4242`
