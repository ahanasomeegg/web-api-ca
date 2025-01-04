import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    movieId: { type: Number, required: true }, 
    author: { type: String, required: true }, 
    content: { type: String, required: true }, 
    rating: { type: Number, min: 0, max: 10 }
});

ReviewSchema.statics.findByMovieId = function(movieId) {
    return this.find({ movieId: movieId });
};

export default mongoose.model('Reviews', ReviewSchema);