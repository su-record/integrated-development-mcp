import { z } from 'zod';

export const thinkingTools = {
  sequential_thinking: {
    description: '복잡한 문제를 단계별로 분해하여 해결',
    parameters: z.object({
      problem: z.string().describe('해결할 문제'),
      constraints: z.array(z.string()).optional().describe('제약 조건'),
      goal: z.string().optional().describe('목표'),
    }),
    handler: async (args: any) => {
      const { problem, constraints = [], goal } = args;
      
      const steps = [
        `1. 문제 정의: ${problem}`,
        `2. 목표 설정: ${goal || '최적의 해결책 찾기'}`,
        `3. 제약 조건: ${constraints.length > 0 ? constraints.join(', ') : '없음'}`,
        '4. 가능한 접근법 도출',
        '5. 각 접근법의 장단점 분석',
        '6. 최적 솔루션 선택',
        '7. 실행 계획 수립',
      ];
      
      return {
        process: 'sequential_thinking',
        steps,
        recommendation: '단계별로 접근하여 체계적으로 해결하세요.',
      };
    },
  },
  
  clear_thought: {
    description: '복잡한 아이디어를 명확하게 정리',
    parameters: z.object({
      thoughts: z.array(z.string()).describe('정리할 생각들'),
      format: z.enum(['outline', 'mindmap', 'list']).optional(),
    }),
    handler: async (args: any) => {
      const { thoughts, format = 'outline' } = args;
      
      const organized = {
        main_ideas: thoughts.slice(0, 3),
        supporting_points: thoughts.slice(3),
        format,
      };
      
      return organized;
    },
  },
};
