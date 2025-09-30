const reservation = require('../models/reservation');

exports.createReservation = (req, res, next) => {
    const reservationData = req.body ;
    reservationData.user = req.auth.userId; // Associer la réservation à l'utilisateur authentifié
    reservation.findOne({ 
        resource: reservationData.resource,
        $or: [
            // Chevauchement partiel ou total
            { start_time: { $lt: reservationData.end_time, $gte: reservationData.start_time } },
            { end_time: { $gt: reservationData.start_time, $lte: reservationData.end_time } },
            { start_time: { $lt: reservationData.end_time }, end_time: { $gt: reservationData.start_time } }
        ]
    })
    .then((existingReservation) => {
        if (existingReservation) {
            return res.status(409).json({ error: "Time slot already booked" });
        }
        const newReservation = new reservation({ 
            ...reservationData,
        });
        newReservation.save()
        .then (() => res.status(201).json({ message: 'Reservation created !'}))
        .catch((error)=>res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}; 

exports.getAllReservations = (req, res, next) => {
    reservation.find()
    .then((reservations) => res.status(200).json(reservations))
    .catch((error) => res.status(400).json({ error }));
}