import './src/config/envLoader.js';
import mongoose from 'mongoose';
import { User } from './src/models/user.Model.js';
import { Investor } from './src/models/investorPersonal.Model.js';

async function createInvestorProfile() {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log('Connected to MongoDB');

        const userId = '68769e6251d873c6ba36cb2f';

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found with ID:', userId);
            return;
        }

        console.log('Found user:', user.name, '(', user.email, ')');

        // Check if investor profile already exists
        const existingInvestor = await Investor.findOne({ userId: userId });
        if (existingInvestor) {
            console.log(
                'Investor profile already exists with ID:',
                existingInvestor._id
            );
            console.log(
                'You can access it at: /become-investor/' + userId + '/review'
            );
            return;
        }

        // Create a basic investor profile
        console.log('\nNo investor profile found. Creating one...');

        const newInvestor = new Investor({
            userId: userId,
            investorType: 'individual',
            organisationName: '',
            dateOfBirth: new Date('1990-01-01'),
            address: 'Test Address',
            nationality: 'Indian',
            linkedInURL: 'https://linkedin.com/in/test',
            revenue: 1000000,
            netWorth: 5000000,
            taxId: 'TEST123456',
            businessLicenseNumber: '',
            documents: [],
            governmentId: null,
        });

        await newInvestor.save();
        console.log('\n✅ Investor profile created successfully!');
        console.log('Investor ID:', newInvestor._id);
        console.log('User ID:', newInvestor.userId);
        console.log('\nYou can now access the investor details at:');
        console.log('Frontend URL: /become-investor/' + userId + '/review');
        console.log(
            'API URL: /api/v1/investments/investors/' + userId + '/details'
        );
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

// Run the script
createInvestorProfile();
