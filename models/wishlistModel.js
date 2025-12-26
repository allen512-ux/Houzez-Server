const { client } = require('../database/db');
const { ObjectId } = require('mongodb');

const db = client.db('housezz');
const wishlistCollection = db.collection('wishlists');

const getAllWishlists = async () => {
  return await wishlistCollection.find().toArray();
};

const getWishlistByEmail = async (email) => {
  const query = { userEmail: email };
  return await wishlistCollection.find(query).toArray();
};

const getWishlistById = async (id) => {
  const query = { _id: new ObjectId(id) };
  return await wishlistCollection.findOne(query);
};

const saveWishlist = async (wishlist) => {
  return await wishlistCollection.insertOne(wishlist);
};

const deleteWishlist = async (id) => {
  const query = { _id: new ObjectId(id) };
  return await wishlistCollection.deleteOne(query);
};

module.exports = {
  getAllWishlists,
  getWishlistByEmail,
  getWishlistById,
  saveWishlist,
  deleteWishlist,
};