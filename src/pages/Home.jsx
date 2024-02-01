import SmoothieCard from "../components/SmoothieCard";
import { useSupabase } from "../api/useSupabase";

const Home = () => {
  const { handleChangeOrderBy, error, data, onDelete } = useSupabase();

  if (error) return <p>there is an error muther fucker !</p>;

  return (
    <div className="page home">
      {JSON.stringify(process.env)}
      <div className="smoothies">
        <div className="order-by">
          <p>order by:</p>
          <button onClick={() => handleChangeOrderBy("created_at")}>
            Time created
          </button>
          <button onClick={() => handleChangeOrderBy("title")}>Title</button>
          <button onClick={() => handleChangeOrderBy("rating")}>Rating</button>
        </div>
        <div className="smoothie-grid">
          {data?.length === 0 && "no data"}
          {data?.map((smoothie) => (
            <SmoothieCard
              key={smoothie.id}
              smoothie={smoothie}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
