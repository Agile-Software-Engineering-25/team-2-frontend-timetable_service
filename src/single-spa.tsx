import React from "react";
import singleSpaReact from "single-spa-react";
import * as ReactDOMClient from "react-dom/client";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary() {
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
