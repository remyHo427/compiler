import fs from "fs";
import scan from "./scanner";

fs.readFile("./test/test.js", "utf-8", (err, data) => {
    let toks = scan(data);
    console.log(toks, toks.length);
});