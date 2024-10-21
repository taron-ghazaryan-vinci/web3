import { useState, useEffect } from 'react';
import phonebook from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    phonebook.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      // Si la personne existe déjà, demande la confirmation pour mettre à jour le numéro
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        // Utiliser la méthode update pour mettre à jour l'entrée
        phonebook
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            // Mise à jour du state avec la nouvelle version de la personne
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error(`Error updating ${existingPerson.name}:`, error);
            alert(`Information of ${existingPerson.name} has already been removed from the server`);
            setPersons(persons.filter(p => p.id !== existingPerson.id)); // Supprime la personne si elle n'est plus sur le serveur
          });
      }
    } else {
      // Si la personne n'existe pas, on l'ajoute normalement
      const newPerson = { name: newName, number: newNumber };

      phonebook
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error adding person:', error);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => phonebook.remove(person.id).then(() => {
              setPersons(persons.filter(p => p.id !== person.id));
            })}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
