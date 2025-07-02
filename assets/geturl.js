/**
 * @param {string} jsonPath
 * @param {number} timeout
 * @returns {Promise<string|null>} 
 */
export async function geturl(jsonPath = './assets/inv.json', timeout = 5000) {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${jsonPath}: ${response.statusText}`);
    }
    const instances = await response.json();
    if (!Array.isArray(instances)) {
        throw new Error('JSON data is not an array of instance URLs.');
    }

    const checkPromises = instances.map(url => {
      const controller = new AbortController();
      const signal = controller.signal;
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      return fetch(`${url}/api/v1/videos/Jn8gHsEuULY`, { signal })
        .then(res => {
          clearTimeout(timeoutId); 
          if (res.ok) {
            return { status: 'fulfilled', value: url };
          } else {
            return { status: 'rejected', reason: `Status: ${res.status}` };
          }
        })
        .catch(err => {
          clearTimeout(timeoutId); 
          return { status: 'rejected', reason: err.name === 'AbortError' ? 'Timeout' : err.message };
        });
    });

    const results = await Promise.all(checkPromises);
    const liveInstances = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);

    console.log(`Found ${liveInstances.length} live instances:`, liveInstances);

    if (liveInstances.length === 0) {
      alert('利用可能なインスタンスを見つけられませんでした。')
      return null;
    }
    const randomIndex = Math.floor(Math.random() * liveInstances.length);
    return liveInstances[randomIndex];

  } catch (error) {
    console.error('An error occurred in getRandomLiveInvidiousInstance:', error);
    return null; 
  }
}