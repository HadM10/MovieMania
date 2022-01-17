require('../models/connectDB')
const Movie = require('../models/Movie')

exports.movies = async(req, res) => {  
    try {
        const movies = await Movie.find()
        res.json(movies);
    } catch (error) {
        res.status(404).json( {message: error })
    } 
}

let objMovie= {
    title : req.body.title,
    releasedate: req.body.releasedate,
    plot:req.body.plot,
    director: req.body.director,
    actors: req.body.actors,
    fromDate : req.body.fromDate,
    toDate :req.body.toDate,
    runtime: req.body.runtime,
    technology: req.body.technology,
    price:req.body.price,
    Availability: req.body.Availability,
    dateTime:req.body.dateTime
}

exports.addMovie = async(req, res) => {
    const newMovie = new Movie(objMovie);
    console.log(req.body.dateTime)
    try {
      await newMovie.save();
      res.json(newMovie);
    } catch (error) {
      res.status(400).json( { message: error })
    }
  }

  exports.updateMovie = async(req, res) => {
    const movieId = req.params.id;
    const newMovie =objMovie;
    try {
      const updateMovie = await Movie.findByIdAndUpdate({ _id:movieId }, newMovie );
      res.json(updateMovie);
    } catch (error) {
      res.status(400).json( { message: error })
    }
  }
  
  exports.deleteMovie = async(req, res) => {
    const movieId = req.params.id;
    try {
      const data = await Movie.deleteOne({ _id:movieId });
      res.json(data);
    } catch (error) {
      res.status(400).json( { message: error })
    }
  }
  
  