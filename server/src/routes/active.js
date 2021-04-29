const Router = require("express");
const cp = require("child_process");
const router = Router();

router.get("/", async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', "no-cache");
    let output = '';
    const cmdActive = `sudo /opt/snort-sabic/bin/snort -c /opt/snort-sabic/etc/snort.lua -i ens33 -A alert_full -d -X -e -s 65535 -k none`
    const {
        stdout,
        stderr
    } = await cp.exec(cmdActive, {
        env: {
            LUA_PATH: "/opt/snort-sabic/include/snort/lua/?.lua;\;"
        }
    })
    let allOutput = "";
    let count = 0;
    stdout.on("data", (chunk) => {
        output = chunk.toString();
        allOutput += output;
        count++;
        res.write("data:" + JSON.stringify({
            allOutput,
            count
        }) + "\n\n")
    })
    stdout.on('end', () => {
        console.log('Finished data chunks.');
    });
});

module.exports = router;