const { client } = require('../database/db');
const { ObjectId } = require('mongodb');

const db = client.db('housezz');
const reviewsCollection = db.collection('reviews');

const getAllReviews = async () => {
  return await reviewsCollection.find().sort({ date: -1 }).toArray();
};

const getReviewsByPropertyId = async (id) => {
  const query = { propertyId: id };
  return await reviewsCollection.find(query).toArray();
};

const getReviewsByEmail = async (email) => {
  const query = { userEmail: email };
  return await reviewsCollection.find(query).toArray();
};

const saveReview = async (review) => {
  review.date = new Date();
  return await reviewsCollection.insertOne(review);
};

const deleteReview = async (id) => {
  const query = { _id: new ObjectId(id) };
  return await reviewsCollection.deleteOne(query);
};

module.exports = {
  getAllReviews,
  getReviewsByPropertyId,
  getReviewsByEmail,
  saveReview,
  deleteReview,
};