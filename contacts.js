const fs = require("fs/promises");
const path = require('path');
const colors = require("colors");
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');


const listContacts = async () => {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return error;
    }
  }


  
  const getContactById = async (contactId) => {
   try {
    const contacts = await listContacts();
    const contact = contacts.filter(contact => contact.id === contactId);
    return contact;

   } catch (error) {
    return error;
   }
  }
  
  const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.filter(contact => contact.id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(contact));
        return console.log(`contact with ID ${contactId} removed successfully`.red);
    } catch (error) {
        return error;
    }
  }
  
  const addContact = async (name, email, phone) => {

    try {
        const contacts = await listContacts();

        const newContact = { id: v4(), name, email, phone };
        contacts.push(newContact);

        fs.writeFile(contactsPath, JSON.stringify(contacts));
        return console.log(`contact with Name ${name} added successfully`.green);


    } catch (error) {
        return error
    }
    
  };




  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };