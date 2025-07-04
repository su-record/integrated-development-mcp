import { z } from 'zod';
import { Octokit } from '@octokit/rest';

const getOctokit = () => {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GitHub token not configured');
  }
  return new Octokit({ auth: process.env.GITHUB_TOKEN });
};

export const githubTools = {
  create_repo: {
    description: 'GitHub 리포지토리 생성',
    parameters: z.object({
      name: z.string(),
      description: z.string().optional(),
      private: z.boolean().default(false),
      autoInit: z.boolean().default(true),
    }),
    handler: async (args: any) => {
      try {
        const octokit = getOctokit();
        const { data } = await octokit.repos.createForAuthenticatedUser({
          name: args.name,
          description: args.description,
          private: args.private,
          auto_init: args.autoInit,
        });
        
        return {
          success: true,
          message: `✅ 리포지토리 '${args.name}' 생성 완료`,
          url: data.html_url,
        };
      } catch (error) {
        return {
          success: false,
          message: '❌ GitHub 토큰이 필요합니다',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
  },
};
