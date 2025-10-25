import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
}, { timestamps: true })

userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {

        this.password = await bcrypt.hash(this.password, 10) // Hashing
    }
    next()
})


// Hash password before updating

userSchema.pre('findOneAndUpdate', async function(next) {

    const update = this.getUpdate()

    if (update.$set && update.$set.password) {
        update.$set.password = await bcrypt.hash(update.$set.password, 10)
    }

    next()
})

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export default mongoose.model('User', userSchema)