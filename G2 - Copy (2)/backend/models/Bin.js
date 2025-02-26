import mongoose from "mongoose";

const binSchema = new mongoose.Schema({
    bin_location: {type:location}
//   firstName: { type: String, required: true },
//   middleName: { type: String },
//   lastName: { type: String, required: true },
//   age: { type: Number, required: true },
//   gender: { type: String, required: true },
//   phone: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   homeAddress: { type: String },
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   profilePhoto: { type: String },
  // profileImage: { type: String, default: 'C:\Users\Asus\Downloads\Documents\Uni\sec_yr\WebProg\Goober\G2 - Copy (2)\src\assets\profile.png' },
});

// lat: 13.72, lng: 100.7755859
//  this.building_name = Building;
// info correct or not how many times
//   this.floor_number = Floor;
//   this.general_waste = Features_general_waste;
//   this.recycle_waste = Features_recycle_waste;
//   this.organic_waste = Features_organic_waste;
//   this.hazardous_waste = Features_hazardous_waste;
//  comment text and profile
const User = mongoose.model("Bin", userSchema);

export default User;
