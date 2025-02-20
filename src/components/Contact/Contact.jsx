import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/operations";

function Contact({ contact }) {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
        width: "400px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div>
          <span>👤 {contact.name}</span>
        </div>
        <div>
          <span>📞 {contact.number}</span>
        </div>
      </div>
      <button
        onClick={() => dispatch(deleteContact(contact.id))}
        style={{
          padding: "5px 15px",
          backgroundColor: "#f0f0f0",
          color: "black",
          border: "1px solid #ccc",
          borderRadius: "4px",
          height: "fit-content",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Contact;
