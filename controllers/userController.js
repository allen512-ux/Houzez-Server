const { ObjectId } = require('mongodb');
const admin = require('firebase-admin');
const {
  getAllUsers,
  getUserRole,
  saveUser,
  updateUserRole,
  updateUserFraud,
  findUserById,
  deleteUser,
} = require('../models/userModel');
const { updatePropertiesByAgent } = require('../models/propertyModel');

const getUsers = async (req, res) => {
  try {
    const result = await getAllUsers();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching users' });
  }
};

const getUserRoleByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await getUserRole(email);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user role' });
  }
};

const saveUserData = async (req, res) => {
  try {
    const email = req.params.email;
    const user = req.body;
    const result = await saveUser(email, user);
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateUserRoleById = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.body.role;
    const result = await updateUserRole(id, role);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error updating user role' });
  }
};

const updateUserFraudStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const fraud = req.body.isFraud;
    const result = await updateUserFraud(id, fraud);

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    const user = await findUserById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const agentEmail = user.email;
    const propertiesUpdateResult = await updatePropertiesByAgent(
      agentEmail,
      false,
      'unverified'
    );

    res.send({
      message: 'User marked as fraud, properties updated to unverified.',
    });
  } catch (error) {
    res.status(500).send({ message: 'Error updating fraud status' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found in MongoDB' });
    }

    const result = await deleteUser(userId);
    if (result.deletedCount > 0) {
      try {
        const firebaseUser = await admin.auth().getUserByEmail(user.email);
        await admin.auth().deleteUser(firebaseUser.uid);
        res.status(200).json({
          message: 'User deleted from MongoDB and Firebase',
        });
      } catch (firebaseError) {
        return res.status(500).json({
          message: 'User deleted from MongoDB, but not from Firebase',
          error: firebaseError.message,
        });
      }
    } else {
      return res.status(404).json({ message: 'User not found in MongoDB' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUsers,
  getUserRoleByEmail,
  saveUserData,
  updateUserRoleById,
  updateUserFraudStatus,
  deleteUserById,
};