const runJxa = require('run-jxa');
const { isOn, toggleDoNotDisturb } = require('./utils');

(async function main() {
  const args = process.argv.slice(2);
  const usage = `
  Usage: node onoff.js (on|off)

  e.g.,
  node onoff.js on
  node onoff.js off
  `;

  if (args.length == 0 || !['on', 'off'].includes(args[0])) {
    console.log(usage);
    process.exit();
  }

  const turnOn = args[0] === 'on';
  const on = await isOn()
  if (on) {
    if (turnOn) {
      console.log('DND is already on.');
    } else {
      await runJxa(toggleDoNotDisturb)
    }
  } else {
    if (!turnOn) {
      console.log('DND is already off.');
    } else {
      await runJxa(toggleDoNotDisturb)
    }
  }
})();
