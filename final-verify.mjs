import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGODB_URI;

async function verify() {
  if (!URI) {
    console.log("URI_MISSING");
    return;
  }
  
  try {
    await mongoose.connect(URI);
    const dbName = mongoose.connection?.db?.databaseName;
    console.log(`📡 VERIFICATION: Connected to [${dbName}]`);
    
    if (dbName === 'invinsibleblog') {
      console.log("✅ SUCCESS: App is now pointing to the correct database.");
    } else {
      console.log("❌ FAILURE: App is still pointing to [test] or another DB.");
    }
    
    await mongoose.disconnect();
  } catch (e) {
    console.error("ERROR:", e);
  }
}

verify();
