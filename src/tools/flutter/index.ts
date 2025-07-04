import { z } from 'zod';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export const flutterTools = {
  create_flutter_app: {
    description: 'Flutter 크로스플랫폼 앱 생성',
    parameters: z.object({
      name: z.string(),
      platforms: z.array(z.enum(['ios', 'android', 'web', 'windows', 'macos', 'linux'])),
      features: z.array(z.enum(['riverpod', 'go_router', 'dio'])).optional(),
    }),
    handler: async (args: any) => {
      const { name, platforms, features = [] } = args;
      
      await execAsync(`flutter create ${name} --platforms=${platforms.join(',')}`);
      
      process.chdir(name);
      
      if (features.includes('riverpod')) {
        await execAsync('flutter pub add flutter_riverpod');
      }
      
      if (features.includes('go_router')) {
        await execAsync('flutter pub add go_router');
      }
      
      return {
        success: true,
        message: `✅ Flutter 앱 생성 완료!`,
        supportedPlatforms: platforms,
      };
    },
  },
  
  create_widget: {
    description: 'Flutter 위젯 생성',
    parameters: z.object({
      name: z.string(),
      type: z.enum(['stateless', 'stateful']),
    }),
    handler: async (args: any) => {
      const { name, type } = args;
      
      const templates: Record<string, string> = {
        stateless: `import 'package:flutter/material.dart';

class ${name}Widget extends StatelessWidget {
  const ${name}Widget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('${name} Widget'),
    );
  }
}`,
        stateful: `import 'package:flutter/material.dart';

class ${name}Widget extends StatefulWidget {
  const ${name}Widget({Key? key}) : super(key: key);
  
  @override
  State<${name}Widget> createState() => _${name}WidgetState();
}

class _${name}WidgetState extends State<${name}Widget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('${name} Widget'),
    );
  }
}`,
      };
      
      const filePath = `lib/widgets/${name.toLowerCase()}_widget.dart`;
      await fs.mkdir('lib/widgets', { recursive: true });
      await fs.writeFile(filePath, templates[type]);
      
      return {
        success: true,
        message: `✅ Flutter ${type} 위젯 생성 완료!`,
        path: filePath,
      };
    },
  },
};
