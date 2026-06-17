import {
  estimateMarkdownTokens,
  homepageLinkHeader,
  markdownForPathname,
} from "../src/agent-resources";

type PagesContext = {
  request: Request;
  env: {
    ASSETS: {
      fetch(request: Request): Promise<Response>;
    };
  };
};

const markdownAccepted = (request: Request) =>
  request.headers
    .get("accept")
    ?.split(",")
    .map((value) => value.trim().toLowerCase())
    .some((value) => value === "text/markdown" || value.startsWith("text/markdown;")) ?? false;

const isHomepage = (pathname: string) => pathname === "/" || pathname === "";

const htmlPaths = new Set(["/", "/index.html", "/card", "/card/", "/card/index.html"]);

export const onRequest = async ({ request, env }: PagesContext) => {
  const url = new URL(request.url);
  const markdown = markdownAccepted(request) ? markdownForPathname(url.pathname) : null;

  if (markdown) {
    return new Response(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Link": homepageLinkHeader,
        "Vary": "Accept",
        "x-markdown-tokens": String(estimateMarkdownTokens(markdown)),
      },
    });
  }

  const response = await env.ASSETS.fetch(request);
  const contentType = response.headers.get("content-type") ?? "";

  if (response.status === 200 && contentType.includes("text/html") && !htmlPaths.has(url.pathname)) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  }

  if (!isHomepage(url.pathname)) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("Link", homepageLinkHeader);
  headers.append("Vary", "Accept");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
