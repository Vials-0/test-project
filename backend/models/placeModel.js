const low = require('lowdb')
const nanoid = require('nanoid').nanoid;
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./database/db.json')
const db = low(adapter)


class PlaceModel {
    constructor() {

        // Singleton
        if (!!PlaceModel.instance) {
            return PlaceModel.instance;
        }

        // Set default places 'table' in JSON database
        db.defaults({ places: [] })
            .write()

        PlaceModel.instance = this;
        return this;
    }

    // Get all place entries
    getAllPlaces() {
        try {
            const places = db.get('places').value();
            return places;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Select an individual place
     * @param {string} id 
     */
    getPlaceById(id) {
        try {
            const place = db.get('places')
                .find({ id: id })
                .value();
            return place;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a place entry
     * @param {string} name 
     * @param {string} desc 
     * @param {string} addr 
     * @param {string} phone 
     * @param {string} website 
     * @param {boolean} employeeMask 
     * @param {boolean} customerMask 
     */
    createPlace(name, desc, addr, phone, website, employeeMask, customerMask) {
        try {
            db.get('places')
                .push({
                    name: name,
                    description: desc,
                    address: addr,
                    phone: phone,
                    website: website,
                    requireEmployeeMask: employeeMask,
                    requireCustomerMask: customerMask,
                    id: nanoid()
                })
                .write()

            return 'created';
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Update a place entry
     * @param {string} id 
     * @param {object} update - An object with the properties to update on a place
     */
    updatePlace(id, update) {
        try {
            db.get('places')
                .find({ id: id })
                .assign(update)
                .write();

            return 'updated';
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a place entry
     * @param {string} id 
     */
    deletePlace(id) {
        try {
            db.get('places')
                .remove({ id: id })
                .write();

            return 'deleted';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PlaceModel;

// Data structure

// const place = {
//     name: 'place_name',
//     description: 'place_description',
//     address: '123 Address Drive',
//     phone: '1-800-555-5555',
//     website: 'www.testwebsite.net',
//     requireEmployeeMask: true,
//     requireCustomerMask: true, 
// }