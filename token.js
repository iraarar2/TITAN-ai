export async function onRequestGet({ request }) {
 const mint = new URL(request.url).searchParams.get('mint') || '';
 if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(mint)) return Response.json({error:'Mint address tidak valid.'},{status:400});
 const r = await fetch('https://api.dexscreener.com/latest/dex/tokens/'+encodeURIComponent(mint));
 if (!r.ok) return Response.json({error:'Data provider tidak tersedia.'},{status:502});
 const d = await r.json(); return Response.json({pairs:d.pairs||[]},{headers:{'cache-control':'public,max-age=10'}});
}
