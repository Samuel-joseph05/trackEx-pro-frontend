
import { API } from "@/api/axios";

export const getSalary = async (month, year) => {
  const response = await API.get("/salary", {
    params: { month, year },
  });

  return response.data;
};

export const saveSalary = async (month, year, amount) => {
  const response = await API.put("/salary", {
    month,
    year,
    amount,
  });

  return response.data;
};
