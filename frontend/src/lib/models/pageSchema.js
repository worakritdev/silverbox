import mongoose from 'mongoose';
const { Schema } = mongoose;

const pageSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    content: String,
    url: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});


const Page = mongoose.model('Page', pageSchema);

export default Page