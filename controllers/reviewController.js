const {
    getAllReviews,
    getReviewsByPropertyId,
    getReviewsByEmail,
    saveReview,
    deleteReview,
  } = require('../models/reviewModel');
  
  const getAllReviewsData = async (req, res) => {
    try {
      const result = await getAllReviews();
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching reviews' });
    }
  };
  
  const getReviewsForProperty = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getReviewsByPropertyId(id);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching reviews for property' });
    }
  };
  
  const getReviewsForUser = async (req, res) => {
    try {
      const email = req.params.email;
      const result = await getReviewsByEmail(email);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching reviews for user' });
    }
  };
  
  const saveReviewData = async (req, res) => {
    try {
      const review = req.body;
      const result = await saveReview(review);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error saving review' });
    }
  };
  
  const deleteReviewById = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await deleteReview(id);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error deleting review' });
    }
  };
  
  module.exports = {
    getAllReviewsData,
    getReviewsForProperty,
    getReviewsForUser,
    saveReviewData,
    deleteReviewById,
  };