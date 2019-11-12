const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    name: String,
    email: String,
  },
  { timestamps: true },
);

UserSchema.methods.encryptPassword = async function() {
  this.password = await bcrypt.hash(this.password, 10);
};

UserSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

mongoose.model('User', UserSchema);
