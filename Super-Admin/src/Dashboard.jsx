import React, { useState } from 'react';
import './main.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: '#ID8514725',
      name: 'Spice Garden',
      location: 'Mumbai',
      status: 'Active',
      ordersToday: 128,
    },
    {
      id: '#ID8514726',
      name: 'Tandoori Treat',
      location: 'Delhi',
      status: 'Active',
      ordersToday: 98,
    },
    {
      id: '#ID8514727',
      name: 'Pizza Palace',
      location: 'Mumbai',
      status: 'Deactive',
      ordersToday: 0,
    },
    {
      id: '#ID8514728',
      name: 'Foody Zone',
      location: 'Kanpur',
      status: 'Deactive',
      ordersToday: 10,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');

  const toggleStatus = (index) => {
    setRestaurants(prev =>
      prev.map((r, i) =>
        i === index ? { ...r, status: r.status === 'Active' ? 'Deactive' : 'Active' } : r
      )
    );
  };

  const uniqueCities = [...new Set(restaurants.map(r => r.location))];

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchesCity = cityFilter === 'All' || r.location === cityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  const totalOrders = filteredRestaurants.reduce((acc, r) => acc + r.ordersToday, 0);
  const activeRestaurants = filteredRestaurants.filter(r => r.status === 'Active').length;

  const positionMap = {
    Mumbai: [19.0760, 72.8777],
    Delhi: [28.6139, 77.2090],
    Kanpur: [26.4499, 80.3319],
  };

  const cityData = Object.entries(
    restaurants.filter(r => r.status === 'Active').reduce((acc, cur) => {
      acc[cur.location] = (acc[cur.location] || 0) + cur.ordersToday;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28'];

  return (
    <main className="dashboard">
      <header className="header">
        <h2>Dashboard</h2>
        <input
          type="text"
          placeholder="Search restaurants or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <section className="stats">
        <div className="stat-box">
          <img src="./total-restro.png" alt="" />
          <div>
            <p>Total Restaurants</p>
            <span>{filteredRestaurants.length}</span>
          </div>
        </div>

        <div className="stat-box">
          <img src="./active-restro.png" alt="" />
          <div>
            <p>Active Restaurants</p>
            <span>{activeRestaurants}</span>
          </div>
        </div>

        <div className="stat-box">
          <img src="./total-ord.png" alt="" />
          <div>
            <p>Total Orders</p>
            <span>{totalOrders}</span>
          </div>
        </div>
      </section>

      {/* Map and Chart Section */}
      <section className="visuals">
        <div className="map-chart-container">
          <div className="map">
            <h4>Restaurants Distribution</h4>
            {/* <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: '300px', borderRadius: '10px' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {restaurants.map((r, idx) => (
                <Marker
                  key={idx}
                  position={positionMap[r.location] || [22.9734, 78.6569]}
                >
                  <Popup>
                    {r.name} - {r.location}
                  </Popup>
                </Marker>
              ))}
            </MapContainer> */}
          </div>
          
            <div className="chart">
            <h4>Top Cities</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {cityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          
        </div>
      </section>

      {/* Restaurant Management Table */}
      <section className="restaurant-management">
        <section className="filters">
          <h4>Restaurant Management</h4>
          <div>
            <input
              type="text"
              placeholder="Search restaurants."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label>
              <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                <option value="All">All Cities</option>
                {uniqueCities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
            </label>
            <label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
            </label>
          </div>
        </section>

        <table>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Location</th>
              <th>Status</th>
              <th>Orders (Today)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRestaurants.map((r, i) => (
              <tr key={i}>
                <td>{r.name} <br /><span>{r.id}</span></td>
                <td>{r.location}</td>
                <td className={r.status.toLowerCase()}>{r.status}</td>
                <td>{r.ordersToday}</td>
                <td>
                  <button className="toggle" onClick={() => toggleStatus(i)}>
                    {r.status === 'Active' ? '🟢' : '⚪️'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Dashboard;





// import React, { useState } from 'react';
// import './main.css';

// const Dashboard = () => {
//   const [restaurants, setRestaurants] = useState([
//     {
//       id: '#ID8514725',
//       name: 'Spice Garden',
//       location: 'Mumbai',
//       status: 'Active',
//       ordersToday: 128,
//     },
//     {
//       id: '#ID8514726',
//       name: 'Tandoori Treat',
//       location: 'Delhi',
//       status: 'Active',
//       ordersToday: 98,
//     },
//     {
//       id: '#ID8514727',
//       name: 'Pizza Palace',
//       location: 'Mumbai',
//       status: 'Deactive',
//       ordersToday: 0,

//     },
//     {
//       id: '#ID8514727',
//       name: 'foody Palace',
//       location: 'Kanpur',
//       status: 'Deactive',
//       ordersToday: 10,
//     },
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [cityFilter, setCityFilter] = useState('All');

//   const toggleStatus = (index) => {
//     setRestaurants(prev =>
//       prev.map((r, i) =>
//         i === index ? { ...r, status: r.status === 'Active' ? 'Deactive' : 'Active' } : r
//       )
//     );
//   };

//   const uniqueCities = [...new Set(restaurants.map(r => r.location))];

//   const filteredRestaurants = restaurants.filter(r => {
//     const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                           r.location.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
//     const matchesCity = cityFilter === 'All' || r.location === cityFilter;

//     return matchesSearch && matchesStatus && matchesCity;
//   });

//   const totalOrders = filteredRestaurants.reduce((acc, r) => acc + r.ordersToday, 0);
//   const activeRestaurants = filteredRestaurants.filter(r => r.status === 'Active').length;

//   return (
//     <main className="dashboard">
//       <header className="header">
//         <h2>Dashboard</h2>
//         <input
//           type="text"
//           placeholder="Search restaurants or city..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </header>

 

//       <section className="stats">
//         <div className="stat-box">
//           <img src="./total-restro.png" alt="" /> 
//           <div>
//           <p>Total Restaurants</p>
//           <span>{filteredRestaurants.length}</span>
//           </div>
//           </div>
          
//           <div className="stat-box">
//           <img src="./active-restro.png" alt="" />
//           <div>
//           <p>Active Restaurants</p>
//           <span>{activeRestaurants}</span>
//           </div>
//           </div>

//           <div className="stat-box">
//           <img src="./total-ord.png" alt="" />
//           <div>
//           <p>Total Orders</p>
//           <span>{totalOrders}</span>
//           </div>
//           </div>
//       </section>

//       {/* <section className="distribution">
//         <div className="map">[Map Placeholder]</div>
//         <div className="chart">[Chart Placeholder]</div>
//       </section> */}

//       <section className="restaurant-management">
//       <section className="filters">
//       <h4>Restaurant Management</h4>
//       <div>
//       <input
//           type="text"
//           placeholder="Search restaurants."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//           <label>
//           <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
//             <option value="All">All Cities</option>
//             {uniqueCities.map((city, idx) => (
//               <option key={idx} value={city}>{city}</option>
//             ))}
//           </select>
//         </label>
//       <label>
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//             <option value="All">All Status</option>
//             <option value="Active">Active</option>
//             <option value="Deactive">Deactive</option>
//           </select>
//         </label>
//       </div>
//       </section>
      
//         <table>
//           <thead>
//             <tr>
//               <th>Restaurant</th>
//               <th>Location</th>
//               <th>Status</th>
//               <th>Orders (Today)</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRestaurants.map((r, i) => (
//               <tr key={i}>
//                 <td>{r.name} <br /><span>{r.id}</span></td>
//                 <td>{r.location}</td>
//                 <td className={r.status.toLowerCase()}>{r.status}</td>
//                 <td>{r.ordersToday}</td>
//                 <td>
//                   <button className="toggle" onClick={() => toggleStatus(i)}>
//                     {r.status === 'Active' ? '🟢' : '⚪️'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;



