
async function geton() {
  const response = await fetch('https://api.invidious.io/instances.json');
  const data = await response.json(); 
  console.log(`${data}`)

  const onlineInstances = data
    .filter(([url, info]) => info?.type === 'https' && info?.monitor === true)
    .map(([url]) => url);

  if (onlineInstances.length === 0) {
    throw new Error("オンラインのInvidiousインスタンスが見つかりませんでした。");
  }


  const v = onlineInstances[Math.floor(Math.random() * onlineInstances.length)];
  console.log("このインスタンスに接続するよ～:", v);

  return v;
}

const server = "https://invidious.nikkosphere.com/";
  
  const baseUri = server + "api/v1/videos/";
  const getc = "https://script.google.com/macros/s/AKfycbww6z3czhraDQl-_9_UeaaIAvgO7EQ-DpAs9zxiTJJ2uKMbhDSA3hEHAR-mfd76pY0S/exec?id=";
  const getsc = "https://script.google.com/macros/s/AKfycbxAQddNFMquRs13y_2APY7IyA7Ut8m-1KPoB4lUBa-bo9ohn8lSnGN6MNdmUHmQTzKh/exec?id=";
  const come = "https://script.google.com/macros/s/AKfycbwu88FSqn0H16s2U5lu_9zh3zLxwX9JurKwZVCiPrEestVo21EZRr4IiUis7Dg9jbOZ/exec?id="

  const videoId = window.location.hash.slice(1);
  if(videoId){
   const url = document.getElementById('youtube-url');
url.textContent = `http://youtu.be/${videoId}`;
 
    loadVideo(videoId);
    loadVideoInfo(videoId);
    loadChannelInfo(videoId);
    //loadComments(videoId);
    
  }
function e() {
  const url = document.getElementById('youtube-url').value;
  const videoId = extractVideoId(url);
  if (videoId) {
    const location = window.location.hash.slice(0);
    window.location.href=`https://hiracmc.github.io/fakeapp/#${videoId}`;

  } else {
    const url = document.getElementById('youtube-url').value;
  const videoId = extractVideoId2(url);
    if(videoId){
    const location = window.location.hash.slice(0);
    window.location.href=`https://hiracmc.github.io/fakeapp/#${videoId}`;

    } else {
    alert('エラー');
    window.location.reload;
  }}
}
  

function extractVideoId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/?\w?\/))([\w\-]{11}).*/;
  const match = url.match(regExp);
  return (match && match[5].length === 11) ? match[5] : null;
}

  function extractVideoId2(url) {
   const regex = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
  
  const match = url.match(regex);

    if (match) {
    return match[1];
  } else {
    return null;
  }
}

function loadVideo(videoId) {
  const container = document.getElementById('video-container');
  const yoko = (window.innerWidth) * 0.6 + 48;
  const tate = yoko * 9 / 16;

  container.innerHTML = `<iframe width="${yoko}" height="${tate}" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen class="douga"></iframe>`;

}

async function loadChannelInfo(videoId) {
  const apiUrl = `${baseUri}${videoId}`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('APIエラー');
    }

    const data = await response.json();
    const channelId = data.items[0].snippet.channelId;

    const apiUr = `${getc}${channelId}`;
    try {
      const response2 = await fetch(apiUr);
      const channelSnippet = await response2.json();

      const videoinfo = channelSnippet.items[0].snippet;
      const touroku = channelSnippet.items[0].statistics.subscriberCount;

      const c = `<img src="${videoinfo.thumbnails.default.url}" alt="ちゃんねる" class="home"> <div class="so"><h3>${syouryaku(videoinfo.title,25)}</h3><p>登録者数 ${touroku}人</p></div>`;

      document.getElementById('channel-info').innerHTML = c;
    } catch (err) {
      console.error("チャンネル情報の取得に失敗:", err);
    }
  } catch (err) {
    console.error("動画情報の取得に失敗:", err);
  }
}

function syouryaku(text,max) {
  const maxLength = max;
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

async function loadVideoInfo(videoId) {
  const apiUrl = `${baseUri}${videoId}`;
  alert(apiUrl)
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('APIエラー');
    }

    const data = await response.json();

    const {
      title,
      viewCount,
      publishedText
    } = data;

    const descriptionHtml = "<div class=view>" + view + " 回視聴</div> " + data.descriptionHtml
alert(descriptionHtml)
    document.getElementById('description').innerHTML = descriptionHtml;
    document.getElementById('video-name').textContent = title;
    document.getElementById('channel-info').textContent = `${data.channelTitle}`;
    getkome(videoId)
  } catch (err) {
    console.error("エラーが発生しました:", err);
  }

  return true;
}


async function getkome(videoId) {
  const apiUrl = `${come}${videoId}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('APIエラー');
    }

    const data = await response.json();
    let text = "";

    for (let i = 0; i < 30; i++) {
      const snippet = data.items[i].snippet.topLevelComment.snippet;
      const comment = snippet.textDisplay;
      const name = snippet.authorDisplayName;
      const icon = snippet.authorProfileImageUrl;

      text += `
        <div class="kome">
          <div class="komeue">
          <img src="${icon}" alt="${name}" width="40" height="40">
          </div>
          <div class="komesita"><p class="b">${name}</p><p class="kometext"><p>${comment}</p></div>
        </div>
      `;
    }

    document.getElementById('komento').innerHTML = text;

  } catch (err) {
    console.error("エラーが発生しました:", err);
  }
}



function fn(number) {
  if (number >= 110000000) {
    const oku = 1;
    const senMan = Math.floor((number - 100000000) / 10000000); 
    return `${oku}億${senMan}千万`;
  } else if (number >= 100000000) {
    return `1億`;
  } else if (number >= 100000) {
    return `${Math.floor(number / 10000)}万`;
  } else if (number >= 10000) {
    return `${Math.floor(number / 10000)}万`;
  } else {
    return `${number}`;
  }
}
