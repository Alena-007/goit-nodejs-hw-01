const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId.toString());
  if (!contact) {
    return null;
  }
  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const removeContact = contacts.find(contact => contact.id === contactId.toString());
  if (removeContact) {
    const newListContacts = contacts.filter(contact => contact.id !== contactId.toString());
    await fs.writeFile(contactsPath, JSON.stringify(newListContacts));
    return removeContact;
  } else {
    return null;
  }
};

module.exports = { listContacts, getContactById, addContact, removeContact };
