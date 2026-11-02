export async function onRequestGet() {
 try {
  const r=await fetch('https://api.dexscreener.com/token-profiles/latest/v1');
  if(!r.ok) return Response.json({error:'Feed token terbaru tidak tersedia.'},{status:502});
  const profiles=await r.json(); const mints=[...new Set((profiles||[]).filter(x=>x.chainId==='solana').map(x=>x.tokenAddress))].slice(0,25);
  if(!mints.length)return Response.json({pairs:[]});
  const p=await fetch('https://api.dexscreener.com/latest/dex/tokens/'+mints.join(','));
  if(!p.ok)return Response.json({error:'Data pair tidak tersedia.'},{status:502});
  const data=await p.json();const pairs=(data.pairs||[]).filter(x=>x.chainId==='solana').sort((a,b)=>(Number(b.liquidity?.usd)||0)-(Number(a.liquidity?.usd)||0)).slice(0,30);
  return Response.json({pairs},{headers:{'cache-control':'public,max-age=15'}});
 }catch{return Response.json({error:'Gagal mengambil feed token.'},{status:502});}
}
