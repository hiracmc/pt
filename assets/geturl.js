/*
 * @param {number} [timeout=5000] 
 * @returns {Promise<string|null>} 
 * このコードはgeminiに生成してもらいました!!!!!1
 */
export async function geturl(timeout = 5000) {
  const invJsonPath = 'assets/inv.json';
  const apiTestPath = '/api/v1/stats';

  try {
    const response = await fetch(invJsonPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${invJsonPath}: ${response.statusText}`);
    }
    const instances = await response.json();
    if (!Array.isArray(instances)) {
      throw new Error(`${invJsonPath} does not contain a valid JSON array.`);
    }

    const testPromises = instances.map(async (instanceUrl) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const startTime = performance.now();
      try {
        const testUrl = `${instanceUrl}${apiTestPath}`;
        const apiResponse = await fetch(testUrl, {
          signal: controller.signal,
          mode: 'cors' 
        });

        if (!apiResponse.ok) {
          throw new Error(`API request failed with status: ${apiResponse.status}`);
        }

        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        return { url: instanceUrl, responseTime };

      } finally {
        clearTimeout(timeoutId);
      }
    });
    const results = await Promise.allSettled(testPromises);
    const successfulInstances = results
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => result.value);

    if (successfulInstances.length === 0) {
      console.warn('No available Invidious instances found.');
      return null;
    }
    const fastestInstance = successfulInstances.reduce((fastest, current) => {
      return current.responseTime < fastest.responseTime ? current : fastest;
    });
    
    console.log('Fastest instance found:', fastestInstance);
    return fastestInstance.url;

  } catch (error) {
    console.error('An error occurred in findFastestInvidiousInstance:', error);
    return null; 
    }
}