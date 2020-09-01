const placeModel = require('../../models/placeModel');
const PlaceModel = new placeModel();

module.exports = (app) => {
    app.get('/test', async (req, res, next) => {
        try {
            const places = PlaceModel.getAllPlaces();
            return res.status(200).json(places);
        } catch (error) {
            return next(error);
        }
    });
}