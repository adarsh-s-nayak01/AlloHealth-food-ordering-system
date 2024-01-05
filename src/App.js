import React, { useState } from "react";
import "./App.css";
import data from "./data";
import TagFilter from "./components/TagFilter";
import MealList from "./components/MealList";
import OrderSummary from "./components/OrderSummary";

const App = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState(1);
  const [orderHistory, setOrderHistory] = useState({});

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const addToOrder = () => {
    if (selectedMeal && selectedPerson) {
      const newOrderTotal = orderTotal + (selectedMeal.price || 0);
      setOrderTotal(newOrderTotal);

      setOrderHistory((prevOrderHistory) => {
        const personOrderHistory = prevOrderHistory[selectedPerson] || {
          meals: [],
          orderTotal: 0,
        };
        return {
          ...prevOrderHistory,
          [selectedPerson]: {
            meals: [
              ...personOrderHistory.meals,
              { name: selectedMeal.title, price: selectedMeal.price },
            ],
            orderTotal: newOrderTotal,
          },
        };
      });
    }
  };

  const addPerson = () => {
    const newPerson = selectedPerson + 1;
    setSelectedPerson(newPerson);
    setSelectedMeal(null);
    setSelectedDrink(null);
    setOrderTotal(0);
  };

  const deleteOrder = () => {
    setOrderHistory((prevOrderHistory) => {
      const updatedOrderHistory = { ...prevOrderHistory };
      delete updatedOrderHistory[selectedPerson];
      return updatedOrderHistory;
    });

    setSelectedMeal(null);
    setSelectedDrink(null);
    setOrderTotal(0);
  };

  const renderOrderHistory = () => {
    const deletePersonOrder = (personId) => {
      setOrderHistory((prevOrderHistory) => {
        const updatedOrderHistory = { ...prevOrderHistory };
        delete updatedOrderHistory[personId];
        return updatedOrderHistory;
      });
    };

    return (
      <div className="order-history">
        <h2>Order History</h2>
        {Object.keys(orderHistory).map((personId) => (
          <div key={personId}>
            <button
              id="order-history-btn"
              onClick={() => setSelectedPerson(Number(personId))}
            >
              Passenger {personId} Order History
            </button>
            <div style={{ height: "10px" }}></div>
            {selectedPerson === Number(personId) && (
              <div className="order-details">
                {/* <h3>Meals</h3> */}
                <ul>
                  {orderHistory[personId].meals.map((meal, index) => (
                    <li key={index}>{meal.name}</li>
                  ))}
                </ul>
                <p>
                  Order Total: ${orderHistory[personId].orderTotal.toFixed(2)}
                </p>
                <button
                  id="delete-btn"
                  onClick={() => deletePersonOrder(personId)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Food Order App</h1>
        <div className="content">
          <div className="meal-list">
            <TagFilter
              labels={data.labels}
              selectedTags={selectedTags}
              onSelect={handleTagSelect}
            />
            <MealList
              data={data.meals}
              selectedTags={selectedTags}
              setSelectedMeal={setSelectedMeal}
              setSelectedDrink={setSelectedDrink}
              selectedPerson={selectedPerson}
            />
          </div>
          <div
            style={{
              position: "sticky",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="order-summary">
              <OrderSummary selectedMeal={selectedMeal} />
              <div className="buttons">
                <button className="action-btn" onClick={addToOrder}>
                  Add to Order
                </button>
                <p>Order Total: ${orderTotal.toFixed(2)}</p>
                <div className="person-buttons">
                  <button className="action-btn" onClick={addPerson}>
                    Add Passenger
                  </button>
                  <button className="action-btn" onClick={deleteOrder}>
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderOrderHistory()}
      </header>
    </div>
  );
};

export default App;
