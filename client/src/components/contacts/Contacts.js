import React, { Fragment, useContext, useEffect } from 'react';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import { AnimatePresence, motion, usePresence } from 'framer-motion';

import ContactContext from '../../context/contact/ContactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, loading, getContacts } = contactContext;

  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    !isPresent && setTimeout(safeToRemove, 1000)
  }, [isPresent, safeToRemove])

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <AnimatePresence>
          {filtered !== null
            ? filtered.map(contact => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ContactItem contact={contact} />
              </motion.div>
              ))
            : contacts.map(contact => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ContactItem contact={contact} />
              </motion.div>
              ))}
        </AnimatePresence>
      ) : <Spinner />}
    </Fragment>
  );
};

export default Contacts;