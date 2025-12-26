const {
    getAllOffers,
    getOffersByEmail,
    saveOffer,
    updateOfferStatus,
    updateOtherOffers,
    updateOfferBought,
  } = require('../models/offerModel');
  
  const getAllOffersData = async (req, res) => {
    try {
      const email = req.query.email;
      const status = req.query.status;
  
      if (status) {
        const query = { status };
        const result = await getAllOffers(query);
        return res.send(result);
      }
  
      if (email) {
        const query = { agentEmail: email };
        const result = await getAllOffers(query);
        return res.send(result);
      }
  
      const result = await getAllOffers();
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching offers' });
    }
  };
  
  const getOffersByUserEmail = async (req, res) => {
    try {
      const email = req.params.email;
      const result = await getOffersByEmail(email);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching offers for user' });
    }
  };
  
  const saveOfferData = async (req, res) => {
    try {
      const offer = req.body;
      const result = await saveOffer(offer);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error saving offer' });
    }
  };
  
  const acceptOffer = async (req, res) => {
    try {
      const offerId = req.params.id;
      const { propertyId } = req.body;
  
      await updateOfferStatus(offerId, 'accepted');
      const rejectResult = await updateOtherOffers(propertyId, offerId, 'rejected');
  
      res.send({
        message: 'Offer accepted, and other offers rejected successfully.',
        rejectedCount: rejectResult.modifiedCount,
      });
    } catch (error) {
      res.status(500).send({ error: 'Failed to update offers.' });
    }
  };
  
  const updateOfferBoughtStatus = async (req, res) => {
    try {
      const id = req.params.id;
      const transactionId = req.body;
      const result = await updateOfferBought(id, transactionId);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error updating offer bought status' });
    }
  };
  
  const rejectOffer = async (req, res) => {
    try {
      const offerId = req.params.id;
      const { propertyId } = req.body;
      const rejectResult = await updateOfferStatus(offerId, 'rejected');
  
      res.send({
        message: 'Offer rejected successfully.',
        rejectedCount: rejectResult.modifiedCount,
      });
    } catch (error) {
      res.status(500).send({ error: 'Failed to update offers.' });
    }
  };
  
  module.exports = {
    getAllOffersData,
    getOffersByUserEmail,
    saveOfferData,
    acceptOffer,
    updateOfferBoughtStatus,
    rejectOffer,
  };