const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listing = require("./routes/listing");
const review = require("./routes/review.js");

let mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", engine);

app.use(express.static(path.join(__dirname, "public")));

app.use("/listings", listing);
app.use("/listings/:id/reviews", review);

app.get("/", (req, res) => {
  res.send("Working.");
});

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong." } = err;
  res.render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("Listening at port 8080.");
});
