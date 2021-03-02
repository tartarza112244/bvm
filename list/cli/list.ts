import type {CommandModule, Argv} from 'yargs';
import {listRemote, listLocal} from '@teambit/bvm.list.api';

export class ListCmd implements CommandModule {
  aliases = ['l', 'list'];
  describe = 'list installed bit versions';
  command = [
    'list'
  ];
  builder(yargs: Argv) {
    yargs
    .option({
      remote: {
        alias: ['r'],
        describe: 'show versions exist in the remote server',
        default: false,
        type: 'boolean'
      }
    })
    .example('$0 list', 'show all installed versions')
    .example('$0 list --remote', 'show all versions available for install')
    return yargs;
  }
  async handler(args) {
    if (args.remote){
      const list = await listRemote();
      console.log(list);
      return;
    }
    const list = await listLocal();
    console.log(localListOutput(list));
    return;
  };
}

export const command =  new ListCmd();

function localListOutput(versions: string[]): string {
  return versions.join('\n');
}