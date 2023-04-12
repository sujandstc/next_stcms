import mongoose from "mongoose";

const siteDataSchema = new mongoose.Schema(
  {
    dynamic_id: {
      type: String,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

siteDataSchema.index({
  dynamic_id: 1,
});

const siteDataModel = mongoose.model("next_stcms_data", siteDataSchema);

export default siteDataModel;
