const {listContacts, getContactById, removeContact, addContact} = require('./contacts.js');
const contacts = require("./contacts.js");
const {Command} = require("commander");


const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");


program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
      const contacts = await listContacts();
      return console.table(contacts);
      
      case "get":
        const contact = await getContactById(id);
        return console.table(contact);
      case "add":
        await addContact(name, email, phone);
        const allContacts = await listContacts();
        return console.table(allContacts);
      case "remove":
        await removeContact(id);
        const newContacts = await listContacts();
        return console.table(newContacts);
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }
  
  invokeAction(argv);