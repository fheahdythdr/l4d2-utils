// File to replace sounds.

(async () => {
    const fs = require('fs');
    const path = require('path');
    const { program } = require('commander');

    program.version('1.0.0');
    program.requiredOption('-s, --sounddir dir', 'directory or directories for the sounds you want').requiredOption('-l, --l4d2sounddir dir', 'directory for the sounds you want to replace').requiredOption('-d, --shoulddelete', 'should the program delete every sound file in the dest dir?', false);
    program.parse();

    const opts = program.args;
    if (!fs.existsSync(opts[0])) throw new Error('Invalid sound directory.');
    if (!fs.existsSync(opts[1])) throw new Error('Invalid l4d2 sound directory.');
    const files = fs.readdirSync(opts[0]);
    const filesdirs = {}
    let filesisDir = false;
    for (const file of files) {
        if (fs.statSync(path.join(opts[0], file)).isDirectory()) {
            filesisDir = true;
            filesdirs[file] = fs.readdirSync(path.join(opts[0], file))
        }
    }
    const soundfiles = fs.readdirSync(opts[1]);
    if (opts[2]) {
        for (const file of soundfiles) {
            const dir = path.join(opts[1], file);
            fs.rmSync(dir);
        }
    }
    if (filesisDir) {
        for (const i of Object.keys(filesdirs)) {
            const rfile = filesdirs[i];
            for (const sfile of rfile) {
                fs.cpSync(path.join(opts[0], i, sfile), path.join(opts[1], sfile))
            }
        }
    }
    else {
        for (const sfile of files) {
            fs.cpSync(path.join(opts[0], sfile), path.join(opts[1], sfile))
        }
    }
})()
