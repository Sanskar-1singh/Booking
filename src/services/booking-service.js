const axios=require('axios');
const {ServerConfig}=require('../config/index');
const {BookingRepository}=require('../repositories');
const db=require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const bookingRepository=new BookingRepository();

async function createBooking(data){
    const transaction=await db.sequelize.transaction();
    try {
        console.log(data);
        console.log(data.flightId);
        const flight=await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightData=flight.data.data;//why????
        if(data.noOfSeats>flightData.totalSeats){
             throw new AppError('Not enough seats available',StatusCodes.BAD_REQUEST);
        }
        
        const totalBillingAmount=data.noOfSeats*flightData.price;
         console.log(totalBillingAmount);

         const bookingPayload={...data,totalCost:totalBillingAmount};///(...data) is spread operator it copies all data of data object all at once>> 
        
         const booking=await  bookingRepository.create(bookingPayload,transaction);
          
         await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
            seats:data.noOfSeats
         })
          
         await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }

}
module.exports={
    createBooking
}