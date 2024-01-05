import React, { useState } from "react";
import MealItem from "./MealItem";
import data from "../data";

const MealList = ({
  selectedTags,
  selectedPerson,
  setSelectedMeal,
  setSelectedDrink,
}) => {
  const [selectedDrinks, setSelectedDrinks] = useState({});

  const handleDrinkSelect = (mealId, drinkTitle) => {
    setSelectedDrinks((prevSelectedDrinks) => ({
      ...prevSelectedDrinks,
      [mealId]: drinkTitle,
    }));
  };

  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
    setSelectedDrink(selectedDrinks[meal.id]);
  };

  return (
    <div className="meal-list">
      {data.meals
        .filter((meal) => {
          if (selectedTags.length === 0) {
            return true;
          }
          return meal.labels.some((label) => selectedTags.includes(label));
        })
        .map((meal) => (
          <MealItem
            key={meal.id}
            meal={meal}
            onSelect={() => handleMealSelect(meal)}
            selectedDrink={selectedDrinks[meal.id]}
            handleDrinkSelect={(drink) => handleDrinkSelect(meal.id, drink)}
          />
        ))}
    </div>
  );
};

export default MealList;
