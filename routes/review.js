const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateRevieew, isLoggesIn, isReviweAuthor } = require("../middleware.js")

const reviewController = require("../controller/reviews.js")

//Review Route
router.post(
  "/",
  isLoggesIn,
  validateRevieew,
  wrapAsync(reviewController.createReview),
);

//Delete Route
router.delete(
  "/:reviewId",
  isReviweAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
