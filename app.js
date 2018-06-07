var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/90255/feature_Julia_Pfeiffer_Burns_State_Park-f2.jpg"},
        {name: "Granite Hill", image: "https://www.campsitephotos.com/photo/camp/3880/feature_Nevada_St_Beach-f2.jpg"},
        {name: "Mountain Goat's Rest", image: "https://www.campsitephotos.com/photo/camp/33819/feature_Blue_Spring_State_Park-f4.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp has started!");
});