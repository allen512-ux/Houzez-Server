const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/jwtMiddleware');
const { verifyAdmin, verifyAgent } = require('../middlewares/roleMiddleware');
const {
  getUsers,
  getUserRoleByEmail,
  saveUserData,
  updateUserRoleById,
  updateUserFraudStatus,
  deleteUserById,
} = require('../controllers/userController');
const {
  savePropertyData,
  getProperties,
  getSingleProperty,
  getPropertiesByUserEmail,
  updatePropertyStatusById,
  updatePropertyAdvertisementStatus,
  updatePropertyData,
  deletePropertyById,
} = require('../controllers/propertyController');
const {
  getAllWishlistsData,
  getWishlistByUserEmail,
  getSingleWishlist,
  saveWishlistData,
  deleteWishlistById,
} = require('../controllers/wishlistController');
const {
  getAllOffersData,
  getOffersByUserEmail,
  saveOfferData,
  acceptOffer,
  updateOfferBoughtStatus,
  rejectOffer,
} = require('../controllers/offerController');
const {
  getAllReviewsData,
  getReviewsForProperty,
  getReviewsForUser,
  saveReviewData,
  deleteReviewById,
} = require('../controllers/reviewController');

// User Routes
router.get('/users', verifyToken, verifyAdmin, getUsers);
router.get('/user/role/:email', getUserRoleByEmail);
router.post('/users/:email', saveUserData);
router.patch('/user/:id', verifyToken, verifyAdmin, updateUserRoleById);
router.patch('/user/fraud/:id', verifyToken, verifyAdmin, updateUserFraudStatus);
router.delete('/users/delete/:id', verifyToken, verifyAdmin, deleteUserById);

// Property Routes
router.post('/properties', verifyToken, verifyAgent, savePropertyData);
router.get('/properties', getProperties);
router.get('/propertie/:id', verifyToken, getSingleProperty);
router.get('/property/:email', verifyToken, verifyAgent, getPropertiesByUserEmail);
router.patch('/properties/:id', verifyToken, verifyAdmin, updatePropertyStatusById);
router.patch('/properties/:id/advertise', verifyToken, verifyAdmin, updatePropertyAdvertisementStatus);
router.patch('/property/:id', verifyToken, verifyAgent, updatePropertyData);
router.delete('/properties/:id', verifyToken, verifyAgent, deletePropertyById);

// Wishlist Routes
router.get('/wishlist', getAllWishlistsData);
router.get('/wishlist/:email', verifyToken, getWishlistByUserEmail);
router.get('/wishlists/:id', getSingleWishlist);
router.post('/wishlist', saveWishlistData);
router.delete('/wishlist/:id', verifyToken, deleteWishlistById);

// Offer Routes
router.get('/offers', verifyToken, verifyAgent, getAllOffersData);
router.get('/offers/:email', getOffersByUserEmail);
router.post('/offers', verifyToken, saveOfferData);
router.patch('/offers/:id/accept', verifyToken, verifyAgent, acceptOffer);
router.patch('/offers/:id/bought', verifyToken, updateOfferBoughtStatus);
router.patch('/offers/:id/reject', verifyToken, verifyAgent, rejectOffer);

// Review Routes
router.get('/reviews', getAllReviewsData);
router.get('/review/:id', getReviewsForProperty);
router.get('/allreviews/:email', verifyToken, getReviewsForUser);
router.post('/reviews', verifyToken, saveReviewData);
router.delete('/reviews/:id', verifyToken, deleteReviewById);







// Payment Intent Route 
// router.post('/create-payment-intent', async (req, res) => {
//   const { offerAmount } = req.body;
//   const amount = parseInt(offerAmount * 100);
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount,
//     currency: 'usd',
//     payment_method_types: ['card'],
//   });
//   res.send({ clientSecret: paymentIntent.client_secret });
// });

module.exports = router;