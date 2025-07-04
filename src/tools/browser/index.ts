import { z } from 'zod';
import axios from 'axios';
import * as cheerio from 'cheerio';

let puppeteer: any = null;

async function getPuppeteer() {
  if (!puppeteer) {
    try {
      puppeteer = await import('puppeteer-core');
    } catch {
      throw new Error('Puppeteer not installed. Browser automation unavailable.');
    }
  }
  return puppeteer;
}

export const browserTools = {
  web_scrape: {
    description: '웹 페이지 스크래핑',
    parameters: z.object({
      url: z.string(),
      selectors: z.record(z.string()),
    }),
    handler: async (args: any) => {
      const { url, selectors } = args;
      
      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        
        const data: Record<string, any> = {};
        
        for (const [key, selector] of Object.entries(selectors)) {
          data[key] = $(selector as string).text().trim();
        }
        
        return {
          success: true,
          url,
          data,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Scraping failed',
        };
      }
    },
  },
  
  fetch_html: {
    description: 'URL의 HTML 가져오기',
    parameters: z.object({
      url: z.string(),
    }),
    handler: async (args: any) => {
      try {
        const response = await axios.get(args.url);
        return {
          success: true,
          html: response.data,
          statusCode: response.status,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Fetch failed',
        };
      }
    },
  },
};
