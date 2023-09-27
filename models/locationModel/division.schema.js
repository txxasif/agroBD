import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
  divisionName: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    default: function () {
      return this.divisionName.toLowerCase();
    },
  },
  divisionNameBangla: {
    type: String,
    required: true,
  },
});
const Division =
  mongoose.models.Division || mongoose.model("Division", divisionSchema);
export default Division;
