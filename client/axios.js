import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchCoffees = async () => {
  try {
    const res = await api.get("coffees");
    return res.data;
  } catch (err) {
    console.error("Xəta baş verdi:", err);
    throw err;
  } finally {
    console.log("Fetch attempt completed!");
  }
};
