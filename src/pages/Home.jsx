import { useEffect, useState, useCallback } from "react";

import SmoothieCard from "../components/SmoothieCard";
import supabase from "../config/supabaseClient";

const Home = () => {
  const [{ error, data }, setState] = useState({ data: null, error: null });
  const [orderBy, setOrderBy] = useState("created_at");

  const fetchData = useCallback(
    () =>
      supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false })
        .then((result) => {
          console.log(result);
          setState(result);
        }),
    [orderBy]
  );

  const handleChangeOrderBy = (newOrder) => {
    setOrderBy(() => newOrder);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDelete = (id) =>
    supabase
      .from("smoothies")
      .delete()
      .eq("id", id)
      .select()
      .then(() => fetchData())
      .finally(() => alert(error ? "error" : "success"));

  if (error) return <p>there is an error muther fucker !</p>;

  return (
    <div className="page home">
      <div className="smoothies">
        <div className="order-by">
          <p>order by:</p>
          <button onClick={() => handleChangeOrderBy("created_at")}>
            Time created
          </button>
          <button onClick={() => handleChangeOrderBy("title")}>Title</button>
          <button onClick={() => handleChangeOrderBy("rating")}>Rating</button>
          {orderBy}
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
