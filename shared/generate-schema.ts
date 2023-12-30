import fs from 'fs';
import path from 'path';

type TransformTo = 'none' | 'python' | 'go';
type Folder = 'backend-bun' | 'backend-python' | 'backend-go';

function generate(folder: Folder, transformTo: TransformTo) {
  if (transformTo === 'none') {
    fs.copyFileSync(
      path.resolve(__dirname, './schema.ts'),
      path.resolve(__dirname, `../${folder}/schema.ts`),
    );
  }
}

if (process.argv[2] == null || process.argv[3] == null) {
  console.log('You must provide a folder and transform type');
  process.exit(1);
}

generate(process.argv[2] as Folder, process.argv[3] as TransformTo);
