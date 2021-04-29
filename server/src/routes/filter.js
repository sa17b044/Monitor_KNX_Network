const Router = require("express");
const cp = require("child_process");
const router = Router();

router.post("/block", async (req, res) => {
    console.log(req.body)
    console.log(req.body.port)
    console.log(req.body.ip)
    const port_number = req.body.port;
    const ip_address = req.body.ip;
    cmd = `sudo iptables -A INPUT -s ${ip_address} -p tcp --destination-port ${port_number} -j DROP
`
    cp.exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
});
router.post("/unblock", async (req, res) => {
    console.log(req.body)
    console.log(req.body.port)
    console.log(req.body.ip)
    const port_number = req.body.port;
    const ip_address = req.body.ip;
    cmd = `sudo iptables -D INPUT -s ${ip_address} -p tcp --destination-port ${port_number} -j DROP
    `
    cp.exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
});
module.exports = router;