import {
  HttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { PropsWithChildren, useMemo } from "react";
import { useAuthSession } from "./AuthSessionContext";
import { ErrorLink } from "@apollo/client/link/error";

export default function ApolloWrapper({ children }: PropsWithChildren) {
  const { session, signOut } = useAuthSession();

  const httpLink = new HttpLink({ uri: "http://127.0.0.1:8080/graphql" });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: session ? `Bearer ${session}` : null,
      },
    }));
    return forward(operation);
  });

  const logoutMiddleware = new ErrorLink(({ result, operation }) => {
    if (!result || !result.errors) return;
    for (const err of result.errors) {
      if (err.extensions && err.extensions?.code === "UNAUTHORIZED_REQUEST") {
        operation.client.clearStore();
        signOut();
      }
    }
  });

  // Initialize Apollo Client
  const client = useMemo(
    () =>
      new ApolloClient({
        link: ApolloLink.from([logoutMiddleware, authMiddleware, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
      }),
    [session],
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
