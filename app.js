var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);
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
    var newCampground = {name: name, image: image};
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
    Campground.FindById(req.params.id, function (err, foundCampground){
       if(err){
           console.log(err);
       } else {
           //render show template with that campground
           res.render("show", {campground: foundCampground});
       }
    });
    // render show template with the campground
    res.render("show");
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp has started!");
});