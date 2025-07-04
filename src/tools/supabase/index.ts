import { z } from 'zod';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export const supabaseTools = {
  setup_supabase: {
    description: 'Supabase 프로젝트 설정',
    parameters: z.object({
      projectName: z.string(),
      features: z.array(z.enum(['auth', 'storage', 'realtime'])),
    }),
    handler: async (args: any) => {
      const { projectName, features } = args;
      
      try {
        await execAsync('supabase --version');
      } catch {
        console.log('Installing Supabase CLI...');
        await execAsync('npm install -g supabase');
      }
      
      await execAsync('supabase init');
      
      const envContent = `
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
`;
      
      await fs.writeFile('.env.local', envContent);
      
      return {
        success: true,
        message: '✅ Supabase 프로젝트 설정 완료!',
        features,
      };
    },
  },
  
  create_table: {
    description: 'Supabase 테이블 생성',
    parameters: z.object({
      name: z.string(),
      columns: z.array(z.object({
        name: z.string(),
        type: z.string(),
        primaryKey: z.boolean().optional(),
      })),
    }),
    handler: async (args: any) => {
      const { name, columns } = args;
      
      const columnDefs = columns.map((col: any) => {
        let def = `${col.name} ${col.type}`;
        if (col.primaryKey) def += ' PRIMARY KEY';
        return def;
      }).join(',\n  ');
      
      const sql = `
CREATE TABLE IF NOT EXISTS public.${name} (
  ${columnDefs},
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.${name} ENABLE ROW LEVEL SECURITY;
`;
      
      const migrationPath = `supabase/migrations/create_${name}_table.sql`;
      await fs.mkdir('supabase/migrations', { recursive: true });
      await fs.writeFile(migrationPath, sql);
      
      return {
        success: true,
        message: `✅ 테이블 '${name}' 마이그레이션 생성 완료`,
        path: migrationPath,
      };
    },
  },
};
