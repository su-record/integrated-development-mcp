import { z } from 'zod';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export const pythonTools = {
  create_api: {
    description: 'Python 백엔드 API 생성',
    parameters: z.object({
      name: z.string(),
      framework: z.enum(['fastapi', 'django', 'flask']),
      features: z.array(z.enum(['auth', 'cors', 'swagger'])).optional(),
      database: z.enum(['postgresql', 'mysql', 'sqlite']).optional(),
    }),
    handler: async (args: any) => {
      const { name, framework, features = [], database = 'sqlite' } = args;
      
      await fs.mkdir(name, { recursive: true });
      process.chdir(name);
      
      await execAsync('python -m venv venv');
      
      const pip = process.platform === 'win32' ? 'venv\\Scripts\\pip' : 'venv/bin/pip';
      
      switch (framework) {
        case 'fastapi':
          await createFastAPIProject(pip, features, database);
          break;
        case 'django':
          await createDjangoProject(pip, name, features);
          break;
      }
      
      return {
        success: true,
        message: `✅ ${framework} API 생성 완료!`,
        startCommand: framework === 'fastapi' 
          ? 'uvicorn main:app --reload' 
          : 'python manage.py runserver',
      };
    },
  },
};

async function createFastAPIProject(pip: string, features: string[], database: string) {
  const packages = ['fastapi', 'uvicorn[standard]', 'pydantic'];
  
  if (database === 'postgresql') {
    packages.push('sqlalchemy', 'asyncpg');
  }
  
  if (features.includes('auth')) {
    packages.push('python-jose[cryptography]', 'passlib[bcrypt]');
  }
  
  await execAsync(`${pip} install ${packages.join(' ')}`);
  
  const mainContent = `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
`;
  
  await fs.writeFile('main.py', mainContent);
}

async function createDjangoProject(pip: string, name: string, features: string[]) {
  const packages = ['django', 'djangorestframework', 'django-cors-headers'];
  
  await execAsync(`${pip} install ${packages.join(' ')}`);
  await execAsync(`${pip.replace('pip', 'django-admin')} startproject ${name} .`);
}
