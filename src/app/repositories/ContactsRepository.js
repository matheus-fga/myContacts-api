const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Matheus',
    email: 'matheus@mail.com',
    phone: '1212121212',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'João',
    email: 'joao@mail.com',
    phone: '1212121212',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findByID(id) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.id === id)));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.email === email)));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  create(contact) {
    const {
      name, email, phone, category_id,
    } = contact;

    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, contactInfo) {
    const {
      name, email, phone, category_id,
    } = contactInfo;

    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };
      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));
      resolve(updatedContact);
    });
  }
}

// Singleton
module.exports = new ContactsRepository();
