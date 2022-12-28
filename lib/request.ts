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
    process.env.DATOCMS_FULL_ACCESS_API_TOKEN as string,
  );

  return graphqlRequest<TDocument, Variables>(
    "https://graphql.datocms.com/",
    document,
    variables,
    headers,
  );
}
