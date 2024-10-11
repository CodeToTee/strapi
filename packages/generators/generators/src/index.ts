import { join } from 'node:path';
import { Plop, run } from 'plop';
import nodePlop, { NodePlopAPI } from 'node-plop';

// Starts the Plop CLI programmatically
export const runCLI = () => {
  Plop.prepare(
    {
      configPath: join(__dirname, 'plopfile.js'),
    },
    (env) => {
      const argv = process.argv.slice(2); // Extract command-line arguments
      Plop.execute(env, argv, (env, argv) => run(env, argv, true)); // Pass the third argument 'true' for passArgsBeforeDashes
    }
  );
};

// Runs a generator programmatically without prompts
export const generate = async <T extends Record<string, any>>(
  generatorName: string,
  options: T,
  { dir = process.cwd(), plopFile = 'plopfile.js' } = {}
) => {
  const plop: NodePlopAPI = await nodePlop(join(__dirname, plopFile), {
    destBasePath: join(dir, 'src'),
    force: false,
  });

  const generator = plop.getGenerator(generatorName);
  await generator.runActions(options satisfies T, {
    onSuccess() {},
    onFailure() {},
    onComment() {},
  });
};
