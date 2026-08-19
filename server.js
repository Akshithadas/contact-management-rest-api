// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Path to the JSON data file
const DATA_FILE = path.join(__dirname, 'data', 'contacts.json');

// Middleware to parse incoming JSON payloads
app.use(express.json());

// ==========================================
// Helper Functions for Data Persistence
// ==========================================

/**
 * Reads contacts array from data/contacts.json file.
 * Returns an empty array if file reading or parsing fails.
 */
function readContactsFromFile() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // Create empty file if it doesn't exist yet
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    const fileData = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(fileData || '[]');
  } catch (error) {
    console.error('Error reading contacts file:', error);
    return [];
  }
}

/**
 * Writes contacts array back to data/contacts.json file.
 */
function writeContactsToFile(contacts) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing contacts file:', error);
    return false;
  }
}

// ==========================================
// API Routes
// ==========================================

/**
 * @route   GET /api/contacts
 * @desc    Get all contacts
 * @access  Public
 */
app.get('/api/contacts', (req, res) => {
  try {
    const contacts = readContactsFromFile();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while fetching contacts' });
  }
});

/**
 * @route   GET /api/contacts/:id
 * @desc    Get single contact by ID
 * @access  Public
 */
app.get('/api/contacts/:id', (req, res) => {
  try {
    const contacts = readContactsFromFile();
    const contactId = req.params.id;
    
    // Find contact by matching ID
    const contact = contacts.find((c) => c.id === contactId);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while fetching contact' });
  }
});

/**
 * @route   POST /api/contacts
 * @desc    Create a new contact
 * @access  Public
 */
app.post('/api/contacts', (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone || typeof name !== 'string' || typeof email !== 'string' || typeof phone !== 'string') {
      return res.status(400).json({ error: 'Name, email, and phone are required fields' });
    }

    if (!name.trim() || !email.trim() || !phone.trim()) {
      return res.status(400).json({ error: 'Name, email, and phone cannot be empty strings' });
    }

    const contacts = readContactsFromFile();

    // Auto-generate a unique ID based on timestamp
    const newId = Date.now().toString();

    // Create new contact object
    const newContact = {
      id: newId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim()
    };

    // Add to list and save to JSON file
    contacts.push(newContact);
    const saveSuccess = writeContactsToFile(contacts);

    if (!saveSuccess) {
      return res.status(500).json({ error: 'Failed to save new contact' });
    }

    // Return created contact with HTTP 201 Created
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while creating contact' });
  }
});

/**
 * @route   PUT /api/contacts/:id
 * @desc    Update an existing contact by ID
 * @access  Public
 */
app.put('/api/contacts/:id', (req, res) => {
  try {
    const contactId = req.params.id;
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone || typeof name !== 'string' || typeof email !== 'string' || typeof phone !== 'string') {
      return res.status(400).json({ error: 'Name, email, and phone are required fields' });
    }

    if (!name.trim() || !email.trim() || !phone.trim()) {
      return res.status(400).json({ error: 'Name, email, and phone cannot be empty strings' });
    }

    const contacts = readContactsFromFile();

    // Find target contact index
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Update contact details preserving the original ID
    const updatedContact = {
      id: contactId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim()
    };

    contacts[contactIndex] = updatedContact;
    const saveSuccess = writeContactsToFile(contacts);

    if (!saveSuccess) {
      return res.status(500).json({ error: 'Failed to update contact' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while updating contact' });
  }
});

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Delete a contact by ID
 * @access  Public
 */
app.delete('/api/contacts/:id', (req, res) => {
  try {
    const contactId = req.params.id;
    const contacts = readContactsFromFile();

    // Find target contact index
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Remove contact from array
    contacts.splice(contactIndex, 1);
    const saveSuccess = writeContactsToFile(contacts);

    if (!saveSuccess) {
      return res.status(500).json({ error: 'Failed to delete contact' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while deleting contact' });
  }
});

// Fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
