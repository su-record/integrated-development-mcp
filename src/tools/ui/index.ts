import { z } from 'zod';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export const uiTools = {
  install_shadcn: {
    description: 'Shadcn UI 컴포넌트 설치',
    parameters: z.object({
      components: z.array(z.string()).describe('설치할 컴포넌트 목록'),
      path: z.string().optional().describe('프로젝트 경로'),
    }),
    handler: async (args: any) => {
      const { components, path: projectPath = '.' } = args;
      
      try {
        await execAsync('npx shadcn@latest init -y', { cwd: projectPath });
        
        for (const component of components) {
          await execAsync(`npx shadcn@latest add ${component}`, { cwd: projectPath });
        }
        
        return {
          success: true,
          message: `✅ Shadcn UI 컴포넌트 설치 완료`,
          installed: components,
        };
      } catch (error) {
        return {
          success: false,
          message: '❌ Shadcn UI 설치 실패',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
  },
  
  create_ui_component: {
    description: 'UI 컴포넌트 생성',
    parameters: z.object({
      name: z.string(),
      type: z.enum(['button', 'card', 'form', 'modal', 'table']),
      variant: z.string().optional(),
    }),
    handler: async (args: any) => {
      const { name, type, variant } = args;
      
      const template = `import React from 'react';
import { cn } from '@/lib/utils';

interface ${name}Props {
  className?: string;
}

export const ${name}: React.FC<${name}Props> = ({ className, ...props }) => {
  return (
    <div className={cn('${type}', className)}>
      {/* ${type} component */}
    </div>
  );
};`;
      
      const filePath = `src/components/${name}.tsx`;
      await fs.mkdir('src/components', { recursive: true });
      await fs.writeFile(filePath, template);
      
      return {
        success: true,
        message: `✅ UI 컴포넌트 '${name}' 생성 완료`,
        path: filePath,
      };
    },
  },
};
