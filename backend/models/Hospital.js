import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: { type: String, enum: ['Available', 'Unavailable'], required: true }
});

// Department Schema (Embedded in Hospital)
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalBeds: { type: Number, required: true },
  availableBeds: { type: Number, required: true },
  doctors: [doctorSchema], // Array of doctors inside each department
  equipment: [String], 
  facilities: [String]
});

// Hospital Schema (Contains Array of Departments)
const hospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  contactNumber: { type: String, required: true, unique: true },
  departments: [departmentSchema], // Array of departments inside each hospital
  password: { type: String, required: true }
});


export const HospitalSchema  = mongoose.model("HospitalRegistration",hospitalSchema);
