// import React, { useState, useEffect } from 'react';
// import './main.css';
// import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// import 'leaflet/dist/leaflet.css';

// const Dashboard = () => {
//   const [restaurants, setRestaurants] = useState([
//     {
//       id: '#ID8514726',
//       name: 'Tandoori Treat',
//       location: 'Delhi',
//       status: 'Active',
//       ordersToday: 98,
//       ordersMonth: 210,
//     },
//     {
//       id: '#ID8514727',
//       name: 'Pizza Palace',
//       location: 'Mumbai',
//       status: 'Deactive',
//       ordersToday: 0,
//       ordersMonth: 110,
//     },
//     {
//       id: '#ID8514728',
//       name: 'Foody Zone',
//       location: 'Kanpur',
//       status: 'Active',
//       ordersToday: 10,
//       ordersMonth: 110,
//     },
//     {
//       id: '#ID8514729',
//       name: 'Agra Delight',
//       location: 'Agra',
//       status: 'Active',
//       ordersToday: 45,
//       ordersMonth: 120,
//     },
//   ]);
  
//   const [coordinates, setCoordinates] = useState([]);
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
//       r.location.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
//     const matchesCity = cityFilter === 'All' || r.location === cityFilter;

//     return matchesSearch && matchesStatus && matchesCity;
//   });
  
//   const totalOrders = filteredRestaurants.reduce((acc, r) => acc + r.ordersToday + r.ordersMonth, 0);
//   const activeRestaurants = filteredRestaurants.filter(r => r.status === 'Active').length;

//   const cityData = Object.entries(
//     restaurants.filter(r => r.status === 'Active').reduce((acc, cur) => {
//       acc[cur.location] = (acc[cur.location] || 0) + cur.ordersToday;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28'];

//   useEffect(() => {
//     // Function to convert location to coordinates using Google Geocoding API
//     const fetchCoordinates = async () => {
//       const geocoder = new window.google.maps.Geocoder();
//       const newCoordinates = [];

//       for (const restaurant of restaurants) {
//         const { results } = await geocoder.geocode({ address: restaurant.location });
//         if (results.length > 0) {
//           const { lat, lng } = results[0].geometry.location;
//           newCoordinates.push({ ...restaurant, coordinates: [lat(), lng()] });
//         }
//       }

//       setCoordinates(newCoordinates);
//     };

//     fetchCoordinates();
//   }, [restaurants]);

//   const getMarkerColor = (status) => {
//     return status === 'Active' ? '#00C49F' : '#FF0000'; // Green for active, Red for deactive
//   };

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
//             <p>Total Restaurants</p>
//             <span>{filteredRestaurants.length}</span>
//           </div>
//         </div>

//         <div className="stat-box">
//           <img src="./active-restro.png" alt="" />
//           <div>
//             <p>Active Restaurants</p>
//             <span>{activeRestaurants}</span>
//           </div>
//         </div>

//         <div className="stat-box">
//           <img src="./total-ord.png" alt="" />
//           <div>
//             <p>Total Orders</p>
//             <span>{totalOrders}</span>
//           </div>
//         </div>
//       </section>

//       {/* Map and Chart Section */}
//       <section className="visuals">
//         <div className="map-chart-container">
//           <div className="map">
//             <h4>Restaurants Distribution</h4>
//             <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//               <GoogleMap
//                 id="google-map"
//                 mapContainerStyle={{ height: '300px', width: '100%' }}
//                 zoom={5}
//                 center={{ lat: 22.9734, lng: 78.6569 }} // Default center
//               >
//                 {coordinates.map((restaurant, idx) => (
//                   <Marker
//                     key={idx}
//                     position={{ lat: restaurant.coordinates[0], lng: restaurant.coordinates[1] }}
//                     icon={{
//                       path: window.google.maps.SymbolPath.CIRCLE,
//                       fillColor: getMarkerColor(restaurant.status),
//                       fillOpacity: 1,
//                       scale: 8,
//                       strokeColor: 'white',
//                       strokeWeight: 2,
//                     }}
//                   />
//                 ))}
//               </GoogleMap>
//             </LoadScript>
//           </div>
          
//           <div className="chart">
//             <h4>Top Cities</h4>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={cityData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label
//                 >
//                   {cityData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </section>

//       {/* Restaurant Management Table */}
//       <section className="restaurant-management">
//         <section className="filters">
//           <h4>Restaurant Management</h4>
//           <div>
//             <input
//               type="text"
//               placeholder="Search restaurants."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <label>
//               <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
//                 <option value="All">All Cities</option>
//                 {uniqueCities.map((city, idx) => (
//                   <option key={idx} value={city}>{city}</option>
//                 ))}
//               </select>
//             </label>
//             <label>
//               <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//                 <option value="All">All Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Deactive">Deactive</option>
//               </select>
//             </label>
//           </div>
//         </section>

//         <table>
//           <thead>
//             <tr>
//               <th>Restaurant</th>
//               <th>Location</th>
//               <th>Status</th>
//               <th>Orders (Today)</th>
//               <th>Orders (Month)</th>
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
//                 <td>{r.ordersMonth}</td>
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




