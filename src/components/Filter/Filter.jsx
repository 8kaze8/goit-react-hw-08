import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <div>
      <label htmlFor="search">Find contacts by name</label>
      <br />
      <input
        type="text"
        id="search"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        style={{
          width: "250px",
          padding: "5px",
          border: "1px solid black",
        }}
      />
    </div>
  );
};

export default Filter;
