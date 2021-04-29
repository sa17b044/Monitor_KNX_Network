const {
    Router
} = require("express");
const fs = require("fs");
const cp = require("child_process");
const Policy_Model = require("/home/payman/#Project/Full-Stack-Web-App/server/src/models/policy_schema.js");
const Server_Model = require("/home/payman/#Project/Full-Stack-Web-App/server/src/models/server_schema.js");
const Pcap_Model = require("/home/payman/#Project/Full-Stack-Web-App/server/src/models/pcap_schema.js");
//iptables -A INPUT -s IP-ADDRESS -p tcp --destination-port port_number -j DROP
const {
    ConnectionStates
} = require("mongoose");
const {
    CommandCursor
} = require("mongodb");
const {
    countDocuments
} = require("/home/payman/#Project/Full-Stack-Web-App/server/src/models/policy_schema.js");
const {
    config
} = require("process");

const multer = require("multer");
const router = Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/payman/#Project/Full-Stack-Web-App/server/src/public/pcap')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage
})

// const router = Router();
// .sort({"datetime": -1}).limit(1)


//################################# - - - > Log
router.post("/", upload.single('file'), async (req, res) => {

    const newPcapList = new Pcap_Model(req.file);
    try {
        const pcapList = await newPcapList.save();
        if (!pcapList) throw new Error("wrong saving");
        res.status(200).json(pcapList);
        // console.log(req.body);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

    let i = 0;
    let j = 0;
    // --------------------------------> policy
    const arrayPolicy = await Policy_Model.find();
    //console.log(arrayPolicy)
    const arrayElPolicy = [];
    arrayPolicy.forEach(elPolicy => {
        ++i
        //####################################### -> individual_addressing
        let templateIndividual_addressing = 'individual_addressing = ' + elPolicy.individual_addressing + ',';
        //####################################### -> inspection
        if (elPolicy.inspection === 'true') {
            elPolicy.inspection = 'inspection = true,'
        } else
            elPolicy.inspection = ''
        let inspection = elPolicy.inspection;
        //############################### -> templateServices
        let services = [];
        elPolicy.services.forEach(elServices => {
            if (elServices.select !== '') {
                services.push(`'${elServices.select}'`)
            } else
                services = undefined;
        });
        let templateServices = ``;
        if (!services) {
            templateServices = "";
        } else {
            templateServices = `services = {${services}},`;
        }
        //############################### -> templateApp_services
        let app_services = [];
        elPolicy.app_services.forEach(elApp_services => {
            if (elApp_services.select_app !== '') {
                app_services.push(`'${elApp_services.select_app}'`)
            } else
                app_services = undefined;
        });
        let templateApp_services = ``;
        if (!app_services) {
            templateApp_services = "";
        } else {
            templateApp_services = `app_services = {${app_services}},`;
        }
        //####################################### -> detection
        if (elPolicy.detection === 'true') {
            elPolicy.detection = 'detection = true,'
        } else
            elPolicy.detection = ''
        let detection = elPolicy.detection;
        //####################################### -> group_address_level
        if (elPolicy.group_address_level !== '') {
            elPolicy.group_address_level = `group_address_level = ${elPolicy.group_address_level},`
        } else
            elPolicy.group_address_level = ''
        let group_address_level = elPolicy.group_address_level;
        //###################################### -> group_address_file 
        elPolicy.group_address_file = `group_address_file = '/home/payman/#Project/Full-Stack-Web-App/server/src/public/xml/${elPolicy.group_address_file}',`
        let group_address_file = elPolicy.group_address_file
        //###################################### -> payload
        if (elPolicy.payload === 'true') {
            elPolicy.payload = 'payload = true,'
        } else
            elPolicy.payload = ''
        let payload = elPolicy.payload
        //######################################## -> header
        if (elPolicy.header === 'true') {
            elPolicy.header = 'header = true,'
        } else
            elPolicy.header = ''
        let header = elPolicy.header;
        arrayElPolicy.push({
            templateIndividual_addressing,
            inspection,
            templateServices,
            templateApp_services,
            detection,
            group_address_level,
            group_address_file,
            payload,
            header
        })
    });
    // ####################################### -> Server
    const arrayServer = await Server_Model.find();
    const arrayElServer = [];
    arrayServer.forEach(elServer => {
        ++j
        //################################### -> From
        if (elServer.src_ip !== '') {
            elServer.src_ip = `from = '${elServer.src_ip}',`
        } else
            elServer.src_ip = ''
        let from = elServer.src_ip;
        //################################### -> to
        if (elServer.dst_ip !== '') {
            elServer.dst_ip = `to = '${elServer.dst_ip}',`
        } else
            elServer.dst_ip = ''
        let to = elServer.dst_ip;
        //################################### -> port
        let ports = [];
        elServer.src_port.forEach(elPort => {
            if (elPort.sPort !== '') {
                ports.push(`${elPort.sPort}`)
            } else
                ports = undefined;
        });
        let templatePorts = ``;
        if (!ports) {
            templatePorts = "";
        } else {
            templatePorts = `port = {${ports}},`;
        }
        //################################### -> policy
        let policy = 'policy = ' + elServer.policy + ',';
        //################################### -> logKNXnetip
        if (elServer.logKNXnetip === 'true') {
            elServer.logKNXnetip = 'log_knxnetip = true,';
        } else
            elServer.logKNXnetip = '';
        let log_knxnetip = elServer.logKNXnetip;
        //################################## ->
        let log_to_file = 'log_to_file = ' + elServer.logToFile + ',';
        arrayElServer.push({
            from,
            to,
            templatePorts,
            policy,
            log_knxnetip,
            log_to_file
        })
    });
    const tempPolicy = Object.values(arrayElPolicy)
    let luaPolicy = "";
    tempPolicy.forEach((value) => {
        luaPolicy += `
        {
        ${value.templateIndividual_addressing}
        ${value.inspection}
        ${value.templateServices}
        ${value.templateApp_services}
        ${value.detection}
        ${value.group_address_level}
        ${value.group_address_file}
        ${value.payload}
        ${value.header}
        },
        `;
    });
    const tempServer = Object.values(arrayElServer);
    let luaServer = "";
    tempServer.forEach((value) => {
        luaServer += `
        {
        ${value.from}
        ${value.to}
        ${value.templatePorts}
        ${value.policy}
        ${value.log_knxnetip}
        ${value.log_to_file}
        },
        `;
    });

    // console.log(luaServer)
    const templateLua = `
---------------------------------------------------------------------------
-- Snort++ configuration
---------------------------------------------------------------------------

---------------------------------------------------------------------------
-- 1. configure environment
---------------------------------------------------------------------------

-- this depends on LUA_PATH
-- used to load this conf into Snort
require('snort_config')

-- this depends on SNORT_LUA_PATH
-- where to find other config files
-- conf_dir = os.getenv('SNORT_LUA_PATH')
conf_dir = '/opt/snort-sabic/etc/snort'

if ( not conf_dir ) then
    conf_dir = '.'
end

---------------------------------------------------------------------------
-- 2. configure defaults
---------------------------------------------------------------------------

HOME_NET = '172.22.0.0/16'
EXTERNAL_NET = '! ' .. HOME_NET

KNX_NET = [[172.22.10.76/32 172.22.10.77/32]]
BAC_NET = [[172.22.11.76/32 172.22.11.77/32]]
ENO_NET = '172.22.13.76/32'

dofile(conf_dir .. '/snort_defaults.lua')
-- dofile(conf_dir .. '/file_magic.lua')

---------------------------------------------------------------------------
-- 3. configure inspection
---------------------------------------------------------------------------
stream = { }
stream_ip = { }
stream_tcp = { }
stream_udp = { }

knxnetip = 
{ 
    -- global_policy = 0,
    policies =
    {${luaPolicy}},
    servers = 
    {${luaServer}},
}

---------------------------------------------------------------------------
-- 4. configure bindings
---------------------------------------------------------------------------

binder =
{
    -- { when = { proto = 'udp', ports = '3671' }, use = { type = 'knxnetip' } },
    { when = { proto = 'any', ports = 'any' }, use = { type = 'knxnetip' } },
    -- { when = { service = 'knxnetip' },         use = { type = 'knxnetip' } }
}

---------------------------------------------------------------------------
-- 5. configure performance
---------------------------------------------------------------------------

-- perf_monitor = 
-- {
--     modules = {},
--     flow = true,
--     flow_ip = true,
--     cpu = true
-- }

---------------------------------------------------------------------------
-- 6. configure detection
---------------------------------------------------------------------------

references = default_references
classifications = default_classifications

ips =
{
    -- use this to enable decoder and inspector alerts
    enable_builtin_rules = true,

    -- use include for rules files; be sure to set your path
    -- note that rules files can include other rules files
    --include = 'snort3_community.rules'
}

---------------------------------------------------------------------------
-- 7. configure filters
---------------------------------------------------------------------------

---------------------------------------------------------------------------
-- 8. configure outputs
---------------------------------------------------------------------------

-- event logging
-- you can enable with defaults from the command line with -A <alert_type>
-- uncomment below to set non-default configs
alert_csv = 
{
    file = true,
    fields = { action, class, gid }
}
alert_fast = 
{
    file = true,
    packet = true
}
alert_full = 
{
    file = true,
}
alert_sfsocket = { }
alert_syslog = { }
unified2 = { }
--  packet logging
-- you can enable with defaults from the command line with -L <log_type>
log_codecs = { 
    file = true,
    msg = true
}
log_hext = 
{
    file = true,
    raw = true
}
log_pcap = { }
--  additional logs
packet_capture = { }
file_log =
{
    log_pkt_time = true,
    log_sys_time = true,
}
    `;

    fs.writeFile("/opt/snort-sabic/etc/snort.lua", templateLua, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("successfully");
    });

});

router.get("/sse", async (req, res) => {
    const pcapList = await Pcap_Model.find().limit(1).sort({
        "createdAt": -1
    });
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', "no-cache");
    let output = '';
    const pcap = '-r /home/payman/#Project/Full-Stack-Web-App/server/src/public/pcap/'+pcapList[0].originalname
    const snort_lua = '-c /opt/snort-sabic/etc/snort.lua'
    const rule = '-R /home/payman/snort_src/snort3/etc/rules/local.rules'
    let cmd = `snort ${snort_lua} ${rule} ${pcap} -A alert_full -d -X -e`
    console.log('############')
    console.log(cmd)
    const {
        stdout,
        stderr
    } = await cp.exec(cmd)
    let allOutput = "";
    let count = 0;
    stdout.on("data", (chunk) => {
        output = chunk.toString();
        console.log(output)
        allOutput += output;
        count++;
        console.log(allOutput)
        console.log("SEND DATA TO CLIENT")
        const reg = /\+\+\s+\[\d+\][^;]*\-\-\s+\[\d+\]/gm;
        allOutput = allOutput.match(reg)
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
//These modules perform a variety of functions, including analysis of protocols beyond basic decoding.