const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function isOn () {
  // eg., res = { stdout: '0\n', stderr: '' }
  const res = await exec('defaults read com.apple.controlcenter "NSStatusItem Visible DoNotDisturb"')
  return res.stdout.trim() == '1'
};

// https://github.com/JXA-Cookbook/JXA-Cookbook/wiki/System-Events
function toggleDoNotDisturb() {
  const app = Application.currentApplication()
  app.includeStandardAdditions = true

  const se = Application('System Events')
  // You need to set the shortcut according to README. You can also change the key combination.
  se.keystroke('z', { using: ['shift down', 'command down', 'control down', 'option down'] })
}

module.exports = { isOn, toggleDoNotDisturb };
