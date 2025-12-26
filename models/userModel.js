const { client } = require('../database/db');
const { ObjectId } = require('mongodb');

const db = client.db('housezz');
const usersCollection = db.collection('users');

const getAllUsers = async () => {
  return await usersCollection.find().toArray();
};

const getUserRole = async (email) => {
  const query = { email };
  const result = await usersCollection.findOne(query);
  return { role: result?.role };
};

const saveUser = async (email, user) => {
  const query = { email };
  const isExist = await usersCollection.findOne(query);
  if (isExist) {
    throw new Error('User already exists');
  }
  return await usersCollection.insertOne(user);
};

const updateUserRole = async (id, role) => {
  const query = { _id: new ObjectId(id) };
  const updateDoc = { $set: { role } };
  return await usersCollection.updateOne(query, updateDoc);
};

const updateUserFraud = async (id, isFraud) => {
  const query = { _id: new ObjectId(id) };
  const updateDoc = { $set: { isFraud } };
  return await usersCollection.updateOne(query, updateDoc);
};

const findUserById = async (id) => {
  const query = { _id: new ObjectId(id) };
  return await usersCollection.findOne(query);
};

const findUserByEmail = async (email) => {
  const query = { email };
  return await usersCollection.findOne(query);
};

const deleteUser = async (id) => {
  const query = { _id: new ObjectId(id) };
  return await usersCollection.deleteOne(query);
};

module.exports = {
  getAllUsers,
  getUserRole,
  saveUser,
  updateUserRole,
  updateUserFraud,
  findUserById,
  findUserByEmail, 
  deleteUser,
};
