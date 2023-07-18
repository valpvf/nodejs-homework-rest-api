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
    const { user } = req;
    console.log("user", user._id);
    const result = await listContacts(user._id);
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
    const { user } = req;
    const result = await addContact(req.body, user._id);
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
    const result = await updateContact(id, body);
    if (!result) throw errorHandling(404, "Not Found");
    res.status(200).json(result);
  } catch (error) {
    res.status(404, "Not Found");
    next();
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
