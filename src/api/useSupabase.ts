import { deleteSmoothy, getSmoothies } from "./api";
import { useCallback, useEffect, useState } from "react";

export const useSupabase = () => {
  const [{ error, data }, setState] = useState({ data: null, error: null });

  const fetchData = useCallback(
    (orderBy: string) =>
      getSmoothies(orderBy).then((result) => setState(result)),
    []
  );

  const handleChangeOrderBy = (newOrder: string) => {
    fetchData(newOrder);
  };

  useEffect(() => {
    fetchData("created_at");
  }, [fetchData]);

  const onDelete = (id: string) =>
    deleteSmoothy(id)
      .then(() => fetchData())
      .finally(() => alert(error ? "error" : "success"));

  return {
    onDelete,
    handleChangeOrderBy,
    error,
    data,
  };
};
