import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

const CONTEXT_DIR = '.mcp-contexts';

export const contextTools = {
  save_context: {
    description: '현재 작업 컨텍스트 저장',
    parameters: z.object({
      name: z.string().describe('컨텍스트 이름'),
      data: z.any().describe('저장할 데이터'),
      tags: z.array(z.string()).optional(),
    }),
    handler: async (args: any) => {
      const { name, data, tags = [] } = args;
      
      await fs.mkdir(CONTEXT_DIR, { recursive: true });
      
      const context = {
        name,
        data,
        tags,
        timestamp: new Date().toISOString(),
      };
      
      const filePath = path.join(CONTEXT_DIR, `${name}.json`);
      await fs.writeFile(filePath, JSON.stringify(context, null, 2));
      
      return {
        success: true,
        message: `✅ 컨텍스트 '${name}' 저장 완료`,
        path: filePath,
      };
    },
  },
  
  load_context: {
    description: '저장된 컨텍스트 불러오기',
    parameters: z.object({
      name: z.string().describe('컨텍스트 이름'),
    }),
    handler: async (args: any) => {
      const { name } = args;
      
      try {
        const filePath = path.join(CONTEXT_DIR, `${name}.json`);
        const content = await fs.readFile(filePath, 'utf-8');
        const context = JSON.parse(content);
        
        return {
          success: true,
          context,
        };
      } catch (error) {
        return {
          success: false,
          message: `❌ 컨텍스트 '${name}'를 찾을 수 없습니다`,
        };
      }
    },
  },
};
