const {
    getAllWishlists,
    getWishlistByEmail,
    getWishlistById,
    saveWishlist,
    deleteWishlist,
  } = require('../models/wishlistModel');
  
  const getAllWishlistsData = async (req, res) => {
    try {
      const result = await getAllWishlists();
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching wishlists' });
    }
  };
  
  const getWishlistByUserEmail = async (req, res) => {
    try {
      const email = req.params.email;
      const result = await getWishlistByEmail(email);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching wishlist for user' });
    }
  };
  
  const getSingleWishlist = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getWishlistById(id);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching wishlist' });
    }
  };
  
  const saveWishlistData = async (req, res) => {
    try {
      const wishlist = req.body;
      const result = await saveWishlist(wishlist);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error saving wishlist' });
    }
  };
  
  const deleteWishlistById = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await deleteWishlist(id);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error deleting wishlist' });
    }
  };
  
  module.exports = {
    getAllWishlistsData,
    getWishlistByUserEmail,
    getSingleWishlist,
    saveWishlistData,
    deleteWishlistById,
  };