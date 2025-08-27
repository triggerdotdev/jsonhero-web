/*
 * @Author: wangwendong1024 wangwendong1024@iCloud.com
 * @Date: 2025-08-26 20:12:00
 * @LastEditors: wangwendong1024 wangwendong1024@iCloud.com
 * @LastEditTime: 2025-08-27 20:33:54
 * @FilePath: \jsonhero-web\app\utilities\safeFetch.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default async function safeFetch(
  url: string,
  options: RequestInit = {},
  retries = 3,
  timeout = 5000
): Promise<Response> {
  // Log request details
  console.log(`[${new Date().toISOString()}] Request:`, {
    method: options.method || 'GET',
    url,
    headers: options.headers,
    body: options.body ? JSON.parse(options.body.toString()) : undefined
  });

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          ...options.headers,
        },
      });

      // Log response details
      console.log(`[${new Date().toISOString()}] Response:`, {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Attempt ${i + 1} failed:`, error);
      
      if (i === retries - 1) {
        console.error(`[${new Date().toISOString()}] Max retries reached for ${url}`);
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error("Max retries reached");
}
