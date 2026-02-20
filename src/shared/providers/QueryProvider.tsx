"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error: any) => {
          const status = error?.response?.status;
          if (status === 401) return false;
          return failureCount < 1;
        },
      },
    },
  });
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = React.useState(() => makeClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  );
}
