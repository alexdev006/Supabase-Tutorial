import { Link } from "react-router-dom";

const SmoothieCard = ({
  smoothie: { id, title, method, rating },
  onDelete,
}) => {
  return (
    <div className="smoothie-card">
      <h3>{title}</h3>
      <p>{method}</p>
      <div className="rating">{rating} </div>
      <div className="buttons">
        <Link to={"/" + id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={() => onDelete(id)}>
          delete
        </i>
      </div>
    </div>
  );
};
export default SmoothieCard;
