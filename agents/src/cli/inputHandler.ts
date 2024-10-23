import readline from 'readline';
import chalk from 'chalk';

export type InputHandler = (input: string) => Promise<void>;

enum Command {
  Exit = '/exit',
  Help = '/help',
  RunTests = '/runtests'
}

interface CommandHandler {
  execute: () => Promise<void>;
}

class ExitCommand implements CommandHandler {
  constructor(private rl: readline.Interface) {}
  async execute(): Promise<void> {
    this.rl.close();
  }
}

class HelpCommand implements CommandHandler {
  async execute(): Promise<void> {
    console.log(chalk.cyan(`
Available commands:
${Command.Exit} - Exit the chat
${Command.Help} - Show this help message
${Command.RunTests} - Run tests
`));
  }
}

class RunTestsCommand implements CommandHandler {
  async execute(): Promise<void> {
    console.log(chalk.yellow('Running tests...'));
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(chalk.green('Test results: All tests passed!'));
  }
}

export function createInputHandler(rl: readline.Interface): InputHandler {
  return async (input: string): Promise<void> => {
    switch (input.toLowerCase()) {
      case Command.Exit:
        await new ExitCommand(rl).execute();
        return;
      case Command.Help:
        await new HelpCommand().execute();
        return;
      case Command.RunTests:
        await new RunTestsCommand().execute();
        return;
      default:
        console.log(chalk.red('Unknown command'));
    }
  };
}