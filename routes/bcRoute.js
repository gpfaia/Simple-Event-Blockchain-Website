var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

const BlockChain = require("../public/javascripts/blockchain.js");
const Ticket = require("../public/javascripts/ticket.js");

const ta = new Ticket.TransactionList();
const bc = new BlockChain();
const date = new Date();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/api/getBlockChain", function(req, res, next) {
    res.send({"blockChain" : bc.blockArray});
});

router.get("/api/getlastblock", (req, res) => {
    res.send({"lastBlock" : bc.getLastBlock()});
});

router.post("/api/generateNextBlock", (req, res) => {
    ts = date.getTime();
    const testBlock = bc.generateNextBlock(req.body, ts);
    if (bc.isBlockChainValid(testBlock) && bc.isHashTargetMet(testBlock.getHash())){
        bc.addBlockToChain(testBlock);
        res.send({success:true, message:"Generated New Block"});
    } else {
        res.sendStatus(406)
    }
});

router.post("/api/setTarget", (req, res) => {
    console.log('Updating target from ',bc.target,' to ',req.body.newTargetNum);
    const newTarget = parseInt(req.body.newTargetNum)
    bc.target =  newTarget || 0;
    res.sendStatus(200);
});


router.get("/api/getTarget", (req, res) => {
    res.send({"targetNum" : bc.target});
});


router.get("/api/getTransactionArray", function(req, res, next) {
    res.send({"transactionArray" : ta.transArray});
});

router.post("/api/createTicket", (req, res) => {
    const ticket = new Ticket.Ticket(req.body.sendEmail, req.body.receiveEmail, req.body.Seat, req.body.EventId);
    ta.transArray.push(JSON.stringify(ticket));
    res.sendStatus(200);
});

router.post("/api/updateTransactionArray", function(req, res, next) {
    const newTA = ta.transArray.filter(function(_, index){
        return !req.body.includes(index);
    })
    ta.transArray = newTA
    res.sendStatus(200)
});

module.exports = router;