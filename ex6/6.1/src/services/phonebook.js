import Phonebook from '../components/Phonebook';
import express from 'express';

const app = express.Router();

// Récupérer tous les contacts
const getAll = app.get('/api/phonebooks', (request, response) => {
  Phonebook.find({})
    .then(notes => {
      response.json(notes);
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ error: 'Erreur du serveur' });
    });
});

// Ajouter un contact
const create = app.post('/api/phonebooks', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: 'Le nom et le numéro sont requis' });
  }

  const phonebook = new Phonebook({ name, number });

  phonebook.save()
    .then(savedPhonebook => {
      response.json(savedPhonebook);
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ error: 'Erreur du serveur' });
    });
});

// Mettre à jour un contact (en deux étapes)
const update = app.put('/api/phonebooks/:id', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: 'Le nom et le numéro sont requis' });
  }

  Phonebook.findById(request.params.id)
    .then(phonebook => {
      if (!phonebook) {
        return response.status(404).json({ error: 'Contact non trouvé' });
      }

      phonebook.name = name;
      phonebook.number = number;

      return phonebook.save();
    })
    .then(updatedPhonebook => {
      response.json(updatedPhonebook);
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ error: 'Erreur du serveur' });
    });
});

// Supprimer un contact (en deux étapes)
const remove = app.delete('/api/phonebooks/:id', (request, response) => {
  Phonebook.findById(request.params.id)
    .then(phonebook => {
      if (!phonebook) {
        return response.status(404).json({ error: 'Contact non trouvé' });
      }

      return phonebook.remove();
    })
    .then(() => {
      response.status(204).end();
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ error: 'Erreur du serveur' });
    });
});

export default { getAll, create, update, remove };
