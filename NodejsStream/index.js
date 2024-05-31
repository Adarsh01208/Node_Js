const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");
const app = express();

app.use(status())
// using readfile method it uses lot of memory
// app.get("/", (req, res) => {
//     fs.readFile("sample.txt", "utf8", (err, data) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         res.send(data);
//     }
//     );
// });

// using readstream method it uses less memory
app.get("/", (req, res) => {
    const readStream = fs.createReadStream("sample.txt", "utf8");
    readStream.on("open", () => {
        readStream.pipe(res);
    });
    readStream.on("error", (err) => {
        console.error(err);
        res.end(err);
    });
});

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});


