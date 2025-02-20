import { useSelector } from "react-redux";
import {
  selectFilteredContacts,
  selectIsLoading,
  selectError,
} from "../../redux/contacts/selectors";
import Contact from "../Contact/Contact";

function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: "20px",
        gap: "10px",
      }}
    >
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </div>
  );
}

export default ContactList;
