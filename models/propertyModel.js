const { client } = require('../database/db');
const { ObjectId } = require('mongodb');

const db = client.db('housezz');
const propertiesCollection = db.collection('properties');

// Save a new property
const saveProperty = async (property) => {
  return await propertiesCollection.insertOne(property);
};

// Get all properties (with optional query and sorting)
const getAllProperties = async (query = {}, sort = {}) => {
  return await propertiesCollection.find(query).sort(sort).toArray();
};

// Get a single property by ID
const getPropertyById = async (id) => {
  return await propertiesCollection.findOne({ _id: new ObjectId(id) });
};

//  Get properties by agent email
const getPropertiesByEmail = async (email) => {
  return await propertiesCollection.find({ agentEmail: email }).toArray();
};

// Update property verification status
const updatePropertyStatus = async (id, verificationStatus) => {
  return await propertiesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { verificationStatus, verified: verificationStatus === 'verified' } }
  );
};

// Update property advertisement status
const updatePropertyAdvertisement = async (id, isAdvertised) => {
  return await propertiesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { isAdvertised } }
  );
};

// Update property details
const updateProperty = async (id, data) => {
  return await propertiesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data },
    { upsert: true }
  );
};

// Delete property
const deleteProperty = async (id) => {
  return await propertiesCollection.deleteOne({ _id: new ObjectId(id) });
};

// Update properties for an agent
const updatePropertiesByAgent = async (agentEmail, verified, verificationStatus) => {
  return await propertiesCollection.updateMany(
    { agentEmail },
    { $set: { verified, verificationStatus } }
  );
};

module.exports = {
  saveProperty,
  getAllProperties,
  getPropertyById,
  getPropertiesByEmail, 
  updatePropertyStatus,
  updatePropertyAdvertisement,
  updateProperty,
  deleteProperty,
  updatePropertiesByAgent,
};
