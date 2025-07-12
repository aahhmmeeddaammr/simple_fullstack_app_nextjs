import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const result = await mongoose.connect(
      "mongodb+srv://Ahmed_01:Ahmed123@cluster0.uti8zl6.mongodb.net/nextapp?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log({ result });
    console.log("connect to db successfully");
  } catch (error) {
    console.log({ error });
    console.log("Faild to connect to db");
  }
};

export default connectToDb;
