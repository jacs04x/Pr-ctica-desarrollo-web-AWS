//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/candidatos'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/candidatos/' }),
);

app.listen(process.env.PORT || 8080);