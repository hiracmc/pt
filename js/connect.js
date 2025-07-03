export async function geton() {
  const response = await fetch('https://api.invidious.io/instances.json');
  const data = await response.json(); // データ形式: [ [url, {info}], ... ]

  // HTTPS で監視が有効なインスタンスのみを抽出
  const onlineInstances = data
    .filter(([url, info]) => info?.type === 'https' && info?.monitor === true)
    .map(([url]) => url);

  if (onlineInstances.length === 0) {
    throw new Error("オンラインのInvidiousインスタンスが見つかりませんでした。");
  }

  // ランダムに1つ選んで変数に代入
  const v = onlineInstances[Math.floor(Math.random() * onlineInstances.length)];
  console.log("このインスタンスに接続するよ～:", v);

  return v;
}