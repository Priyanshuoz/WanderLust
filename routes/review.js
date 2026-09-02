const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateRevieew, isLoggesIn, isReviweAuthor } = require("../middleware.js")


//Review Route
router.post(
  "/",
  isLoggesIn,
  validateRevieew,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.review.push(newReview);

    await listing.save();
    await newReview.save();

    req.flash("success", "Review Created successfully!");

    res.redirect(`/listings/${listing._id}`);
  }),
);

//Delete Route
router.delete(
  "/:reviewId",
  isReviweAuthor,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  }),
);

module.exports = router;
