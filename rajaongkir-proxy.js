/**
 * Cloudflare Worker — RajaOngkir Proxy
 * 
 * Deploy file ini sebagai Worker terpisah di Cloudflare Dashboard.
 * Wajib set environment variable: RAJAONGKIR_KEY = API key kamu
 *
 * Endpoints yang di-expose:
 *   GET  /province          → list semua provinsi
 *   GET  /city?province=ID  → list kota per provinsi
 *   POST /cost              → hitung ongkir (body: { origin, destination, weight, courier })
 */

const RAJAONGKIR_BASE = 'https://api.rajaongkir.com/starter';

// Allowed origins — tambahkan domain deployment kamu
const ALLOWED_ORIGINS = [
    'https://dddclub.pages.dev',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
];

export default {
    async fetch(request, env) {
        const origin = request.headers.get('Origin') || '';
        const isAllowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));

        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders });
        }

        const url = new URL(request.url);
        const path = url.pathname;
        const apiKey = env.RAJAONGKIR_KEY;

        try {
            let roRes, roData;

            if (path === '/province' && request.method === 'GET') {
                roRes = await fetch(`${RAJAONGKIR_BASE}/province`, {
                    headers: { key: apiKey }
                });
                roData = await roRes.json();
                const provinces = roData.rajaongkir.results;
                return new Response(JSON.stringify(provinces), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });

            } else if (path === '/city' && request.method === 'GET') {
                const provinceId = url.searchParams.get('province') || '';
                roRes = await fetch(`${RAJAONGKIR_BASE}/city?province=${provinceId}`, {
                    headers: { key: apiKey }
                });
                roData = await roRes.json();
                const cities = roData.rajaongkir.results;
                return new Response(JSON.stringify(cities), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });

            } else if (path === '/cost' && request.method === 'POST') {
                const body = await request.json();
                roRes = await fetch(`${RAJAONGKIR_BASE}/cost`, {
                    method: 'POST',
                    headers: {
                        key: apiKey,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        origin: body.origin,
                        destination: body.destination,
                        weight: body.weight || 50,
                        courier: body.courier || 'jne'
                    })
                });
                roData = await roRes.json();
                const costs = roData.rajaongkir.results[0]?.costs || [];
                return new Response(JSON.stringify(costs), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });

            } else {
                return new Response('Not found', { status: 404, headers: corsHeaders });
            }

        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }
};