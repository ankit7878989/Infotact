import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">My Dashboard</h2>
        <ul>
          <li>Dashboard</li>
          <li>Profile</li>
          <li>Analytics</li>
          <li>Settings</li>
          <li className="logout">Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h1>Dashboard Overview</h1>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>5,120</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$45,000</p>
          </div>
          <div className="card">
            <h3>New Orders</h3>
            <p>280</p>
          </div>
          <div className="card">
            <h3>Feedback</h3>
            <p>320</p>
          </div>
        </section>
      </main>
    </div>
  );
}
