/* https://www.datocms.com/blog/how-to-generate-typescript-types-from-graphql */
import { request as graphqlRequest, Variables } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export function request<TDocument = any>(
  document: RequestDocument | TypedDocumentNode<TDocument, Variables>,
  variables?: Variables,
) {
  const headers = new Headers();

  headers.append(
    "Authorization",
    process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN as string,
  );

  return graphqlRequest<TDocument, Variables>(
    process.env.NEXT_PUBLIC_HYGRAPH_API_ENDPOINT as string,
    document,
    variables,
    headers,
  );
}
