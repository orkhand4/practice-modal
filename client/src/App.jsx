import { useEffect, useState } from "react";
import { fetchCoffees } from "../axios";

const App = () => {
  const [coffees, setCoffees] = useState([]);
  const [selectedCoffee, setSelectedCoffee] = useState(null);

  useEffect(() => {
    fetchCoffees()
      .then((data) => {
        console.log("Gələn data:", data);
        if (Array.isArray(data)) {
          setCoffees(data);
        } else {
          console.warn("Data array deyil:", data);
          setCoffees([]);
        }
      })
      .catch((err) => {
        alert("Kafeləri yükləmək mümkün olmadı.");
        setCoffees([]);
      });
  }, []);

  const closeModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setSelectedCoffee(null);
    }
  };
  return (
    <div className="container">
      <h1>Sevimli kofenizi seçin!</h1>
      <div className="coffees-container">
        {coffees.map((coffee) => (
          <div
            onClick={() => setSelectedCoffee(coffee)}
            key={coffee.id}
            className="coffee-card"
          >
            <h2>{coffee.name}</h2>
            <div className="coffee-img">
              <img src={coffee.img} alt={coffee.name} />
            </div>
          </div>
        ))}
      </div>
      {selectedCoffee && (
        <div onClick={closeModal} className="modal-overlay">
          <div className="modal">
            <img src={selectedCoffee.img} alt={selectedCoffee.name} />
            <h2>{selectedCoffee.name}</h2>
            <p>Bu çox dadlı kofedir! Nuş olsun!</p>
            <button onClick={() => setSelectedCoffee(null)}>x</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
