var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground")
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")


// Seeddatabase
// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Rose is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp has started!");
});