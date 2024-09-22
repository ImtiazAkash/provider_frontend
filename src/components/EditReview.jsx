import React, { useEffect, useState } from "react";
import classes from "../styles/Review.module.css";
import styles from "../styles/EditReview.module.css";
import {
  CloseOutlined,
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";

export default function EditReview() {
  const location = useLocation();
  const { provider } = location.state;
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [reviewData, setReviewData] = useState({
    reviewImagePath: "",
    reviewImage: "",
    rating: "",
    review: "",
    reviewDate: "",
    reviewCountry: "",
  });

  const [reviewList, setReviewList] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    console.log(provider.reviews);
    
    setReviewList(provider.reviews);
    console.log(reviewList);
    
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    console.log(reviewList);
    
    setModalVisible(false);
    setReviewData({
      reviewImage: "",
      rating: "",
      review: "",
      reviewDate: "",
      reviewCountry: "",
    });
    setEditIndex(null);
    setRating(0);

  };

  const onEdit = (reviewData, index) => {
    reviewData.reviewDate = dateFormatCode(reviewData.reviewDate);
    console.log(reviewData.reviewDate);

    setRating(reviewData.rating);
    setReviewData(reviewData);
    setEditIndex(index);
    showModal();
  };

  const dateFormatCode = (date) => {
    return date.split("T")[0];
  };
  const dateFormat = (date) => {
    date = new Date(date);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const onReviewAdd = () => {
    console.log(3333333333333333);
    
    if (reviewData.review && reviewData.rating && reviewData.reviewDate) {
      if (editIndex !== null) {
        console.log(provider);
        
        const updatedReviews = [...reviewList];
        updatedReviews[editIndex] = reviewData;
        setReviewList(updatedReviews);
        setEditIndex(null);
      } else {
        console.log(provider);
        
        setReviewList([...reviewList, reviewData]);
      }

      setReviewData({
        reviewImage: "",
        rating: "",
        review: "",
        reviewDate: "",
        reviewCountry: "",
      });
      closeModal();
    }
  };

  const submitReviws = async () => {
    const formData = new FormData();
    reviewList.forEach((review, index) => {
      
      formData.append(`reviews[${index}].review`, review.review );
      formData.append(`reviews[${index}].reviewDate`, review.reviewDate );
      formData.append(`reviews[${index}].reviewCountry`, review.reviewCountry );
      formData.append(`reviews[${index}].rating`, review.rating );
      if (review.reviewImage) {
        formData.append(`reviews[${index}].reviewImage`, review.reviewImage);
      } else {
        formData.append(`reviews[${index}].reviewImagePath`, review.reviewImagePath || "");
      }
    })
    console.log(formData);
    
    let token = sessionStorage.getItem("jwtToken");
    try {
      const response = await axios.post(
        `http://localhost:8080/${provider.providerId}/replace-reviews`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );

      if (response.status === 200) {
        console.log("Awards added successfully:", response.data);
      } else {
        console.error("Failed to add awards");
      }
    } catch (error) {
      console.error("Error while adding awards:", error);
    }
  };
  return (
    <>
      <div className={styles.reviewContainer}>
        <div className={styles.reviewHeader}>
          <h3>Review</h3>
          <button onClick={showModal}>
            <PlusOutlined /> Add New
          </button>
        </div>

        <div className={`modal ${modalVisible ? "show" : "hide"}`}>
          <div className="modal-content">
            <form>
              <div style={{ textAlign: "right" }}>
                <Button type="text" onClick={closeModal}>
                  <CloseOutlined />
                </Button>
              </div>
              <div className={classes.form_group}>
                <label htmlFor="file">Upload File:</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={(e) => {
                    setReviewData({
                      ...reviewData,
                      reviewImage: e.target.files[0],
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
                        setReviewData({ ...reviewData, rating: newValue });
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
                  onChange={(e) =>
                    setReviewData({ ...reviewData, review: e.target.value })
                  }
                ></textarea>
              </div>

              <div className={classes.bottom_inputs}>
                <div className={classes.form_group}>
                  <label htmlFor="reviewDate">Review Date:</label>
                  <input
                    type="date"
                    id="reviewDate"
                    name="reviewDate"
                    value={reviewData.reviewDate}
                    onChange={(e) => {
                      setReviewData({
                        ...reviewData,
                        reviewDate: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className={classes.form_group}>
                  <label htmlFor="country">Country:</label>
                  <select
                    id="country"
                    name="country"
                    value={reviewData.reviewCountry}
                    onChange={(e) => {
                      setReviewData({
                        ...reviewData,
                        reviewCountry: e.target.value,
                      });
                    }}
                  >
                    <option defaultValue="">Choose country</option>
                    <option value="USA">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">United Kingdom</option>
                    
                  </select>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <button type="button" onClick={onReviewAdd}>
                  {editIndex !== null ? "Update Review" : "Add Review"}
                </button>
                
              </div>
            </form>
          </div>
        </div>

        <div className={styles.reviewList}>
          {reviewList.length > 0 ? (
            reviewList.map((review, index) => (
              <div key={index} className={styles.reviewItem}>
                <div style={{ display: "flex" }}>
                  <TrophyOutlined style={{ fontSize: "6rem" }} />
                  <hr />
                </div>
                <div>
                  <div className={styles.reviewStarAndDate}>
                    <div className={classes.rating}>
                      {[...Array(5)].map((star, index) => (
                        <span
                          key={index}
                          style={{ fontSize: "1rem" }}
                          className={`${classes.star} ${
                            index < review.rating ? classes.filled : ""
                          }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <div style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
                      {dateFormat(review.reviewDate)}
                    </div>
                  </div>
                  <p>{review.review}</p>
                  <h5> - user</h5>
                  <p>{review.country}</p>
                </div>
                <div
                  style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}
                >
                  <EditFilled
                    style={{ fontSize: "1.5rem" }}
                    onClick={() => onEdit(review, index)}
                  />{" "}
                  <DeleteFilled
                    style={{ fontSize: "1.5rem" }}
                    onClick={() =>
                      setReviewList(reviewList.filter((_, i) => i !== index))
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No reviews added yet.</p>
          )}
        </div>
      </div>
      <div className={classes.bottomButtons}>
        <button style={{ backgroundColor: "#ffffff", color: "#000000" }}>
          Cancel
        </button>
        <button onClick={submitReviws}>Save Changes</button>
      </div>
    </>
  );
}
