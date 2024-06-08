const Doctor = require('./models/Doctor');
const User = require('./models/User');

exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization, availability, userId } = req.body;
    const user = await User.findById(userId);
    if (!user || user.role !== 'doctor') {
      return res.status(400).json({ message: 'Invalid doctor user ID' });
    }

    const doctor = new Doctor({ name, specialization, availability, user: userId });
    await doctor.save();
    res.status(201).json({ message: 'Doctor created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add more doctor-related actions as needed