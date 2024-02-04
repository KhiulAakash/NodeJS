const data=require("./data")
const http = require("http");

http
  .createServer((res, resp) => {
    resp.writeHead(200, { "Content-Type": "applicationjson" });
    resp.write(
      JSON.stringify(data)
    );
    resp.end();
  })
  .listen(4500);
