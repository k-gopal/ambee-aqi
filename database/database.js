import mongoose from "mongoose";

//db connect function where creds are fetched froom env
const connect = async (
    dbString = process.env.DB_STRING,
    dbHost = process.env.DB_USER,
    dbPass = process.env.DB_PASSWORD
) => {
    try {
        // dbString = dbString.replace("<host>", dbHost).replace("<password>", dbPass);
        dbString = "mongodb+srv://gopalk:Gopal%40T2910@one-database.yvyiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        return await mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.log("error in db connection", error);
        return error
    }
};

export default connect;