// Test script to verify investor API endpoints
// Run this from the root directory: node testInvestorAPI.js

const baseURL = 'http://localhost:5000/api/v1/investments';

async function testInvestorEndpoints() {
    console.log('Testing Investor API Endpoints...\n');
    
    try {
        // Test 1: List all investors
        console.log('1. Testing list all investors endpoint...');
        const listResponse = await fetch(`${baseURL}/test/list`);
        const listData = await listResponse.json();
        console.log('Response status:', listResponse.status);
        console.log('Total investors:', listData.totalCount);
        
        if (listData.investors && listData.investors.length > 0) {
            console.log('\nAvailable investors:');
            listData.investors.forEach((inv, index) => {
                console.log(`\n${index + 1}. ${inv.userName || inv.organisationName || 'N/A'}`);
                console.log(`   Investor ID: ${inv._id}`);
                console.log(`   User ID: ${inv.userId}`);
                console.log(`   Type: ${inv.investorType}`);
            });
            
            // Test 2: Get details of first investor
            const firstInvestor = listData.investors[0];
            if (firstInvestor) {
                console.log('\n\n2. Testing get investor details endpoint...');
                console.log(`   Using User ID: ${firstInvestor.userId}`);
                
                const detailsResponse = await fetch(`${baseURL}/investors/${firstInvestor.userId}/details`);
                const detailsData = await detailsResponse.json();
                console.log('Response status:', detailsResponse.status);
                
                if (detailsResponse.ok) {
                    console.log('\nInvestor Details Retrieved:');
                    console.log('Personal Info:', detailsData.personalInformation?.fullName || 'N/A');
                    console.log('Investor Type:', detailsData.personalInformation?.investorType || 'N/A');
                    console.log('Email:', detailsData.personalInformation?.email || 'N/A');
                    console.log('Has Banking Info:', !!detailsData.bankingInformation?.bankName);
                    console.log('Has Documents:', Object.keys(detailsData.documents || {}).length > 0);
                } else {
                    console.log('Error:', detailsData.message);
                }
            }
        } else {
            console.log('\nNo investors found in the database.');
            console.log('Please create an investor account first.');
        }
        
        // Test 3: Test with the problematic ID
        console.log('\n\n3. Testing with the problematic ID...');
        const problematicId = '68769e6251d873c6ba36cb2f';
        console.log(`   Testing ID: ${problematicId}`);
        
        const findResponse = await fetch(`${baseURL}/test/find/${problematicId}`);
        const findData = await findResponse.json();
        console.log('Response status:', findResponse.status);
        console.log('Result:', findData.message);
        
        if (findData.investor) {
            console.log('Found investor:', findData.investor.userName || findData.investor.organisationName || 'N/A');
        }
        
    } catch (error) {
        console.error('\nError testing endpoints:', error.message);
        console.log('\nMake sure:');
        console.log('1. Backend server is running on port 5000');
        console.log('2. MongoDB is connected');
        console.log('3. No authentication errors are blocking the requests');
    }
}

// Run the tests
testInvestorEndpoints();
