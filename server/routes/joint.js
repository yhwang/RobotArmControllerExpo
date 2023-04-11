var express = require('express');
var router = express.Router();
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
var port = new SerialPort({
   path: '/dev/ttyACM0',
   baudRate: 115200,
   parity: 'N',
   dataBits: 8,
   stopBits: 1,
   rtscts: false,
   hupcl: false,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
parser.on('data', data =>{
  console.log(`Res: ${data}`);
});

/* GET home page. */
router.post('/turn', (req, res) => {
  if (req.query.joint && req.query.direction && req.query.degree) {
    port.write(`/${req.query.joint}/MOVE/${req.query.direction}/${req.query.degree}\n`);
    port.drain(err => {
      if (err) {
        res.send({"res": "failed"});
      } else {
        res.send({"res" : "ok"});
      }
    });
  } else {
    res.send({"res": "failed"});
  }
});

router.post('/run', (req, res) => {
  if (req.query.joint && req.query.direction) {
    port.write(`/${req.query.joint}/GO/${req.query.direction}\n`);
    port.drain(err => {
      if (err) {
        res.send({"res": "failed"});
      } else {
        res.send({"res" : "ok"});
      }
    });
  } else {
    res.send({"res": "failed"})
  }
});

router.post('/stop', (req, res) => {
  if (req.query.joint) {
    port.write(`/${req.query.joint}/STOP\n`);
    port.drain(err => {
      if (err) {
        res.send({"res": "failed"});
      } else {
        res.send({"res" : "ok"});
      }
    });
  } else {
    res.send({"res": "failed"})
  }
});

module.exports = router;
