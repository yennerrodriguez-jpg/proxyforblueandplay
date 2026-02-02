export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Base Google CSE origin
    const targetOrigin = "https://cse.google.com";

    // Rebuild target URL
    const targetUrl = targetOrigin + url.pathname + url.search;

    // Forward request
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        "User-Agent": "BlueSearch-Proxy",
        "Accept": "*/*"
      }
    });

    // Clone headers and fix CORS
    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "*");

    return new Response(response.body, {
      status: response.status,
      headers
    });
  }
};
