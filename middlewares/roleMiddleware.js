const { client } = require('../database/db');

const verifyAdmin = async (req, res, next) => {
  const email = req.user?.email;
  const db = client.db('housezz');
  const usersCollection = db.collection('users');
  const query = { email };
  const user = await usersCollection.findOne(query);
  if (!user || user?.role !== 'admin') {
    return res.status(403).send({ message: 'forbidden access!' });
  }
  next();
};

const verifyAgent = async (req, res, next) => {
  const email = req.user?.email;
  const db = client.db('housezz');
  const usersCollection = db.collection('users');
  const query = { email };
  const user = await usersCollection.findOne(query);
  if (!user || user?.role !== 'agent') {
    return res.status(403).send({ message: 'forbidden access!' });
  }
  next();
};

module.exports = { verifyAdmin, verifyAgent };