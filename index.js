const argv = require('yargs').argv;

const { listContacts, getContactById, addContact, removeContact } = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const data = await listContacts();
      console.table(data);
      break;

    case 'get':
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const deletedContact = await removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
