# TSC-UI

TSC UI is tool to monitor in realtime your typescript project quality.

It is based on the original tsc compiler and uses it in the background in watch mode to
collect issues and return back to the console.

## Diagnostics

In this page you could find current problems in your codebase.

You could click on the file path and it will open it in VSCode.

![Diagnostics](./assets/demo/diagnostics.png)


## Project Status

In this page you could get your overall project analytics

![Status](./assets/demo/status.png)

## Configuration

You could configure the project and port of the dashboard service:

`--config=../../tsconfig.dev.json --port=4242`
