import React, { useState } from "react";
import classes from "../styles/Review.module.css";
import { useOutletContext } from "react-router-dom";

function Review() {
  const { updatereviewData } = useOutletContext();
  const [reviewData, setReviewData] = useState({
    reviewImage: "",
    rating: "",
    review: "",
    reviewDate: "",
    country: "",
  });
  const [rating, setRating] = useState(0);

  return (
    <div className={classes.container}>
      <h1>Review</h1>
      <form>
        {/* File Upload */}
        <div className={classes.form_group}>
          <label htmlFor="file">Upload File:</label>
          <input
            type="file"
            id="file"
            name="file"
            
            onChange={(e) => {
              const newValue = e.target.files[0];
              setReviewData((prev) => {
                const updatedReviewData = { ...prev, reviewImage: newValue };
                updatereviewData(updatedReviewData);
                return updatedReviewData;
              });
            }}
          />
        </div>

        {/* Star Rating */}
        <div className={classes.form_group}>
          <label>Rating:</label>
          <div className={classes.rating}>
            {[...Array(5)].map((star, index) => (
              <span
                key={index}
                className={`${classes.star} ${
                  index < rating ? classes.filled : ""
                }`}
                onClick={() => {
                  setRating(index + 1);
                  const newValue = index + 1;
                  setReviewData((prev) => {
                    const updatedReviewData = { ...prev, rating: newValue };
                    updatereviewData(updatedReviewData);
                    return updatedReviewData;
                  });
                }}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>

        {/* Review Textarea */}
        <div className={classes.form_group}>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            rows="4"
            placeholder="Write your review here..."
            value={reviewData.review}
            onChange={(e) => {
              const newValue = e.target.value;
              setReviewData((prev) => {
                const updatedReviewData = { ...prev, review: newValue };
                updatereviewData(updatedReviewData);
                return updatedReviewData;
              });
            }}
          ></textarea>
        </div>

        <div className={classes.bottom_inputs}>
          {/* Review Date */}
          <div className={classes.form_group}>
            <label htmlFor="reviewDate">Review Date:</label>
            <input
              type="date"
              id="reviewDate"
              name="reviewDate"
              value={reviewData.reviewDate}
              onChange={(e) => {
                const newValue = e.target.value;
                setReviewData((prev) => {
                  const updatedReviewData = { ...prev, reviewDate: newValue };
                  updatereviewData(updatedReviewData);
                  return updatedReviewData;
                });
              }}
            />
          </div>

          {/* Country Field */}
          <div className={classes.form_group}>
            <label htmlFor="country">Country:</label>
            <select
              id="country"
              name="country"
              value={reviewData.country}
              onChange={(e) => {
                const newValue = e.target.value;
                console.log(newValue);
                
                setReviewData((prev) => {
                  const updatedReviewData = { ...prev, country: newValue };
                  updatereviewData(updatedReviewData);
                  return updatedReviewData;
                });
              }}
            >
              <option defaultValue="" >Choose country</option>
              <option  value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
              {/* Add more countries as needed */}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Review;
