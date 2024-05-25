const fs = require("fs");
const { isDataView } = require("util/types");
//sync file handling
//fs.writeFileSync("file.txt", "Hello World synchronous\n ");  

//async file handling
fs.writeFile("file.txt", "Hello World asynchronous", (err) => {
    if(err) throw err;
    console.log("File written successfully");
});


// async file handling
// fs.readFile("file.txt", "utf8", (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

// sync file handling
// const data = fs.readFileSync("file.txt", "utf8");
// console.log(data);

// fs.appendFileSync("file.txt",`${Date()}\nHello Adarsh`);
// fs.appendFileSync("file.txt", "\nThis is a new line of text");

// //copy file
//  fs.copyFileSync("file.txt", "file2.txt");

//  //delete file
//     fs.unlinkSync("file2.txt");

// //rename file
// fs.renameSync("file.txt", "file3.txt");

//statistical information
const stats = fs.statSync("file3.txt");
console.log(stats);


//difference between blocking and non-blocking code

//blocking code
// const fs = require("fs");
// let data = fs.readFileSync("file.txt", "utf8");
// console.log(data);
// console.log("This is a message");

//non-blocking code
// const fs = require("fs");
// fs.readFile("file.txt", "utf8", (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

// console.log("This is a message");


