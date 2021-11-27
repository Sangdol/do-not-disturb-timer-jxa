const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function isOn () {
  // Big Sur: NSStatusItem Visible DoNotDisturb
  // Monterey: NSStatusItem Visible FocusModes
  // https://www.reddit.com/r/osx/comments/ksbmay/big_sur_how_to_test_do_not_disturb_status_in/
  // eg., res = { stdout: '0\n', stderr: '' }
  const res = await exec('defaults read com.apple.controlcenter "NSStatusItem Visible FocusModes"')
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
