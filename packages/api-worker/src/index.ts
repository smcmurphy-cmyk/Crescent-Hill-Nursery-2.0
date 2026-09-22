export interface Env {
  CMS_CACHE: KVNamespace;
  WEBHOOK_SECRET: string;
}

// Helper for CORS headers so your React frontend can read the data
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Webhook Route: Receives pushed data from Google Sheets
    if (request.method === "POST" && url.pathname === "/webhook/update") {
      const authHeader = request.headers.get("Authorization");
      if (authHeader !== `Bearer ${env.WEBHOOK_SECRET}`) {
        return new Response("Unauthorized", { status: 401, headers: corsHeaders });
      }

      try {
        const body = await request.json() as any;
        
        // Write the incoming data to KV Cache
        await env.CMS_CACHE.put("plant_catalog", JSON.stringify(body.plants));
        
        // If you have a designs tab, uncomment this later:
        // await env.CMS_CACHE.put("portfolio_designs", JSON.stringify(body.designs));

        return new Response(JSON.stringify({ success: true, message: "Cache updated" }), { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      } catch (error) {
        return new Response("Bad Request", { status: 400, headers: corsHeaders });
      }
    }

    // Public API Route: Serves cached data to the React frontend
    if (request.method === "GET" && url.pathname === "/api/plants") {
      const cachedData = await env.CMS_CACHE.get("plant_catalog");
      
      if (!cachedData) {
        return new Response(JSON.stringify({ error: "Cache empty" }), { 
          status: 404, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      return new Response(cachedData, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          // Forces browsers to cache the response for 5 minutes to save KV reads
          "Cache-Control": "public, max-age=300" 
        }
      });
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  }
};