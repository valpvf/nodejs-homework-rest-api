const { Contact } = require("../model/contact");

const listContacts = async (owner) => {
  const data = await Contact.find({ owner }, "-createdAt").populate(
    "owner",
    ["email", "subscription"]
  );
  return data;
};

const getById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const addContact = async (data, owner) => {
  const newContact = await Contact.create({ ...data, owner });
  return newContact;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  return result;
};

const updateContact = async (id, data) => {
  const contacts = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
  return contacts;
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
