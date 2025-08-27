import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/esm/axios.min.js';

// <script type="module" src="../api/v1.js"></script>

console.log("apiを読み込みます")
const PORT = 3000;
export async function getData(add) {
   let link = [
  "https://invidious.nikkosphere.com",
  "https://iv.melmac.space",
  "https://invidious.reallyaweso.me",
  "https://invidious.adminforge.de",
  "https://invidious.esmailelbob.xyz",
  "https://invidious.nerdvpn.de",
  "https://invidious.perennialte.ch",
  "https://invidious.dhusch.de",
  "https://invidious.0011.lt",
  "https://invidious.materialio.us",
  "https://usa-proxy2.poketube.fun",
  "https://invidious.darkness.service",
  "https://invidious.flokinet.to",
  "https://invidious.fdn.fr",
  "https://iv.duti.dev",
  "https://yt.artemislena.eu",
  "https://invidious.projectsegfau.lt",
  "https://id.420129.xyz",
  "https://invidious.jing.rocks",
  "https://nyc1.iv.ggtyler.dev",
  "https://inv.in.projectsegfau.lt",
  "https://invidious.drgns.space",
  "https://cal1.iv.ggtyler.dev",
  "https://invidious.nikkosphere.com",
  "https://inv.us.projectsegfau.lt",
  "https://lekker.gay",
  "https://youtube.mosesmang.com",
  "https://invidious.privacyredirect.com",
  "https://invidious.lunivers.trade",
  "https://invidious.incogniweb.net",
  "https://invid-api.poketube.fun",
  "https://inv.tux.pizza",
  "https://invidious.ducks.party",
  "https://pol1.iv.ggtyler.dev",
  "https://invidious.protokolla.fi",
  "https://invidious.einfachzocken.eu",
  "https://yewtu.be",
  "https://iv.datura.network",
  "https://invidious.f5.si",
  "https://invidious.privacydev.net",
  "https://eu-proxy.poketube.fun",
  "https://yt.drgnz.club",
  "https://inv.nadeko.net",
  "https://invidious.private.coffee"
];


const li = `/api/v1/${add}`;
const promises = link.map(async urll => {
  const url = urll + li;
  
  try {
    const response = await axios.get(url, {
      timeout: 5000,
    });
  
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      return { from: urll, data: data };
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
});

try {
  const result = await Promise.any(promises);
  return {data:result.data,by:result.from};
} catch (error) {
  console.error("\nすべてのサーバーへの接続に失敗しました。");
  document.getElementById('sippa').innerHTML = `<h1 style="color: #fff; font-size: 16px; margin-left: 40px;">動画の情報の読み込みに失敗しました。再読み込みボタンをしてもう一度試してください</h1>`;
  return null;
}
}