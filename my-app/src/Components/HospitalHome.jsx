// pages/hospital-management.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


export default function HospitalManagement() {
  const router = useRouter();
  
  // State for departments
  const [departments, setDepartments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    totalBeds: 0,
    availableBeds: 0,
    equipments: [],
    facilities: []
  });
 const [hospitalDataMain, sethospitalDataMain] = useState();
  

  useEffect(() => {
    const name = localStorage.getItem("HName");
    const hospital = JSON.parse(localStorage.getItem("hospitalUser"));
console.log(hospital.hospitalName +"Sdfasd"); // or ._id, .contactNumber, etc.
sethospitalDataMain(hospital)




  if (!name || !hospital.hospitalName) {
    router.push("/hregistration"); // Redirect to the registration page
  }else{
    setDepartments(hospital.departments)

  }
}, []);



  const [hospitalData, setHospitalData] = useState({
    hospitalName: "",
    id: "",
    contact: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHospitalData({
        hospitalName: localStorage.getItem("HName") || "",
        id: localStorage.getItem("id") || "",
        contact: localStorage.getItem("contact") || ""
      });
    }
  }, []);

  const [name, setName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("HName");
    if (storedName) setName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("HName");
    router.push("/");
  };

  // State for doctors
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    departmentId: '',
    availability: {
      monday: { isAvailable: false, hours: '9:00-17:00' },
      tuesday: { isAvailable: false, hours: '9:00-17:00' },
      wednesday: { isAvailable: false, hours: '9:00-17:00' },
      thursday: { isAvailable: false, hours: '9:00-17:00' },
      friday: { isAvailable: false, hours: '9:00-17:00' },
      saturday: { isAvailable: false, hours: '9:00-17:00' },
      sunday: { isAvailable: false, hours: '9:00-17:00' },
    }
  });

  // State for equipment and facilities
  const [newEquipment, setNewEquipment] = useState('');
  const [newFacility, setNewFacility] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDepartmentE, setSelectedDepartmentE] = useState('');
  const [selectedDepartmentD, setSelectedDepartmentD] = useState('');
  const [selectedDepartmentF, setSelectedDepartmentF] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    type: '',
    id: '',
    name: ''
  });

  // Fetch departments and doctors on component mount
  useEffect(() => {
    fetchDepartments();
    fetchDoctors();
  }, []);

  // API calls
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const id = localStorage.getItem("id");
      const response = await axios.get(`http://localhost:5000/hospitals/${id}/departments`);
     
      setDepartments(response.data);
    } catch (err) {
      setError('Failed to fetch departments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    const id = localStorage.getItem("id");
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/hospitals/${id}/doctors`);
      setDoctors(response.data);
    } catch (err) {
      setError('Failed to fetch doctors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addDepartment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/hospitals/${hospitalData.id}/departments`, newDepartment);
      setDepartments([...departments, response.data.newDepartment]);
      setNewDepartment({
        name: '',
        totalBeds: 0,
        availableBeds: 0,
        equipments: [],
        facilities: []
      });
      setSuccess('Department added successfully');
    } catch (err) {
      setError('Failed to add department');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/hospitals/${hospitalData.id}/departments/${selectedDepartment}/doctors`, newDoctor);
      setDoctors((prevDoctors) => [...prevDoctors,  response.data.doctor]);
     
      setNewDoctor({
        name: '',
        specialization: '',
        departmentId: '',
        availability: {
          monday: { isAvailable: false, hours: '9:00-17:00' },
          tuesday: { isAvailable: false, hours: '9:00-17:00' },
          wednesday: { isAvailable: false, hours: '9:00-17:00' },
          thursday: { isAvailable: false, hours: '9:00-17:00' },
          friday: { isAvailable: false, hours: '9:00-17:00' },
          saturday: { isAvailable: false, hours: '9:00-17:00' },
          sunday: { isAvailable: false, hours: '9:00-17:00' },
        }
      });
      setSuccess('Doctor added successfully');
    } catch (err) {
      setError('Failed to add doctor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addEquipmentToDepartment = async () => {
    if (!selectedDepartmentE || !newEquipment) {
      setError('Please select a department and enter equipment name');
      return;
    }
    
    setLoading(true);
    try {
      const hospitalid = localStorage.getItem("id");
      const response = await axios.put(
        `http://localhost:5000/hospitals/${hospitalid}/departments/${selectedDepartmentE}/equipment`, 
        { name: newEquipment }
      );

      const updatedDepartments = departments.map(dept => 
        dept.name === selectedDepartmentE 
          ? { ...dept, equipment: [...dept.equipment, newEquipment] } 
          : dept
      );
      
      setDepartments(updatedDepartments);
      setNewEquipment('');
      setSuccess('Equipment added successfully');
    } catch (err) {
      setError('Failed to add equipment');
      console.error(err);
    } finally {
      setLoading(false);
    }
};

  const addFacilityToDepartment = async () => {
    if (!selectedDepartmentF || !newFacility) {
      setError('Please select a department and enter facility name');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/hospitals/${hospitalData.id}/departments/${selectedDepartmentF}/facilities`, { facilities: newFacility });
      
      // Update the departments state
      const updatedDepartments = departments.map(dept => 
        dept.name === selectedDepartmentF 
          ? { ...dept, facilities: [...dept.facilities,newFacility ] } 
          : dept
      );
      console.log("fasdfadsf")
      setDepartments(updatedDepartments);
      setNewFacility('');
      setSuccess('Facility added successfully');
    } catch (err) {
      setError('Failed to add facility');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateBedCount = async (department, field, value) => {
    setLoading(true);
    try {
      const hospitalid = localStorage.getItem("id");
      const response = await axios.patch(`http://localhost:5000/hospitals/${hospitalid}/departments/${department}`, 
        { [field]: value }
      );

      // Update UI
      setDepartments(departments.map(dept => 
        dept.name === department ? { ...dept, [field]: value } : dept
      ));

      setSuccess('Bed count updated successfully');
    } catch (err) {
      setError('Failed to update bed count');
      console.error(err);
    } finally {
      setLoading(false);
    }
};

  const handleDoctorAvailabilityChange = (day, field, value) => {
    setNewDoctor({
      ...newDoctor,
      availability: {
        ...newDoctor.availability,
        [day]: {
          ...newDoctor.availability[day],
          [field]: field === 'isAvailable' ? !newDoctor.availability[day].isAvailable : value
        }
      }
    });
  };

  // Delete functions
  const promptDelete = (type, id, name) => {
    setConfirmDelete({
      show: true,
      type,
      id,
      name
    });
  };

  const cancelDelete = () => {
    setConfirmDelete({
      show: false,
      type: '',
      id: '',
      name: ''
    });
  };

  const confirmDeleteAction = async (Departementname) => {
    setLoading(true);
    const { type, id ,name } = confirmDelete;
    const hospitalName = localStorage.getItem("HName");
    const hospitalid = localStorage.getItem("id");
    console.log("jj"+id)
    
    try {
      if (type === 'department') {
        await axios.delete(`http://localhost:5000/hospitals/${hospitalid}/departments/${Departementname}`);
        setDepartments(departments.filter(dept => dept.name !== Departementname));
        setSuccess('Department deleted successfully');
      } else if (type === 'doctor') {
 await axios.delete(`http://localhost:5000/hospitals/${hospitalid}/doctors/${name}/Department/${Departementname}`);
        setDoctors(doctors.filter(doc => doc._id !== id));
        setSuccess("Doctor deleted successfully");

      } else if (type === 'equipment') {
        const [deptId, equipId] = id.split('-'); // Ensure correct splitting
    
        try {
            await axios.delete(`http://localhost:5000/hospitals/${hospitalid}/departments/${deptId}/equipment/${name}`);
    
            setDepartments(prevDepartments =>
                prevDepartments.map(dept =>
                    dept.name === selectedDepartmentE 
                        ? { 
                            ...dept, 
                            equipment: dept.equipment.filter(equip => equip !== name) 
                          }
                        : dept
                )
            );
    
            setSuccess('Equipment deleted successfully');
        } catch (error) {
            console.error("Error deleting equipment:", error);
        }
  
    
      } else if (type === 'facility') {
        const [deptId, facilityId] = id.split('-');
        await axios.delete(`http://localhost:5000/hospitals/${hospitalid}/departments/${deptId}/facilities/${name}`);
        
        setDepartments(prevDepartments =>
          prevDepartments.map(dept =>
              dept.name === selectedDepartmentF 
                  ? { 
                      ...dept, 
                      facilities: dept.facilities.filter(equip => equip !== name) 
                    }
                  : dept
          )
      );
        
        // setDepartments(updatedDepartments);
        setSuccess('Facility deleted successfully');
      }
    } catch (err) {
      setError(`Failed to delete ${type}`);
      console.error(err);
    } finally {
      setLoading(false);
      cancelDelete();
    }
  };

  return (
    <>
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hospital Finder</h1>
          <p className="text-blue-100">Find hospitals and check availability</p>
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{name}</span>
            <span>👤</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2  bg-white text-black shadow-md rounded">
            <button
  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full"
  onClick={handleLogout}
>
  Logout
</button>

            </div>
          )}
        </div>
      </div>
    </header>
   
    <div className="min-h-screen bg-gray-100 p-6">
       
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-800">Hospital Management System</h1>
        
        {/* Alerts */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button className="float-right" onClick={() => setError('')}>×</button>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
            <button className="float-right" onClick={() => setSuccess('')}>×</button>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {confirmDelete.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
              <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
              <p className="mb-4">
                Are you sure you want to delete {confirmDelete.type} "{confirmDelete.name}"? 
                This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => confirmDeleteAction(confirmDelete.name)}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Management Section */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Department Management</h2>
            
            <form onSubmit={addDepartment} className="mb-6">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Department Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Total Beds</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full p-2 border rounded"
                    value={newDepartment.totalBeds}
                    onChange={(e) => setNewDepartment({...newDepartment, totalBeds: parseInt(e.target.value)})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Available Beds</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full p-2 border rounded"
                    value={newDepartment.availableBeds}
                    onChange={(e) => setNewDepartment({...newDepartment, availableBeds: parseInt(e.target.value)})}
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Department'}
              </button>
            </form>
            
            <h3 className="text-lg font-medium mb-2 text-blue-600">Existing Departments</h3>
            {departments.length === 0 ? (
              <p className="text-gray-500">No departments added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Total Beds</th>
                      <th className="py-2 px-4 border-b">Available Beds</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept) => (
                      <tr key={dept.id}>
                        <td className="py-2 px-4 border-b">{dept.name}</td>
                        <td className="py-2 px-4 border-b">
                          <input
                            type="number"
                            min="0"
                            className="w-20 p-1 border rounded text-center"
                            value={dept.totalBeds}
                            onChange={(e) => updateBedCount(dept.name, 'totalBeds', parseInt(e.target.value))}
                          />
                        </td>
                        <td className="py-2 px-4 border-b">
                          <input
                            type="number"
                            min="0"
                            max={dept.totalBeds}
                            className="w-20 p-1 border rounded text-center"
                            value={dept.availableBeds}
                            onChange={(e) => updateBedCount(dept.name, 'availableBeds', parseInt(e.target.value))}
                          />
                        </td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex space-x-2">
                           
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => promptDelete('department', dept.id, dept.name)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Doctor Management Section */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Doctor Management</h2>
            
            <form onSubmit={addDoctor} className="mb-6">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Doctor Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Specialization</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newDoctor.specialization}
                  onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Department</label>
                <select
                  className="w-full p-2 border rounded mb-2"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Availability</label>
                <div className="bg-gray-50 p-3 rounded border">
                  {Object.keys(newDoctor.availability).map((day) => (
                    <div key={day} className="flex items-center mb-2">
                      <div className="w-1/3">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={newDoctor.availability[day].isAvailable}
                            onChange={() => handleDoctorAvailabilityChange(day, 'isAvailable')}
                          />
                          <span className="ml-2 capitalize">{day}</span>
                        </label>
                      </div>
                      
                      <div className="w-2/3">
                        <input
                          type="text"
                          className="w-full p-1 border rounded"
                          value={newDoctor.availability[day].hours}
                          onChange={(e) => handleDoctorAvailabilityChange(day, 'hours', e.target.value)}
                          disabled={!newDoctor.availability[day].isAvailable}
                          placeholder="e.g. 9:00-17:00"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Doctor'}
              </button>
            </form>
            
            <h3 className="text-lg font-medium mb-2 text-blue-600">Existing Doctors</h3>
            {doctors.length === 0 ? (
              <p className="text-gray-500">No doctors added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Specialization</th>
                      <th className="py-2 px-4 border-b">Department</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor._id}>
                        <td className="py-2 px-4 border-b">{doctor.name}</td>
                        <td className="py-2 px-4 border-b">{doctor.specialization}</td>
                        <td className="py-2 px-4 border-b">
                          {departments.find(d => d.id === doctor.departmentId)?.name || 'Unknown'}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => setSelectedDoctor(doctor)}
                            >
                              View Schedule
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => promptDelete('doctor', doctor._id, doctor.name)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {selectedDoctor && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-96 relative">
    <div className="flex justify-end mt-4">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={() => setSelectedDoctor(null)}
      >
        ✖
      </button>
      </div>
      <h2 className="text-lg font-bold mb-4">{selectedDoctor.name}'s Schedule</h2>
      <ul>
        {Object.entries(selectedDoctor.availability).map(([day, { isAvailable, hours }]) => (
          <li key={day} className="mb-2">
            <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {isAvailable ? hours : "Not Available"}
          </li>
        ))}
      </ul>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
        onClick={() => setSelectedDoctor(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

          </div>
        </div>
        
        {/* Facilities and Equipment Section */}
        <div className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Facilities & Equipment Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-600">Add Equipment</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Department</label>
                <select
                  className="w-full p-2 border rounded mb-2"
                  value={selectedDepartmentE}
                  onChange={(e) => setSelectedDepartmentE(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
                
                <label className="block text-gray-700 mb-2">Equipment Name</label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-l"
                    value={newEquipment}
                    onChange={(e) => setNewEquipment(e.target.value)}
                    placeholder="e.g. MRI Scanner, X-Ray Machine"
                  />
                  <button
                    type="button"
                    className="bg-blue-600 text-white py-2 px-4 rounded-r hover:bg-blue-700"
                    onClick={addEquipmentToDepartment}
                    disabled={loading || !selectedDepartmentE}
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {selectedDepartmentE && (
                <div>
                  <h4 className="font-medium mb-2">
                    Equipment in {departments.find(d => d.name === selectedDepartmentE)?.name || 'Selected Department'}
                  </h4>
                  <ul className="list-disc pl-5">
                   {console.log("Departments:", JSON.stringify(departments, null, 2))                  }
                    {departments.find(d => d.name === selectedDepartmentE)?.equipment.map((item) => (
                      <li key={item.id} className="mb-1 flex justify-between items-center">
                        <span>{item}</span>
                        <button 
                          className="text-red-600 hover:text-red-800 text-sm"
                          onClick={() => promptDelete('equipment', selectedDepartmentE, item)}
                        >
                          Delete
                        </button>
                      </li>
                    )) || <li className="text-gray-500">No equipment added yet.</li>}
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-600">Add Facility</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Department</label>
                <select
                  className="w-full p-2 border rounded mb-2"
                  value={selectedDepartmentF}
                  onChange={(e) => setSelectedDepartmentF(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
                
                <label className="block text-gray-700 mb-2">Facility Name</label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-l"
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    placeholder="e.g. ICU, Emergency Room, Cafeteria"
                  />
                  <button
                    type="button"
                    className="bg-blue-600 text-white py-2 px-4 rounded-r hover:bg-blue-700"
                    onClick={addFacilityToDepartment}
                    disabled={loading || !selectedDepartmentF}
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {selectedDepartmentF && (
                <div>
                  <h4 className="font-medium mb-2">
                    Facilities in {departments.find(d => d.name === selectedDepartmentF)?.name || 'Selected Department'}
                  </h4>
                  <ul className="list-disc pl-5">
                    {departments.find(d => d.name === selectedDepartmentF)?.facilities.map((item) => (
                      <li key={item.id} className="mb-1 flex justify-between items-center">
                        <span>{item}</span>
                        <button 
                          className="text-red-600 hover:text-red-800 text-sm"
                          onClick={() => promptDelete('facility', selectedDepartmentF, item)}
                        >
                          Delete
                        </button>
                      </li>
                    )) || <li className="text-gray-500">No facilities added yet.</li>}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
      </div>
    </>
  );
}