// Define schema
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ZipAggregatesModelSchema = new Schema({  
  state: String,
  grossIncome: Number,
  returns: Number,
  people: Number,
  elderly: Number,
  propertyOwners: Number,
  charitableContributions: Number,
  amountOfCharitableContributions: Number,
  zipCode: String,
  averageIncomePerPerson : Number,
  peoplePerReturn: Number,
  elderlyPercent: Number,
  charityAmountOfTotalGrossPercent: Number,
  charitableContributionsPercent: Number,
  propertyOwnersPercent: Number,
  rank: Number,
  tier: String
});

// Compile model from schema
const ZipAggregatesModel = mongoose.model("ZipAggregates", ZipAggregatesModelSchema);

export default ZipAggregatesModel;