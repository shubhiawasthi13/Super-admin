import React, { useState } from "react";
import "./Restro.css";

const restaurantsData = [
  {
    id: "ID8354725",
    name: "Spice Inn",
    city: "Chennai",
    address: "123 Marina Beach Road, Chennai, Tamil Nadu 600001",
    status: "Active",
    transactions: 245678,
    runtime: 3210,
    orders: 3456,
    plan: "Monthly",
    price: 24999,
    features: ["Unlimited orders", "Advanced analytics", "24/7 support"],
    paymentStatus: "Paid",
    lastPayment: "April 10, 2025",
    nextPayment: "May 10, 2025"
  },
  {
    id: "ID8354726",
    name: "Tandoori Treat",
    city: "Delhi",
    address: "321 mall Road, delhi 500001",
    status: "Active",
    transactions: 24560,
    runtime: 2210,
    orders: 2456,
    plan: "Yearly",
    price: 259988,
    features: ["Unlimited orders", "Advanced analytics", "24/7 support"],
    paymentStatus: "Paid",
    lastPayment: "May 01, 2025",
    nextPayment: "April 30, 2026"
  }
];

const Restro = () => {
  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurantsData[0]);
  const [search, setSearch] = useState("");

  const handleToggleStatus = (id) => {
    const updatedList = restaurants.map((restaurant) =>
      restaurant.id === id
        ? {
            ...restaurant,
            status: restaurant.status === "Active" ? "Deactivated" : "Active"
          }
        : restaurant
    );
    setRestaurants(updatedList);
    const updatedSelected = updatedList.find((r) => r.id === id);
    setSelectedRestaurant(updatedSelected);
  };

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2 style={{ marginBottom: "20px", color: "gray" }}>Restaurants</h2>
      <hr />
      <div className="Restro-container">
        <div className="side">
          <input
            type="text"
            placeholder="Search restaurants or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <hr />
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="restaurant-item"
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <div>
                <div className="restaurant-name">{restaurant.name}</div>
                <div className="restaurant-id">#{restaurant.id}</div>
              </div>
              <div>
                <div className="restaurant-city">{restaurant.city}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Details Panel */}
        <div className="details-panel">
          {selectedRestaurant && (
            <div className="details-content">
              <div className="details-header">
                <div>
                  <h2 className="restaurant-title">
                    {selectedRestaurant.name}{" "}
                    <span className="restaurant-id">#{selectedRestaurant.id}</span>
                  </h2>
                  <p className="restaurant-address">{selectedRestaurant.address}</p>
                  <br />
                  <span className={
                    selectedRestaurant.status === "Active"
                      ? "status-active"
                      : "status-deactivated"
                  }>
                    {selectedRestaurant.status}
                  </span>
                </div>
                <div className="details-actions">
  <button className="btn">Reset Password</button>
  <button
    className={`btn ${
      selectedRestaurant.status === "Active" ? "danger" : "activate-btn"
    }`}
    onClick={() => handleToggleStatus(selectedRestaurant.id)}
  >
    {selectedRestaurant.status === "Active" ? (
      <>
        <span className="cross-btn">X</span> Deactivate
      </>
    ) : (
      "Activate"
    )}
  </button>
</div>

              </div>

              <div className="analytics-cards">
                <div className="analytics-card">
                  <img src="./total_trans.png" alt="" />
                  <div>
                    <p>Total Transactions</p>
                    <h3>₹{selectedRestaurant.transactions.toLocaleString()}</h3>
                  </div>
                </div>
                <div className="analytics-card">
                  <img src="./total-ord.png" alt="" />
                  <div>
                    <p>Customer Panel Runtime</p>
                    <h3>{selectedRestaurant.runtime.toLocaleString()} hrs</h3>
                  </div>
                </div>
                <div className="analytics-card">
                  <img src="./total-ord.png" alt="" />
                  <div>
                    <p>Total Orders</p>
                    <h3>{selectedRestaurant.orders.toLocaleString()}</h3>
                  </div>
                </div>
              </div>

              <h4>Analytics Overview</h4>
              <div className="subscription-panel">
                <div className="subscription-content">
                  <div>
                    <p className="label">Plan Details</p>
                    <p>
                      <span className="plan">{selectedRestaurant.plan}</span> - ₹
                      {selectedRestaurant.price.toLocaleString()}
                    </p>
                    <br />
                    <p style={{ color: "grey", marginBottom: "5px" }}>Features</p>
                    <ul>
                      {selectedRestaurant.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="label">Payment Status</p>
                    <span className="status-paid">{selectedRestaurant.paymentStatus}</span>
                    <br />
                    <br />
                    <p>
                      <span style={{ color: "grey" }}>Last Payment</span>
                      <br /> {selectedRestaurant.lastPayment}
                    </p>
                    <br />
                    <p>
                      <span style={{ color: "grey" }}>Next Due</span>
                      <br /> {selectedRestaurant.nextPayment}
                    </p>
                  </div>
                </div>
                <br />
                <hr />
                <button className="btn danger" style={{ marginTop: "12px" }}>
                  <span className="cross-btn">X</span> Cancel subscription
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Restro;
