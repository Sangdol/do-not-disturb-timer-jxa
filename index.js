const runJxa = require('run-jxa');
const notify = require('osx-notifier');

const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

async function isOn () {
  // eg., res = { stdout: '0\n', stderr: '' }
  const res = await exec('defaults read com.apple.controlcenter "NSStatusItem Visible DoNotDisturb"')
  //console.log(res)
  return res.stdout.trim() == '1'
};

// https://github.com/JXA-Cookbook/JXA-Cookbook/wiki/System-Events
function toggleDoNotDisturb() {
  const app = Application.currentApplication()
  app.includeStandardAdditions = true

  const se = Application('System Events')
  se.keystroke('z', { using: ['shift down', 'command down', 'control down', 'option down'] })
}

(async function main() {
  const args = process.argv.slice(2);
  const usage = `
  Usage: node index.js <n minutes>

  e.g.,
  node index.js 60 # DND for 60 minutes
  `;

  //console.log(args)
  //console.log('Hello!')

  if (args.length == 0) {
    console.log(usage);
    process.exit();
  }

  const duration = args[0]
  let on = await isOn()
  console.log('on', on)
  if (!on) {
    await runJxa(toggleDoNotDisturb)
  }

  // https://stackoverflow.com/a/49139664/524588
  await new Promise(resolve => setTimeout(resolve, duration * 1000 * 60));

  on = await isOn()
  console.log('off', on)
  if (on) {
    await runJxa(toggleDoNotDisturb)
  }
})();
