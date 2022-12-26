"use client";

import { Auth0Provider } from "@auth0/auth0-react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
        domain={(process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string)}
        clientId={(process.env.NEXT_PUBLIC_AUTH0_CLIENTID as string)}
        redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};

export default Providers;
