const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get("/*", function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, "index.js"));
});

app.get('/cors', (req, res) => {
    res.send('This has CORS enabled 🎈')
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
})
app.listen(8080, () => {
    console.log('listening on port 8080')
})