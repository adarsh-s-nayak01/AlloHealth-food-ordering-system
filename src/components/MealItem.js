import React, { useState } from "react";
import "./MealItem.css";

const MealItem = ({ meal, onSelect }) => {
  const [selectedDrink, setSelectedDrink] = useState(null);

  const handleMealSelect = () => {
    onSelect({ ...meal, selectedDrink });
  };

  return (
    <div className="meal-item">
      <img src={meal.img} alt={meal.title} />
      <div className="meal-details">
        <h3>{meal.title}</h3>
        <p>Starter: {meal.starter}</p>
        <p>Dessert: {meal.desert}</p>
        {selectedDrink && <p>Selected Drink: {selectedDrink}</p>}
        <div className="drink-icons">
          {meal.drinks.map((drink) => (
            <div
              key={drink.id}
              className={`drink-icon ${
                selectedDrink === drink.title ? "selected" : ""
              }`}
              onClick={() => setSelectedDrink(drink.title)}
            >
              {drink.title}
            </div>
          ))}
        </div>

        <p>Price: ${meal.price.toFixed(2)}</p>
        <div>
          <button className="select" onClick={handleMealSelect}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;
