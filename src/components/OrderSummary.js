import React from "react";

const OrderSummary = ({ selectedMeal, selectedDrink }) => {
  return (
    <div className="order-summary" style={{ justifyContent: "center" }}>
      <h2>Order Summary</h2>
      {selectedMeal && (
        <div>
          <p>Selected Meal: {selectedMeal.title}</p>
          <p>Starter: {selectedMeal.starter}</p>
          <p>Dessert: {selectedMeal.desert}</p>
          {selectedDrink && <p>Selected Drink: {selectedDrink}</p>}
          <p>Total Price: ${selectedMeal.price.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
