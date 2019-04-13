const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true, 
        min: [4, 'Username must at least 4 characters'], 
        max: [16, 'Username can not exceed 16 characters'], 
        // match: [/^A-Za-z0-9/, 'Username can only contain letters and numbers']
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Password must be at least 8 characters'],
        max: [16, 'Password can not exceed 16 characters']
    },
    email: {
        type: String,
        required: true,
        // match: [/.+@.\..+/, 'Please enter a valid email address']
    },
    designs: [{
        type: Schema.Types.ObjectId,
        ref: "Design"
    }],

    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Design"
    }],
    avatar: {
        type: String
    },
    background: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Hooks are automatic methods that run during various phases of the User Model lifecycle
// In this case, before a User is created, we will automatically hash their password

// userSchema.pre("save", async function(next) {
//     console.log("pre save function executing");
//     user.password = await bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
// });


module.exports = User;