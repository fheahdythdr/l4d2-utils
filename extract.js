// Extracts all vpks in the '/vpks' folder to the '/extr' folder.

(async () => {
    const fs = require('fs');
    const nodevpk = (await import('node-vpk')).default;

    if (!fs.existsSync(__dirname + '/vpks')) {
        fs.mkdirSync(__dirname + '/vpks');
        console.log('VPKS folder did not exist. Created VPKS folder, put all vpks you want extracted in there (it will only read .vpk files.)');
    }
    if (!fs.existsSync(__dirname + '/extr')) fs.mkdirSync(__dirname + '/extr');

    for (const vpkfile of fs.readdirSync(__dirname + '/vpks')) {
        const vpkpath = __dirname + '/vpks/' + vpkfile;
        if (vpkpath.endsWith('.vpk') && !fs.existsSync(__dirname + '/extr/' + vpkfile.replace('.vpk', ''))) {
            const vpk = new nodevpk(vpkpath);
            await vpk.load();
            console.log("extracting to ", __dirname + '/extr/' + vpkfile.replace('.vpk', ''))
            vpk.extract(__dirname + '/extr/', true, (err) => console.error(err));
            console.log('done')
        }
    }
})()
