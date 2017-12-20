const fs = require('fs');
const express = require('express');

const Interpolator = require('../src/interpolator').Interpolator;

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  fs.readFile('./index.interpolator.html', (err, data) => {
    let interpolator = new Interpolator({
      template: data.toString(),
      placeholders: {
        ipAddress: req.ip,
        now: (new Date).toString(),
      },
    });
    res.send(interpolator.parse());
  })
});

module.exports = app;
