const { errorHandling } = require("../helpers/errorReq");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/contact.service");

const getAll = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getById(id);
    if (!result) throw errorHandling(404, "Not Found");
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    if (!result)
      throw errorHandling(400, "missing required name field");
    res.status(201).json(result);
  } catch (error) {
    next(error.message);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (result === null) throw errorHandling(404, "Not Found");
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error.message);
  }
};

const updateCurrentContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await updateContact(id, body);
    if (result === null) throw errorHandling(404, "Not Found");
    res.status(200).json(result);
  } catch (error) {
    next(error.message);
  }
};
const updateFavoriteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    console.log("body", body);
    const result = await updateContact(id, body);
    if (result === null) throw errorHandling(404, "Not Found");
    res.status(200).json(result);
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  getAll,
  getContactById,
  addNewContact,
  deleteContact,
  updateCurrentContact,
  updateFavoriteContact,
};
