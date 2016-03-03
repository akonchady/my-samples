var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'), // library to hash a password before saving to database
    Schema = mongoose.Schema;

/* The user schema attributes / characteristics / fields */
var UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    profile: {
        type: String,
        default: ''
    },
    address: String,
    history: [{
        date: Date,
        paid: {
            type: Number,
            default: 0
        }
        /*item: {
            type: Schema.Types.ObjectId,
            ref: ''
        }*/
    }]
});


/* Hash the password before saving to database */
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        
    });
    
});

/* Compare password in the database and the one that the user types in */
