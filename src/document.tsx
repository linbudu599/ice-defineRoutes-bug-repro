import * as React from "react";
import {
  Meta,
  Title,
  Links,
  Main,
  Scripts,
} from "ice";

export default function Document() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={
            "ICECream MVP Site Description(Configurated)"
          }
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>
          {"ICECream MVP Site(Configurated)"}
        </title>
        <Links />
      </head>
      <body>
        <Main />
        <Scripts />
      </body>
    </html>
  );
}
