if (typeof window !== "undefined") import("@webcomponents/custom-elements");
import { paramCase } from "param-case";
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import reactToWebComponent from "react-to-webcomponent";
import shadow from "react-shadow";

export function defineCustomElement<P>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.FunctionComponent<P>,
  propertyOptions?: Record<
    keyof P,
    | ArrayConstructor
    | BooleanConstructor
    | FunctionConstructor
    | NumberConstructor
    | ObjectConstructor
    | StringConstructor
    | "ref"
  >,
) {
  if (typeof window === "undefined") return;
  const componentName = paramCase(Component.displayName ?? "");
  if (window.customElements.get(componentName)) return;

  const WrappedComponent: React.FunctionComponent<P> = props => (
    <shadow.span>
      <Component {...props} />
    </shadow.span>
  );
  WrappedComponent.displayName = "WrappedComponent";
  WrappedComponent.propTypes = Component.propTypes;
  const WebComponent = reactToWebComponent(
    WrappedComponent,
    React,
    ReactDOMClient,
    {
      props: {
        ...propertyOptions,
      },
    },
  );
  window.customElements.define(componentName, WebComponent as never);
}
