import mongoose from "mongoose";
const districtSchema = mongoose.Schema({
  districtName: {
    type: String,
  },
  _id: {
    type: String,
    default: function () {
      return this.districtName.toLowerCase();
    },
  },
  divisionName: {
    type: String,
  },
  districtNameBangla: {
    type: String,
  },
  upazilla: [
    {
      upazillaName: {
        type: String,
      },
      upazillaNameBangla: {
        type: String,
      },
    },
  ],
});
const District =
  mongoose.models.District || mongoose.model("District", districtSchema);
export default District;
