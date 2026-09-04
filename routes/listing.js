const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const {
  isLoggedIn,
  isLoggesIn,
  isOwner,
  validateListing,
} = require("../middleware.js");
const listingControler = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingControler.index))
  .post(
    isLoggesIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingControler.renderNewForm),
  );

//New Route
router.get("/new", isLoggesIn, (req, res) => {
  res.render("listings/new.ejs");
});

router
  .route("/:id")
  .get(wrapAsync(listingControler.showListing))
  .put(
    isLoggesIn,
    isOwner,
    validateListing,
    wrapAsync(listingControler.updateListing),
  )
  .delete(isLoggesIn, isOwner, wrapAsync(listingControler.destroyLisitng));

//Edit Route
router.get(
  "/:id/edit",
  isLoggesIn,
  isOwner,
  wrapAsync(listingControler.createListing),
);

module.exports = router;
