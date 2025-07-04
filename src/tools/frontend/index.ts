import { z } from 'zod';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export const frontendTools = {
  create_web_app: {
    description: '최신 웹 애플리케이션 생성',
    parameters: z.object({
      name: z.string().describe('프로젝트 이름'),
      framework: z.enum(['react', 'vue', 'nextjs', 'astro', 'svelte']),
      features: z.array(z.enum(['typescript', 'tailwind', 'shadcn', 'auth'])).optional(),
    }),
    handler: async (args: any) => {
      const { name, framework, features = [] } = args;
      
      console.log(`Creating ${framework} app...`);
      
      switch (framework) {
        case 'react':
          await execAsync(`npm create vite@latest ${name} -- --template react-ts`);
          break;
        case 'nextjs':
          await execAsync(`npx create-next-app@latest ${name} --typescript --tailwind --app`);
          break;
        case 'vue':
          await execAsync(`npm create vue@latest ${name} -- --typescript`);
          break;
      }
      
      process.chdir(name);
      
      if (features.includes('tailwind') && framework !== 'nextjs') {
        await execAsync('npm install -D tailwindcss postcss autoprefixer');
      }
      
      return {
        success: true,
        path: process.cwd(),
        message: `✅ ${framework} 앱 생성 완료!`,
      };
    },
  },
  
  create_component: {
    description: '프레임워크별 컴포넌트 생성',
    parameters: z.object({
      name: z.string(),
      framework: z.enum(['react', 'vue', 'angular']),
      type: z.enum(['page', 'component', 'layout']).default('component'),
    }),
    handler: async (args: any) => {
      const { name, framework, type } = args;
      
      const templates: Record<string, string> = {
        react: `import React from 'react';

export const ${name}: React.FC = () => {
  return (
    <div>
      <h1>${name}</h1>
    </div>
  );
};`,
        vue: `<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
const title = '${name}';
</script>`,
      };
      
      const ext = framework === 'vue' ? 'vue' : 'tsx';
      const dir = type === 'page' ? 'pages' : 'components';
      const filePath = `src/${dir}/${name}.${ext}`;
      
      await fs.mkdir(`src/${dir}`, { recursive: true });
      await fs.writeFile(filePath, templates[framework] || templates.react);
      
      return {
        success: true,
        message: `✅ ${framework} ${type} '${name}' 생성 완료!`,
        path: filePath,
      };
    },
  },
};
