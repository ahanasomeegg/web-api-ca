import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from './reviewModel';

const router = express.Router()

router.post('/', asyncHandler(async (req, res) => {
    const review = await Review.create(req.body);
    res.status(201).json(review);
}));

router.get('/:movieId', asyncHandler(async (req, res) => {
    const reviews = await Review.findByMovieId(req.params.movieId);
    res.status(200).json(reviews);
}));

export default router;
