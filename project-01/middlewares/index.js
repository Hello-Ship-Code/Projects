import fs from 'fs';

function logreq(fileName) {

    return (req,res,next) =>{
    const { method, url } = req;
    const date = new Date();
    const log = `${date} - ${method} - ${url}\n`;

    fs.appendFile(fileName, log, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });

    }
}

export{ logreq, };