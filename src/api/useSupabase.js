import { useCallback, useState, useEffect } from "react";
import { deleteSmoothy, getSmoothies } from "./api";

export const useSupabase = () => {
  const [{ error, data }, setState] = useState({ data: null, error: null });
  const [orderBy, setOrderBy] = useState("created_at");

  const fetchData = useCallback(
    () =>
      getSmoothies(orderBy).then((result) => {
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
    deleteSmoothy(id)
      .then(() => fetchData())
      .finally(() => alert(error ? "error" : "success"));

  return {
    onDelete,
    handleChangeOrderBy,
    error,
    data,
    orderBy,
  };
};
