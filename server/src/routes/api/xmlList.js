const {
    Router
} = require("express");
const XML_Model = require("../../../src/models/xml_schema");
const {
    connected
} = require("process");
const multer = require("multer");
const router = Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/payman/#Project/Full-Stack-Web-App/server/src/public/xml')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage
})
router.get("/", async (req, res) => {
    try {
        const xmlList = await XML_Model.find();
        console.log(xmlList);
        if (!xmlList) throw new Error("No item List");
        const stored = xmlList.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        res.status(200).json(stored);
        console.log(req.body);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
router.post("/", upload.single('file'), async (req, res) => {
    console.log(req.file)
    const newXmlList = new XML_Model(req.file);
    try {
        const xmlList = await newXmlList.save();
        if (!xmlList) throw new Error("wrong saving");
        res.status(200).json(xmlList);
        console.log(req.body);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    
});
module.exports = router;