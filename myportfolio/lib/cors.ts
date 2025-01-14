// lib/cors.ts
export const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

/**
 * Handle CORS Preflight (OPTIONS request)
 */
export function handleOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
