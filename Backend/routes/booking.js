// routes/booking.js
const express = require('express');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const User = require('../models/User')

const nodemailer = require('nodemailer');







router.post('/book', authMiddleware, async (req, res) => {
  const { roomId, checkIn, checkOut, paymentDetails, note } = req.body;
  const userId = req.userId;

  try {
    console.log(process.env.EMAIL_USER , process.env.EMAIL_PASS);
    const booking = new Booking({ roomId, userId, checkIn, checkOut, paymentDetails, note });
    await booking.save();

    await Room.findByIdAndUpdate(roomId, { availability: false }, { new: true });

    const user = await User.findById(userId);
    const room = await Room.findById(roomId);

    const htmlContent = `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 20px; background-color: #f6f6f6;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <div style="background: #4CAF50; color: #ffffff; padding: 20px; text-align: center;">

        <h2 style="margin: 0;">Greetings From Heavenly Hotels</h2>
        <h2 style="margin-top: 10px;">Booking Confirmation</h2>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Hello ${user.name},</p>
        <p style="font-size: 16px;">Thank you for booking with us! Here are your booking details:</p>
        
        <div style="border: 1px solid #ddd; padding: 20px; border-radius: 5px; background-color: #f9f9f9;">
          <h3 style="margin-top: 0; color: #4CAF50;">Room: ${room.name}</h3>
          <p style="margin: 5px 0;"><strong>Check-In Date:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
          <p style="margin: 5px 0;"><strong>Check-Out Date:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
          <p style="margin: 5px 0;"><strong>Special Note:</strong> ${note ? note : 'None'}</p>
        </div>
        
        <p style="font-size: 16px;">We look forward to your stay!</p>
      </div>
      <footer style="margin-top: 20px; padding: 20px; text-align: center; background: #f0f0f0;">
        <p style="font-size: 0.9em; color: #555;">Best regards, <br> Heavenly Hotels</p>
      </footer>
    </div>
  </div>
`;


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

    

    const mailOptions = {
      from: "info@heavenlyhotels.com",
      to: user.email,
      subject: 'Booking Confirmation',
      html: htmlContent, };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error.message);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.json({ booking });
  } catch (error) {
    console.error('Booking failed:', error.message);
    res.status(400).send('Booking failed');
  }
});





router.get('/rooms', async (req, res) => {
  const rooms = await Room.find(); 
  res.json({ rooms });
});


router.post('/addroom' , async(req,res)=>{
  try {
    const {name,    price,    description,    availability,    image  } = req.body;
    const room = new Room({name,    price,    description,    availability,    image  });
    await room.save();
     res.json({success:true})
  } catch (error) {
    res.status(500).send('Server error');
  }
})



router.get('/rooms/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    
    const room = await Room.findById(id);
    console.log(room);
    
    if (!room) return res.status(404).send('Room not found');
    res.json({ room });
  } catch (error) {
    res.status(500).send('Server error');
  }
});



router.get('/user-bookings', authMiddleware, async (req, res) => {
  const userId = req.userId; 
  console.log(userId); 

  try {
    const bookings = await Booking.find({ userId }).populate('roomId'); 
    res.json({ bookings });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Failed to retrieve bookings');
  }
});




module.exports = router;

// kxap vblf bpxh zben