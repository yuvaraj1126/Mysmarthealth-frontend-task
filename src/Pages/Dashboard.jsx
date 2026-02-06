import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
const [user, setUser] = useState(null);
const navigate = useNavigate();

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  } else {
    navigate("/login"); 
  }
}, []);

const handleLogout = () => {
  localStorage.clear();
  navigate("/login");
};

const cards = [
{ title: "Policy", value: 52 },
{ title: "Corporates", value: 34 },
{ title: "Employees", value: 62951 },
{ title: "Lives", value: 182172 },
];

const [rows, setRows] = useState([]);

const [form, setForm] = useState({
date: "",
policies: "",
corporates: "",
active: "",
inactive: "",
members: "",
lives: "",
});

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const addRow = () => {
  console.log("Adding:", form);

  if (!form.date) {
    alert("Please enter data first");
    return;
  }

  const newRow = {
    id: rows.length + 1,
    ...form,
  };

  setRows(prev => [...prev, newRow]);

  setForm({
    date: "",
    policies: "",
    corporates: "",
    active: "",
    inactive: "",
    members: "",
    lives: "",
  });
};

  const menuItems = [
  { title: "Dashboard", dropdown: false },
  { title: "Configuration", dropdown: true },
  { title: "Online Data", dropdown: true },
  { title: "RFQ", dropdown: false },
];
function DropdownItem({ title }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className="p-3 rounded cursor-pointer hover:bg-teal-600 flex justify-between"
      >
        {title}
        <span>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="ml-4 bg-gray-800 p-2 rounded text-sm text-gray-300">
          No data found
        </div>
      )}
    </div>
  );
}
return ( <div className="flex h-screen bg-gray-100">

```


<div className="w-64 bg-gray-900 text-white p-4 space-y-2">
  <h2 className="text-xl font-bold mb-6">Dashboard</h2>

  {menuItems.map((item, i) =>
    item.dropdown ? (
      <DropdownItem key={i} title={item.title} />
    ) : (
      <div
        key={i}
        className="p-3 rounded cursor-pointer hover:bg-teal-600"
      >
        {item.title}
      </div>
    )
  )}
</div>


 
  <div className="flex-1 overflow-auto">

  
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold text-lg">Dashboard Overview</h1>
      <p>Welcome {user?.username}</p>
          <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
      
    </div>

    <div className="p-6">

      <div className="grid grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">{card.title}</p>
            <h2 className="text-2xl font-bold">{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-4 gap-3">

        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        ))}

        <button
          onClick={addRow}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Data
        </button>

      </div>

      {/* Table */}
      <table className="w-full border-collapse bg-white rounded shadow">

        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3">SL NO</th>
            <th className="p-3">DATE</th>
            <th className="p-3">POLICIES</th>
            <th className="p-3">CORPORATES</th>
            <th className="p-3">ACTIVE</th>
            <th className="p-3">INACTIVE</th>
            <th className="p-3">MEMBERS</th>
            <th className="p-3">LIVES</th>
          </tr>
        </thead>

      <tbody>
  {rows.length === 0 ? (
    <tr>
      <td colSpan="8" className="p-6 text-center text-gray-500">
        Try adding data from the add data
      </td>
    </tr>
  ) : (
    rows.map((row) => (
      <tr key={row.id} className="border-b text-center">
        <td className="p-3">{row.id}</td>
        <td className="p-3">{row.date}</td>
        <td className="p-3">{row.policies}</td>
        <td className="p-3">{row.corporates}</td>
        <td className="p-3">{row.active}</td>
        <td className="p-3">{row.inactive}</td>
        <td className="p-3">{row.members}</td>
        <td className="p-3">{row.lives}</td>
      </tr>
    ))
  )}
</tbody>


      </table>

    </div>
  </div>
</div>


);
}
