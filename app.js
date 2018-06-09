var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground")
var seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res) { 
    // Get all campgrounds from DB
    //INDEX - Shows all campgrounds
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    // CREATE - adds new campgrounds
    var name = req.body.name;
    var image = req.body.image
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else { 
            res.redirect("/campgrounds");
        }
    });
});


app.get("/campgrounds/new", function(req, res) {
    //NEW - displays form to make a new dog
    res.render("campgrounds/new");
})

// SHOW - Show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//============================ COMMENTS

app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp has started!");
});