const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Set up middleware
app.use(bodyParser.json());

// Set up database connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ticketing';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routes
const Ticket = require('./models/Ticket');

app.post('/tickets', async (req, res) => {
  try {
    const ticket = new Ticket({
      barcode: generateBarcode()
    });

    await ticket.save();

    res.status(201).json({
      barcode: ticket.barcode
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Server error'
    });
  }
});

function generateBarcode() {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let barcode = '';
  
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      barcode += charset[randomIndex];
    }
  
    return barcode;
  }
  

  app.put('/tickets/:barcode', async (req, res) => {
    try {
      const ticket = await Ticket.findOne({ barcode: req.params.barcode });
  
      if (!ticket) {
        return res.status(404).json({
          error: 'Ticket not found'
        });
      }
  
      ticket.scanCount++;
      await ticket.save();
  
      res.json({
        scanCount: ticket.scanCount
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'Server error'
      });
    }
  });
  

  app.get('/tickets/:barcode', async (req, res) => {
    try {
      const ticket = await Ticket.findOne({ barcode: req.params.barcode });
  
      if (!ticket) {
        return res.status(404).json({
          error: 'Ticket not found'
        });
      }
  
      res.json({
        barcode: ticket.barcode,
        scanCount: ticket.scanCount
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'Server error'
      });
    }
  });
  
  
  

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
