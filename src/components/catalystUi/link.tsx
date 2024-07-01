/*
TODO: Update this component to use your client-side framework's link
component. We've provided examples of how to do this for Next.js,
Remix, and Inertia.js in the Catalyst documentation:

https://catalyst.tailwindui.com/docs#client-side-router-integration
*/

import * as Headless from "@headlessui/react";
import React from "react";
import { Link as ReactRouterDomLink, LinkProps } from "react-router-dom";

export const Link = React.forwardRef(function Link(
  props: { href: string | LinkProps["to"] } & Omit<LinkProps, "href">,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <ReactRouterDomLink
        {...props}
        to={props.href}
        ref={ref}
      ></ReactRouterDomLink>
    </Headless.DataInteractive>
  );
});
