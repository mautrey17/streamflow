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
	email: { type: String, unique: false, required: false },
	avatar: {
		style: { type: String, unique: false },
		top: { type: String, unique: false },
		accessories: { type: String, unique: false },
		hairColor: { type: String, unique: false },
		facialHair: { type: String, unique: false },
		facialColor: { type: String, unique: false },
		clothes: { type: String, unique: false },
		eyes: { type: String, unique: false },
		eyebrow: { type: String, unique: false },
		mouth: { type: String, unique: false },
		skin: { type: String, unique: false }
	},
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
