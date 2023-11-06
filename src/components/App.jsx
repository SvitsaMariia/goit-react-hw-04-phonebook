import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useLocalStorage } from 'hooks/useLocalStorage';
import css from './App.module.css';
import { toast } from 'react-toastify';

const STORAGE_KEY = 'contactList';
const initialState = [];

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(STORAGE_KEY, initialState);
  const [filter, setFilter] = useState('');

  const preventAddingSameContact = name => {
    const normalizedName = name.toLowerCase();

    return contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
  };

  const addContactItem = ({ name, number }) => {
    const isAlreadyInContacts = preventAddingSameContact(name);

    if (isAlreadyInContacts) {
      toast.info(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContactItem = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const handleFilterInputChange = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={css.container}>
      <div className={css.phoneBookWrapper}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm addContact={addContactItem} />
      </div>

      <div className={css.contactsWrapper}>
        <h2 className={css.title}>Contacts</h2>
        <Filter filterValue={filter} onFilterChange={handleFilterInputChange} />
        {contacts.length === 0 ? (
          <h3 className={css.title}>
            There are no contacts in your phone book.
          </h3>
        ) : (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={deleteContactItem}
          />
        )}
      </div>
    </div>
  );
};