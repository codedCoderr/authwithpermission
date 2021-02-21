const { User } = require('../models/User');
const { Movie } = require('../models/Movie');
const bcrypt = require('bcryptjs');
const jsonResponse = require('../helper/responseHandler');

const UserController = {
  async updateUser(req, res) {
    try {
      let { password, username, email, permissions } = req.body;
      let { userId } = req.params;
      let user = await User.findById(userId);
      let hash;

      if (parseInt(userId) == parseInt(req.user._id)) {
        if (password) {
          const salt = await bcrypt.genSalt(10);
          hash = await bcrypt.hash(password, salt);
          password = hash;
        } else {
          password = user.password;
        }
        let body = { username, email, password, permissions };

        await User.findOneAndUpdate({ _id: userId }, { $set: body });
        const data = {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            permissions: user.permissions,
          },
        };
        return jsonResponse.success(res, 'success', 200, data);
      } else {
        return jsonResponse.error(
          res,
          'error',
          400,
          'You can only update your own profile'
        );
      }
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return jsonResponse.error(res, 'error', 400, 'User does not exist');
      }
      return jsonResponse.error(res, 'error', 400, error);
    }
  },
  async createMovie(req, res) {
    try {
      let { title, description, rating, yearOfRelease } = req.body;
      let createdBy = req.user._id;
      let movie = await new Movie({
        title,
        description,
        rating,
        yearOfRelease,
        createdBy,
      });
      await movie.save();
      return jsonResponse.success(res, 'success', 200, movie);
    } catch (error) {
      return jsonResponse.error(res, 'error', 401, error);
    }
  },
  async updateMovie(req, res) {
    try {
      let { movieId } = req.params;
      let movie = await Movie.findById(movieId);

      if (movie) {
        if (parseInt(movie.createdBy) === parseInt(req.user._id)) {
          let updatedMovie = await Movie.findOneAndUpdate(
            { _id: movieId },
            { $set: req.body },
            { new: true }
          );

          return jsonResponse.success(res, 'success', 200, updatedMovie);
        }
        return jsonResponse.error(
          res,
          'error',
          400,
          'You can only modify a movie you created'
        );
      } else {
        return jsonResponse.error(res, 'error', 400, 'Movie does not exist');
      }
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return jsonResponse.error(res, 'error', 400, 'Movie does not exist');
      }
      return jsonResponse.error(res, 'error', 400, error);
    }
  },
  async deleteMovie(req, res) {
    try {
      let { movieId } = req.params;
      let movie = await Movie.findById(movieId);

      if (movie) {
        if (parseInt(movie.createdBy) === parseInt(req.user._id)) {
          await Movie.findOneAndDelete({ _id: movieId });

          return jsonResponse.success(
            res,
            'success',
            200,
            'Movie deleted successfully'
          );
        }
        return jsonResponse.error(
          res,
          'error',
          401,
          'You can only delete a movie you created'
        );
      } else {
        return jsonResponse.error(res, 'error', 400, 'Movie does not exist');
      }
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return jsonResponse.error(res, 'error', 400, 'Movie does not exist');
      }
      return jsonResponse.error(res, 'error', 400, error);
    }
  },
};
module.exports = UserController;
