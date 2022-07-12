const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUDI = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUDI(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    const contact = await ContactsRepository.findByID(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (category_id && !isValidUUDI(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (email) {
      const emailExists = await ContactsRepository.findByEmail(email);
      if (emailExists) {
        return response.status(400).json({ error: 'This email is already in use' });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;

    const {
      name, email, phone, category_id,
    } = request.body;

    if (!isValidUUDI(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    if (category_id && !isValidUUDI(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByID(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (email) {
      const emailExists = await ContactsRepository.findByEmail(email);
      if (emailExists) {
        return response.status(400).json({ error: 'This email is already in use' });
      }
    }

    const updatedContact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(updatedContact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUDI(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    await ContactsRepository.delete(id);

    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
