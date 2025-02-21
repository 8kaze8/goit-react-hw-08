import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <p>Welcome, {user.name}</p>
      <button
        type="button"
        onClick={() => dispatch(logOut())}
        style={{
          padding: "5px 15px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
