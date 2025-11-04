import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'], // second element -> message if it fails
        required: [true, 'Email is required!'], // second element -> message if it fails
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
})

const User = models.User || model("User", UserSchema); // check if that model exists ||  use this if the model doesn't exist

export default User;