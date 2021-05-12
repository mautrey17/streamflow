const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false },
	tasks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Task"
		}
	],
	notes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Note"
		}
	],
	projects: [
		{
			type: Schema.Types.ObjectId,
			ref: "Project"
		}
	],
	avatar: { 
		top: {type: String},
		accessories: {type: String},
		hairColor: {type: String},
		facialHair: {type: String},
		clothes: {type: String},
		eyes: {type: String},
		eyeBrow: {type: String},
		mouth: {type: String},
		skin: {type: String}
	 }
});

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
};

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.password) {
		// console.log('No password provided!');
		next();
	} else {
		this.password = this.hashPassword(this.password);
		next();
	}
})

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
