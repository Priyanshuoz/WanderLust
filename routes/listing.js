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

//Index Route
router.get("/", wrapAsync(listingControler.index));

//New Route
router.get("/new", isLoggesIn, (req, res) => {
  res.render("listings/new.ejs");
});

router.post(
  "/",
  isLoggesIn,
  validateListing,
  wrapAsync(listingControler.renderNewForm),
);

//Show Route
router.get("/:id", wrapAsync(listingControler.showListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggesIn,
  isOwner,
  wrapAsync(listingControler.createListing),
);

router.put(
  "/:id",
  isLoggesIn,
  isOwner,
  validateListing,
  wrapAsync(listingControler.updateListing),
);

//Delete Route
router.delete(
  "/:id",
  isLoggesIn,
  isOwner,
  wrapAsync(listingControler.destroyLisitng),
);

module.exports = router;