#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// 도구 임포트 (.js 확장자 없음!)
import { thinkingTools } from './tools/thinking/index';
import { contextTools } from './tools/context/index';
import { timeTools } from './tools/time/index';
import { uiTools } from './tools/ui/index';
import { githubTools } from './tools/github/index';
import { browserTools } from './tools/browser/index';
import { frontendTools } from './tools/frontend/index';
import { flutterTools } from './tools/flutter/index';
import { pythonTools } from './tools/python/index';
import { supabaseTools } from './tools/supabase/index';
import { integrationTools } from './tools/integration/index';

// 서버 생성
const server = new Server(
  {
    name: '@su-recorde/integrated-development-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 모든 도구 통합
const ALL_TOOLS = {
  ...thinkingTools,
  ...contextTools,
  ...timeTools,
  ...uiTools,
  ...githubTools,
  ...browserTools,
  ...frontendTools,
  ...flutterTools,
  ...pythonTools,
  ...supabaseTools,
  ...integrationTools,
};

// 도구 목록 핸들러
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: Object.entries(ALL_TOOLS).map(([name, tool]) => ({
    name,
    description: tool.description,
    inputSchema: {
      type: 'object',
      properties: tool.parameters ? Object.fromEntries(
        Object.entries(tool.parameters.shape).map(([key, schema]) => [
          key,
          {
            type: getZodType(schema),
            ...(schema._def.description && { description: schema._def.description }),
            ...(schema._def.typeName === 'ZodEnum' && { enum: schema._def.values }),
          }
        ])
      ) : {},
    },
  })),
}));

// 도구 실행 핸들러
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  const tool = ALL_TOOLS[name as keyof typeof ALL_TOOLS];
  if (!tool) {
    throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
  }
  
  try {
    const validatedArgs = tool.parameters ? tool.parameters.parse(args) : args;
    const result = await tool.handler(validatedArgs);
    
    return {
      content: [
        {
          type: 'text',
          text: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid parameters: ${error.errors.map(e => e.message).join(', ')}`
      );
    }
    throw new McpError(
      ErrorCode.InternalError,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

function getZodType(schema: any): string {
  const typeMap: Record<string, string> = {
    ZodString: 'string',
    ZodNumber: 'number',
    ZodBoolean: 'boolean',
    ZodArray: 'array',
    ZodObject: 'object',
    ZodEnum: 'string',
    ZodOptional: getZodType(schema._def.innerType),
  };
  return typeMap[schema._def.typeName] || 'string';
}

// 서버 시작
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error('🚀 통합 개발 툴킷 MCP 서버 시작됨!');
  console.error(`📦 총 ${Object.keys(ALL_TOOLS).length}개의 도구 로드 완료`);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
