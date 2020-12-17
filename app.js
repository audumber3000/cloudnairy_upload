var express               = require("express"),
    mongoose              = require("mongoose"),

    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    Image                  = require("./models/image"),

	methodOverride  = require("method-override")



var flash = require("connect-flash");




mongoose.connect("mongodb+srv://audumber:Ramdas3000@cluster0-bj3vd.mongodb.net/insta?retryWrites=true&w=majority");


var app = express();
app.use(methodOverride("_method"));//using method-override + what to look for in url *the parentheses as above*

app.use(flash())
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true})); //required for forms that post data via request


app.use(express.static("public"));
// code to set up passport to work in our app -> THESE TWO cdMETHODS/LINES ARE REQUIRED EVERY TIME

//show sign up form
app.get("/image", function(req, res){
    res.render("upload_img");
});

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');



cloudinary.config({
  cloud_name: 'education4ol',
  api_key: '438746385353451',
  api_secret: 'O9_8y7hKmkkUDo6-gqIO2lBg4zw'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
    folder: 'audumber',
    format: ['png', 'jpg','jpeg'] // supports promises as well
});

const upload = multer({storage:storage});

app.post('/image', upload.single('img_link'), function (req, res) {  //save to cloudinary and get back the link and save that to mongo db
     console.log(req.body , req.file)
     

     Image.create({image_name:req.body.img_name , image_link:img}, function(err, img_dt){
     res.send(req.body.img_link);

      })
     res.send("it worked!")
});

app.get('/display_image' , function(req,res){ //display images route
     Image.find({},function(err,all_data){
     console.log(all_data);
     res.render("display_image" ,{all_data:all_data})
  })
})

//-----------------------------------------------------------------------------------------------------------

//handling user sign up
app.post("/register", function(req, res){
    req.body.username;
    req.body.password

console.log("hii audumber")

User.create({username: req.body.username  , password:req.body.password }, function (err, user){
		console.log("reached here")
        if(err) {
            res.redirect("/register");
        } else{
			res.redirect("/facebook");
		}
  })
});




app.listen(3000,function(err){
	if(err){
		console.log("server connection error!!")
		console.log("Reconnecting . . . ")
	}else{
		console.log("connecting . . . ")
		console.log("connected successfully")
	}
})



// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("server started...")
// });
