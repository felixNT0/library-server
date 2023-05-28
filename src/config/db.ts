import { config } from "dotenv";
import { connect } from "mongoose";

config();

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
