const {
    saveProperty,
    getAllProperties,
    getPropertyById,
    getPropertiesByEmail,
    updatePropertyStatus,
    updatePropertyAdvertisement,
    updateProperty,
    deleteProperty,
} = require('../models/propertyModel');

const { findUserByEmail } = require('../models/userModel'); 

const savePropertyData = async (req, res) => {
    try {
        const agentEmail = req.user?.email;
        const property = req.body;

        const agent = await findUserByEmail(agentEmail); 
        if (!agent) {
            console.error("Agent not found:", agentEmail);
            return res.status(404).send({ message: "Agent not found" });
        }

        console.log("Agent data:", agent); 

        if (agent.isFraud) {
            return res.send({ message: "Fraud agents cannot add properties" });
        }

        //  property is linked to agent
        const propertyData = {
            ...property,
            agentId: agent._id,
        };

        const result = await saveProperty(propertyData);
        res.status(201).send(result);
    } catch (error) {
        console.error("Error saving property:", error);
        res.status(500).send({ message: error.message || "Error adding property" });
    }
};

const getProperties = async (req, res) => {
    try {
        const verify = req.query.verify;
        const search = req.query.search;
        const sortByPrice = req.query.sortByPrice;
        const isAdvertised = req.query.isAdvertised;
        const query = {};

        if (verify) {
            query.verificationStatus = verify;
        }

        if (isAdvertised) {
            query.isAdvertised = isAdvertised === 'true';
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
            ];
        }

        const sort = {};
        if (sortByPrice === 'asc') {
            sort.priceMin = 1;
        } else if (sortByPrice === 'desc') {
            sort.priceMin = -1;
        }

        const result = await getAllProperties(query, sort);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch properties' });
    }
};

const getSingleProperty = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await getPropertyById(id);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching property' });
    }
};

const getPropertiesByUserEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const result = await getPropertiesByEmail(email);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching properties for user' });
    }
};

const updatePropertyStatusById = async (req, res) => {
    try {
        const id = req.params.id;
        const { verificationStatus } = req.body;

        if (!['verified', 'rejected'].includes(verificationStatus)) {
            return res.status(400).send({ error: 'Invalid verification status' });
        }

        const result = await updatePropertyStatus(id, verificationStatus);

        if (result.modifiedCount > 0) {
            res.send({ message: 'Property status updated successfully' });
        } else {
            res.status(404).send({ error: 'Property not found or no changes made' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to update property status' });
    }
};

const updatePropertyAdvertisementStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { isAdvertised } = req.body;
        const result = await updatePropertyAdvertisement(id, isAdvertised);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Error updating property advertisement status' });
    }
};

const updatePropertyData = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await updateProperty(id, data);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Error updating property' });
    }
};

const deletePropertyById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteProperty(id);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Error deleting property' });
    }
};

module.exports = {
    savePropertyData,
    getProperties,
    getSingleProperty,
    getPropertiesByUserEmail,
    updatePropertyStatusById,
    updatePropertyAdvertisementStatus,
    updatePropertyData,
    deletePropertyById,
};
