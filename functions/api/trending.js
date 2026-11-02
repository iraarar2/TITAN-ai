
async function getFeed(url) {
  const response = await fetch(url, {
    headers: { "accept": "application/json" }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function onRequestGet() {
  try {
    let profiles = [];
    let source = "latest-profiles";

    // Sumber utama: token profiles terbaru
    try {
      profiles = await getFeed(
        "https://api.dexscreener.com/token-profiles/latest/v1"
      );
    } catch {
      // Cadangan 1: boosted tokens terbaru
      source = "latest-boosts";

      try {
        profiles = await getFeed(
          "https://api.dexscreener.com/token-boosts/latest/v1"
        );
      } catch {
        // Cadangan 2: token dengan boost tertinggi
        source = "top-boosts";

        profiles = await getFeed(
          "https://api.dexscreener.com/token-boosts/top/v1"
        );
      }
    }

    const mints = [
      ...new Set(
        profiles
          .filter(x => x.chainId === "solana" && x.tokenAddress)
          .map(x => x.tokenAddress)
      )
    ].slice(0, 30);

    if (!mints.length) {
      return Response.json({
        pairs: [],
        source,
        message: "Feed tersedia, tetapi belum ada token Solana."
      });
    }

    const pairResponse = await fetch(
      "https://api.dexscreener.com/tokens/v1/solana/" +
      mints.join(","),
      { headers: { "accept": "application/json" } }
    );

    if (!pairResponse.ok) {
      return Response.json({
        error: `Gagal mengambil data pair: HTTP ${pairResponse.status}`,
        source
      }, { status: 502 });
    }

    const pairData = await pairResponse.json();

    const pairs = (Array.isArray(pairData) ? pairData : [])
      .filter(x => x.chainId === "solana")
      .sort(
        (a, b) =>
          (Number(b.liquidity?.usd) || 0) -
          (Number(a.liquidity?.usd) || 0)
      )
      .slice(0, 30);

    return Response.json(
      { pairs, source },
      {
        headers: {
          "cache-control": "public, max-age=15"
        }
      }
    );

  } catch (error) {
    return Response.json({
      error: "Semua sumber feed gagal: " + error.message
    }, { status: 502 });
  }
}
