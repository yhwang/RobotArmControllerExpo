var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/turn', (req, res) => {
  if (req.query.joint && req.query.direction && req.query.degree) {
    console.log(`turn joint: ${req.query.joint}, direction: ${req.query.direction}, degree: ${req.query.degree}`)
    res.send({"res" : "ok"});
  } else {
    res.send({"res": "failed"});
  }
});

router.post('/run', (req, res) => {
  if (req.query.joint && req.query.direction) {
    console.log(`run joint: ${req.query.joint}, direction: ${req.query.direction}`);
    res.send({"res": "ok"});
  } else {
    res.send({"res": "failed"})
  }
});

router.post('/stop', (req, res) => {
  if (req.query.joint) {
    console.log(`stop joint: ${req.query.joint}`);
    res.send({"res": "ok"});
  } else {
    res.send({"res": "failed"})
  }
});

module.exports = router;
