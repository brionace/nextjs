// const express = require("express");
// const app = express();
// const path = require("path");

// app.use(express.static("../../public"));
// app.use(express.static(".next"));
// // app.use(express.static(".next/static"));
// app.use((req, res, next) => {
//   // res.sendFile(path.join(__dirname, "", ".next/static", "index.html"));
//   res.sendFile(path.join(__dirname, "", "node_modules/.bin", "next"));
//   console.log(path.join(__dirname, "", ".next/server/app", "index.html"));
//   res.sendFile(path.join(__dirname, "", ".next/server/app", "index.html"));
// });

// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
//============================================================
// const express = require("express");
// const next = require("next");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app
//   .prepare()
//   .then(() => {
//     const server = express();

//     server.get("*", (req, res) => {
//       return handle(req, res);
//     });

//     server.listen(3000, (err) => {
//       if (err) throw err;
//       console.log("> Ready on http://localhost:3000");
//     });
//   })
//   .catch((ex) => {
//     console.error(ex.stack);
//     process.exit(1);
//   });
//============================================================
// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = 3001;
// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer(async (req, res) => {
//     try {
//       // Be sure to pass `true` as the second argument to `url.parse`.
//       // This tells it to parse the query portion of the URL.
//       const parsedUrl = parse(req.url, true);
//       const { pathname, query } = parsedUrl;

//       if (pathname === "/a") {
//         await app.render(req, res, "/a", query);
//       } else if (pathname === "/b") {
//         await app.render(req, res, "/b", query);
//       } else {
//         await handle(req, res, parsedUrl);
//       }
//     } catch (err) {
//       console.error("Error occurred handling", req.url, err);
//       res.statusCode = 500;
//       res.end("internal server error");
//     }
//   })
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`);
//     });
// });
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
// write expressjs code to serve a nextjs app
// const express = require("express");  // import expressjs library
