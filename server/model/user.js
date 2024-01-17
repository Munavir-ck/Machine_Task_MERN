import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
      },

    image: {
      type: String,
     
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: [6],
      },  

  },
  {
    timestamps: true,
  }
);

const clientmodel = mongoose.model("client", clientSchema);
export default clientmodel;