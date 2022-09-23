if (typeof window !== "undefined") import("@webcomponents/custom-elements");

import React, { FunctionComponent } from "react";
import * as ReactDOM from "react-dom/client";
import reactToWebComponent from "react-to-webcomponent";
import shadow from "react-shadow";

export const PocComponent: React.FunctionComponent = () => (
  <h1>This is web component</h1>
);
PocComponent.displayName = "PocComponent";

export function registerPocComponentElement() {
  if (typeof window === "undefined") return;
  if (window.customElements.get("poc-component")) return;

  const WrappedComponent: FunctionComponent = () => (
    <shadow.span>
      <PocComponent />
    </shadow.span>
  );
  WrappedComponent.displayName = "WrappedComponent";
  WrappedComponent.propTypes = PocComponent.propTypes;

  const WebPocComponent = reactToWebComponent(
    WrappedComponent,
    React as never,
    ReactDOM as never
  );
  customElements.define("poc-component", WebPocComponent as never);
}
