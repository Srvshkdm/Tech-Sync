import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1';

// You'll need a valid token from a logged-in user
// Replace this with an actual token after logging in
const AUTH_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';

const testInvestorEndpoints = async () => {
    try {
        console.log('Testing investor endpoints...\n');

        // Test 1: Get all investors
        console.log('1. Testing GET /api/v1/investors');
        const allInvestorsResponse = await axios.get(`${API_BASE_URL}/investors`, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });
        console.log('✓ Success! Found', allInvestorsResponse.data.count, 'investors');
        console.log('First investor:', allInvestorsResponse.data.investors[0]);

        // Test 2: Get investors with pagination
        console.log('\n2. Testing GET /api/v1/investors/paginated');
        const paginatedResponse = await axios.get(`${API_BASE_URL}/investors/paginated?page=1&limit=5`, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });
        console.log('✓ Success! Pagination info:', paginatedResponse.data.pagination);

        // Test 3: Get investors with filters
        console.log('\n3. Testing GET /api/v1/investors/paginated with filters');
        const filteredResponse = await axios.get(`${API_BASE_URL}/investors/paginated?investorType=individual&limit=10`, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });
        console.log('✓ Success! Found', filteredResponse.data.investors.length, 'individual investors');

        // Test 4: Get specific investor (if we have any)
        if (allInvestorsResponse.data.investors.length > 0) {
            const investorId = allInvestorsResponse.data.investors[0]._id;
            console.log('\n4. Testing GET /api/v1/investors/:id');
            const detailsResponse = await axios.get(`${API_BASE_URL}/investors/${investorId}`, {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                },
            });
            console.log('✓ Success! Got investor details:', detailsResponse.data.personalInformation);
        }

    } catch (error) {
        console.error('Error testing endpoints:', error.response?.data || error.message);
    }
};

// Instructions for running this test
console.log(`
To test the investor endpoints:

1. Make sure the backend server is running (npm run dev)
2. Login with a valid user account to get an access token
3. Replace AUTH_TOKEN in this file with your actual token
4. Run this test script: node src/test-investor-endpoints.js

You can get a token by:
- Using the login endpoint: POST /api/v1/users/login
- Or checking the browser's cookies/localStorage after logging in via the frontend
`);

// Uncomment to run the tests
// testInvestorEndpoints();
