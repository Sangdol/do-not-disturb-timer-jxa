Do Not Disturb Timer CLI
===

Set timer for Do Not Disturb on CLI.

Installation
---

```sh
npm install
```

Usage
---

This uses JXA and enables and disables Do Not Disturb by sending a keystroke so you first need to set a shortcut for Do Not Disturb.

The default shortcut is `Command+Shift+Option+Control+z`.
![shortcut-preference](https://user-images.githubusercontent.com/803223/126902124-3d680f9b-cfc6-453a-8749-32484f657726.png)


Then you can run a command like this:

```sh
# Enable Do Not Disturb for 10 minutes.
node index.js 10
```
