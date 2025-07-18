import mongoose from 'mongoose';
import { Investor } from '../models/investorPersonal.Model.js';
import { InvestorBankInfo } from '../models/investorBankingInformation.js';
import { User } from '../models/user.Model.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

async function testInvestorSearch() {
    try {
        // Connect to MongoDB
        await mongoose.connect(
            process.env.MONGODB_URI || 'mongodb://localhost:27017/ayush-portal'
        );
        console.log('Connected to MongoDB');

        const testId = '68769e6251d873c6ba36cb2f';

        // Test 1: Search by _id
        console.log('\n=== Test 1: Search by _id ===');
        const investorById = await Investor.findById(testId);
        console.log('Found by _id:', !!investorById);

        // Test 2: Search by userId
        console.log('\n=== Test 2: Search by userId ===');
        const investorByUserId = await Investor.findOne({ userId: testId });
        console.log('Found by userId:', !!investorByUserId);

        // Test 3: List all investors
        console.log('\n=== Test 3: List all investors ===');
        const allInvestors = await Investor.find().limit(5);
        console.log('Total investors found:', allInvestors.length);

        if (allInvestors.length > 0) {
            console.log('\nSample investor data:');
            allInvestors.forEach((investor, index) => {
                console.log(`\nInvestor ${index + 1}:`);
                console.log('  _id:', investor._id.toString());
                console.log('  userId:', investor.userId?.toString());
                console.log('  investorType:', investor.investorType);
                console.log(
                    '  organisationName:',
                    investor.organisationName || 'N/A'
                );
            });
        }

        // Test 4: Check if testId exists as a User
        console.log('\n=== Test 4: Check if ID exists as User ===');
        const user = await User.findById(testId);
        console.log('Found as User:', !!user);

        if (user) {
            // Find investor by this user
            const investorByUser = await Investor.findOne({ userId: user._id });
            console.log('Found investor for this user:', !!investorByUser);
            if (investorByUser) {
                console.log('Investor _id:', investorByUser._id.toString());
            }
        }

        // Test 5: Check collection names
        console.log('\n=== Test 5: Collection Info ===');
        const collections = await mongoose.connection.db
            .listCollections()
            .toArray();
        const investorCollections = collections.filter((col) =>
            col.name.toLowerCase().includes('investor')
        );
        console.log('Investor-related collections:');
        investorCollections.forEach((col) => {
            console.log('  -', col.name);
        });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

// Run the test
testInvestorSearch();
