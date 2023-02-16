const mongoose = require("mongoose")

const schema = mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
    name: {
        type: String,
        // required: [true, 'Name is required']
    },
    
    
//   avatarUrl: {
//     type: String,
//   },
  token: String,
  
 

  
},
  
    {
        versionKey: false,
        timestamps: true,
  }
)

const User = mongoose.model("user", schema)

module.exports = {
    User,
}