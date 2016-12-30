var	express  = require("express"),
bp = require("body-parser"),
path = require("path"),
helmet = require("helmet"),
expressJwt = require("express-jwt"),
cookieParser = require("cookie-parser"),
fs = require("fs"),
root = __dirname,
port = process.env.PORT || 8000,
app = express();

app.use(express.static(path.join(root, "client")));
app.use(express.static(path.join(root, "bower_components")));
app.use(bp.json());
app.use(helmet());
app.use("/api", expressJwt({secret: fs.readFileSync("keys/jwt", "utf8")}));
app.use(cookieParser());

// Config
require("./server/config/mysql.js");
require("./server/config/routes.js")(app);

var server = app.listen(port, function() {
	console.log(`server running on port ${ port }`);
});

require("./server/config/socket.js")(server);

