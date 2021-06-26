import mongoose from 'mongoose';


const connectDB = mongoose.connect(`${import.meta.env.VITE_URI}`, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
});


export default connectDB;