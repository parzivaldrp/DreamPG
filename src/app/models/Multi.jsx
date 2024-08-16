const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  // Property Details Form Fields
  propertyName: String,
  ownerName: String,
  ownerEmail: String,
  mobileNumber: String,
  address: String,
  houseFlatBlockNo: String,
  pincode: String,
  city: String,
  state: String,

  // Additional Details Form Fields
  whoCanStay: String,
  idealFor: String,
  registrationFor: String,
  occupancy: String,
  roomOptions: {
    totalRooms: Number,
    occupied: Number,
    vacantRooms: Number,
  },
  amenities: {
    food: Boolean,
    wifi: Boolean,
    fullyFurnished: Boolean,
    roWater: Boolean,
    cctv: Boolean,
    ac: Boolean,
    geyser: Boolean,
    laundryMachine: Boolean,
    tv: Boolean
  },

  // Agreement Details Form Fields
  agreementDuration: String,
  securityDepositDuration: String,
  noticePeriod: String,

  // Rent Details Form Fields
  rentCycle: String,
  latePaymentFine: String,

  // Owner Form Fields
  budgetRange: String,
  extraCharge: String,
  propertyImages: [{ type: String }], // Array of image file names
  description: String,
  notARobot: Boolean
});
const FormData = mongoose.models.All_Form || mongoose.model("All_Form", formDataSchema);

export default FormData;
