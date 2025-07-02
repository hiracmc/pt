/**
 * @param {number} [timeout=5000] 
 * @returns {Promise<string|null>} 
 */
export async function geturl(timeout = 5000) {
  const invJsonPath = 'assets/inv.json';
  const apiTestPath = '/api/v1/videos/dQw4w9WgXcQ'; 

  try {

    const response = await fetch(invJsonPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${invJsonPath}: ${response.statusText}`);
    }
    const instances = await response.json();
    if (!Array.isArray(instances)) {
      throw new Error(`${invJsonPath} に有効な配列が含まれていません。`);
    }

    console.log(`${instances.length}件のインスタンスをテストします...`);


    const testPromises = instances.map(async (instanceUrl) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const startTime = performance.now();
      try {
        const testUrl = `${instanceUrl}${apiTestPath}`;
        

        await fetch(testUrl, {
          signal: controller.signal,
          mode: 'no-cors',
          cache: 'no-store'
        });

        const endTime = performance.now();
        const responseTime = endTime - startTime;
        return { url: instanceUrl, responseTime };

      } catch (error) {
        throw new Error(`${instanceUrl} は利用不可: ${error.message}`);
      } finally {

        clearTimeout(timeoutId);
      }
    });


    const results = await Promise.allSettled(testPromises);


    const successfulInstances = results
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => result.value);


    if (successfulInstances.length === 0) {
      alert("利用可能なインスタンスを見つけられませんでした。");
      console.error('応答可能なInvidiousインスタンスが見つかりませんでした。');
      return null;
    }

    console.log(`応答があったインスタンス: ${successfulInstances.length}件`);
    console.log(successfulInstances);


    const fastestInstance = successfulInstances.reduce((fastest, current) => {
      return current.responseTime < fastest.responseTime ? current : fastest;
    });
    
    console.log('最速のインスタンスが見つかりました:', fastestInstance);
    return fastestInstance.url;

  } catch (error) {
    console.error('getFastestAvailableInstanceでエラーが発生しました:', error);
    return null; 
  }
}