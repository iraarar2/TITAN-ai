# TITAN AI Dashboard V1

## Fitur V1
- Dashboard responsif untuk Safari/iPad.
- Discovery feed token terbaru dari DexScreener (maksimal 25 mint dari feed, hingga 30 pair).
- Inspect mint address, harga, liquidity, volume, FDV, pair age, perubahan harga, DEX.
- Heuristic market-risk score berdasarkan LP, umur pair, volume/LP, FDV/LP dan perubahan harga.
- Watchlist sesi browser dan checklist pre-entry.
- Prototype analisis OHLCV: swing-break/MSS proxy, displacement sederhana, dan FVG tiga candle.

## Batasan
Skor risiko bukan audit rug pull atau probabilitas. Belum memeriksa authority, holder concentration, LP ownership/lock, wallet developer, honeypot, atau sellability secara otomatis. Engine struktur membutuhkan OHLCV yang dimasukkan pengguna; bukan integrasi TradingView dan bukan engine ICT tervalidasi. Tidak ada auto BUY/SELL, SHORT, Phantom/Jupiter, TP/SL otomatis, database, atau jaminan keamanan. Jangan masukkan seed phrase/private key.

## Deploy dari iPad
1. Ekstrak ZIP.
2. Buat repository baru di GitHub melalui Safari.
3. Upload isi folder ke root repository (folder `public` dan `functions` harus berada di root).
4. Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git.
5. Pilih repository; build command kosong; output directory `public`.
6. Deploy dan buka alamat `*.pages.dev` di Safari.

## Uji
Tekan Refresh scan, pilih token atau tempel mint address. Untuk market structure lab, masukkan minimal 8 candle OHLCV JSON berurutan waktu.
