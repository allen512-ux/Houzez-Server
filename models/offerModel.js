const { client } = require('../database/db');
const { ObjectId } = require('mongodb');

const db = client.db('housezz');
const offersCollection = db.collection('offers');

const getAllOffers = async (query = {}) => {
  return await offersCollection.find(query).toArray();
};

const getOffersByEmail = async (email) => {
  const query = { buyerEmail: email };
  return await offersCollection.find(query).toArray();
};

const saveOffer = async (offer) => {
  return await offersCollection.insertOne(offer);
};

const updateOfferStatus = async (id, status) => {
  const query = { _id: new ObjectId(id) };
  const update = { $set: { status } };
  return await offersCollection.updateOne(query, update);
};

const updateOtherOffers = async (propertyId, offerId, status) => {
  const query = { propertyId, _id: { $ne: new ObjectId(offerId) } };
  const update = { $set: { status } };
  return await offersCollection.updateMany(query, update);
};

const updateOfferBought = async (id, transactionId) => {
  const query = { _id: new ObjectId(id) };
  return await offersCollection.updateOne(query, {
    $set: { status: 'bought', transactionId },
  });
};

module.exports = {
  getAllOffers,
  getOffersByEmail,
  saveOffer,
  updateOfferStatus,
  updateOtherOffers,
  updateOfferBought,
};