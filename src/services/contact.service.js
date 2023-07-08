// const fs = require("fs/promises");
// const path = require("path");
const { Contact } = require("../model/contact");

// const contactsPath = path.join(__dirname, "../models/contacts.json");

// const update = async (contacts) => {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };

const listContacts = async () => {
  const data = await Contact.find();
  return data;
};

// const getById = async (contactId) => {
//   const contacts = await listContacts();
//   const result = contacts.find((contact) => contact.id === contactId);
//   return result || null;
// };

const addContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const contactIndex = contacts.findIndex(
//     (el) => el.id === contactId
//   );
//   if (contactIndex < 0) return null;
//   const [result] = contacts.splice(contactIndex, 1);
//   await update(contacts);
//   return result;
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const contactIndex = contacts.findIndex(
//     (el) => el.id === contactId
//   );
//   if (contactIndex < 0) return null;
//   contacts[contactIndex] = {
//     ...contacts[contactIndex],
//     ...body,
//   };
//   await update(contacts);
//   return contacts[contactIndex] || null;
// };

module.exports = {
  listContacts,
  // getById,
  addContact,
  // removeContact,
  // updateContact,
};
