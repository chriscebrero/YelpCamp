var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://www.campsitephotos.com/photo/camp/3880/feature_Nevada_St_Beach-f2.jpg",
//         description: "This is a huge Granite Hill, no bathrooms, no water, beautiful granite."
        
//     },
//      function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("newly created campground: ");
//         console.log(campground);
//     }
// });

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
            res.render("index", {campgrounds:allCampgrounds});
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
    res.render("new.ejs");
})

// SHOW - Show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp has started!");
});