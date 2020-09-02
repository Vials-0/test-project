const placeModel = require('../../models/placeModel');
const PlaceModel = new placeModel();

module.exports = (app) => {

    app.get('/places', async (req, res, next) => {
        try {
            const places = PlaceModel.getAllPlaces();
            return res
                .status(200)
                .json({
                    success: true,
                    result: places
                });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
            // return next(error);
        }
    });

    app.get('/place/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const place = PlaceModel.getPlaceById(id);
            return res
                .status(200)
                .json({
                    success: true,
                    result: place
                });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
            // return next(error);
        }
    });

    app.post('/place', async (req, res, next) => {
        try {
            const { place } = req.body;
            const {
                name,
                description,
                address,
                phone,
                website,
                imageUrl,
                requireEmployeeMask,
                requireCustomerMask
            } = place;

            const result = PlaceModel.createPlace(name, description, address, phone, website, requireEmployeeMask, requireCustomerMask, imageUrl);
            return res
                .status(200)
                .json({
                    success: true,
                    result: result
                });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
            // return next(error);
        }
    });

    app.put('/place/:id', async (req, res, next) => {
        try {
            const { place } = req.body;
            const { id } = req.params;

            const result = PlaceModel.updatePlace(id, place);
            return res
                .status(200)
                .json({
                    success: true,
                    result: result
                });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
            // return next(error);
        }
    });

    // test
    app.delete('/place/:id', async (req, res, next) => {
        try {
            const { id } = req.params;

            const result = PlaceModel.deletePlace(id);
            return res
                .status(200)
                .json({
                    success: true,
                    result: result
                })
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
            // return next(error);
        }
    });
}