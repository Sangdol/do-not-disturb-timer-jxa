const runJxa = require('run-jxa');
const { isOn, toggleDoNotDisturb } = require('./utils');

(async function main() {
  const args = process.argv.slice(2);
  const usage = `
  Usage: node index.js <n minutes>

  e.g.,
  node index.js 60 # DND for 60 minutes
  node index.js 0  # turn off DND
  `;

  if (args.length == 0) {
    console.log(usage);
    process.exit();
  }

  const duration = args[0]
  let on = await isOn()
  if (!on) {
    await runJxa(toggleDoNotDisturb)
  }

  // https://stackoverflow.com/a/49139664/524588
  await new Promise(resolve => setTimeout(resolve, duration * 1000 * 60));

  on = await isOn()
  if (on) {
    await runJxa(toggleDoNotDisturb)
  }
})();
