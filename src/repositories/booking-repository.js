const {StatusCodes}=require('http-status-codes');

const {Booking}=require('../models');
const CrudRepository = require('./crud-repository');
const AppError = require('../utils/errors/app-error');

class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking)
    }

    async createBooking(data,transaction){
        const response=await Booking.create(data,{transaction:transaction});
        return response;
    }

    async get(data,transaction){
        const response=await Booking.findByPk(data,{transaction:transaction});
        if(!response){
            throw new AppError('Not able to find the resources',StatusCodes.BAD_REQUEST);
        }
        return response;
    }

    async update(id,data,transaction){
        const response=await Booking.update(data,{
            where:{
                id:id
            }
        },{transaction:transaction});
        return response;
    }
}
module.exports=BookingRepository;