// leaflet 
import React, { useState } from 'react';
import './main.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: '#ID8514725',
      name: 'Spice Garden',
      location: 'Mumbai',
      address: '123 Marine Drive, Mumbai, Maharashtra 400020',
      status: 'Active',
      ordersToday: 128,
      ordersMonth: 100,
      coordinates: [19.0760, 72.8777],
    },
    {
      id: '#ID8514726',
      name: 'Tandoori Treat',
      location: 'Delhi',
      address: '45 Connaught Place, New Delhi, Delhi 110001',
      status: 'Active',
      ordersToday: 98,
      ordersMonth: 210,
      coordinates: [28.6139, 77.2090],
    },
    {
      id: '#ID8514727',
      name: 'Pizza Palace',
      location: 'Mumbai',
      address: '78 Linking Road, Bandra, Mumbai, Maharashtra 400050',
      status: 'Deactive',
      ordersToday: 0,
      ordersMonth: 110,
      coordinates: [19.0800, 72.8856],
    },
    {
      id: '#ID8514728',
      name: 'Foody Zone',
      location: 'Kanpur',
      address: '5 Mall Road, Kanpur, Uttar Pradesh 208001',
      status: 'Active',
      ordersToday: 10,
      ordersMonth: 110,
      coordinates: [26.4499, 80.3319],
    },
    {
      id: '#ID8514729',
      name: 'Agra Delight',
      location: 'Agra',
      address: '11 Fatehabad Road, Agra, Uttar Pradesh 282001',
      status: 'Active',
      ordersToday: 45,
      ordersMonth: 120,
      coordinates: [27.1767, 78.0081],
    },
    {
      id: '#ID8514730',
      name: 'Taj Biryani House',
      location: 'Agra',
      address: '9 Taj Road, Agra, Uttar Pradesh 282001',
      status: 'Deactive',
      ordersToday: 0,
      ordersMonth: 90,
      coordinates: [27.1800, 78.0100],
    },
    {
      id: '#ID8514731',
      name: 'Royal Agra Feast',
      location: 'Agra',
      address: '3 MG Road, Agra, Uttar Pradesh 282002',
      status: 'Active',
      ordersToday: 65,
      ordersMonth: 150,
      coordinates: [27.1700, 78.0020],
    },
  ]);
  

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [mapCityFilter, setMapCityFilter] = useState('All'); // New state for map city filter

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

  // Filter restaurants for the map based on mapCityFilter
  const mapFilteredRestaurants = restaurants.filter(r => {
    return mapCityFilter === 'All' || r.location === mapCityFilter;
  });

  const totalOrders = filteredRestaurants.reduce((acc, r) => acc + r.ordersToday + r.ordersMonth, 0);
  const activeRestaurants = filteredRestaurants.filter(r => r.status === 'Active').length;

  // const cityData = Object.entries(
  //   restaurants.filter(r => r.status === 'Active').reduce((acc, cur) => {
  //     acc[cur.location] = (acc[cur.location] || 0) + cur.ordersToday;
  //     return acc;
  //   }, {})
  // ).map(([name, value]) => ({ name, value }));
  const cityData = Object.entries(
    restaurants.filter(r => r.status === 'Active').reduce((acc, cur) => {
      acc[cur.location] = (acc[cur.location] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28'];

  // Function to determine marker color based on restaurant status
  const getMarkerColor = (status) => {
    return status === 'Active' ? '#00C49F' : '#FF0000'; // Green for active, Red for deactive
  };

  // Function to get center coordinates based on selected city
  const getMapCenter = () => {
    if (mapCityFilter === 'All') return [22.9734, 78.6569]; // Default center for India
    
    const cityRestaurant = restaurants.find(r => r.location === mapCityFilter);
    return cityRestaurant ? cityRestaurant.coordinates : [22.9734, 78.6569];
  };

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
            <div className="map-header">
              <h4>Restaurants Distribution</h4>
              <select 
                value={mapCityFilter} 
                onChange={(e) => setMapCityFilter(e.target.value)}
                style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px' }}
              >
                <option value="All">All Cities</option>
                {uniqueCities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <MapContainer 
              center={getMapCenter()} 
              zoom={mapCityFilter === 'All' ? 5: 12} 
              style={{ height: '300px', borderRadius: '10px' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {mapFilteredRestaurants.map((r, idx) => (
           <Marker
            key={idx}
            position={r.coordinates}
          // Check if "All Cities" is selected and show default icon, else colored icon
           icon={mapCityFilter === 'All'
            ? L.icon({ // Default icon (no color)
           iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', 
           iconSize: [25, 41],
           iconAnchor: [12, 41],
           popupAnchor: [1, -34],
        })
      : L.divIcon({
          className: 'custom-icon',
          html: `<div style="background-color: ${getMarkerColor(r.status)}; width: 20px; height: 20px; border-radius: 50%;"></div>`
        })
    }
  >
    <Popup>
      <div>
        <p><strong>Location:</strong> {r.location}</p>
        {mapCityFilter !== 'All' && (
          <>
            <p><strong>Restaurent Name:</strong> :{r.name}</p>
            <p><strong>Status:</strong> {r.status}</p>
            {/* <p><strong>Today's Orders:</strong> {r.ordersToday}</p> */}
            <p><strong>Address:</strong> {r.address}</p>
          </>
        )}
      </div>
    </Popup>
          </Marker>
                 ))}

            </MapContainer>
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
              <th>Orders (Month)</th>
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
                <td>{r.ordersMonth}</td>
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




