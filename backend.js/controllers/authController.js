import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "2d",
    });
};

export const register = async (req, res) => {
    const { email, username, password, role, gender } = req.body;

    try {
        let user = null;
        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (!user && role === 'patient') {
            user = new User({
                username,
                email,
                password: hashPassword,
                gender,
                role
            });
        } else if (!user && role === 'doctor') {
            user = new Doctor({
                username,
                email,
                password: hashPassword,
                gender,
                role
            });
        }

        await user.save();
        res.status(200).json({ success: true, message: 'User successfully created' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error, Try again' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = null;
        const patient = await User.findOne({ email, password });
        const doctor = await Doctor.findOne({ email, password });
        if (patient) {
            user = patient;
        }
        if (doctor) {
            user = doctor;
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        const { password, ...rest } = user._doc;
        res.status(200).json({ status: true, token, user: rest });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to login" });
    }
};
