# Investor API Documentation

## Base URL
```
/api/v1/investors
```

## Authentication
All investor endpoints require authentication via JWT token. Include the token in the request headers:

```
Authorization: Bearer <token>
```

## Endpoints

### 1. Get All Investors
Fetches a list of all investors in the system.

**Endpoint:** `GET /api/v1/investors`

**Response:**
```json
{
    "success": true,
    "count": 25,
    "investors": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "userId": "507f1f77bcf86cd799439012",
            "name": "John Doe",
            "email": "john@example.com",
            "phoneNumber": "+1234567890",
            "investorType": "individual",
            "organisationName": "",
            "dateOfBirth": "1980-01-01T00:00:00.000Z",
            "address": "123 Main St, City, Country",
            "nationality": "USA",
            "linkedInURL": "https://linkedin.com/in/johndoe",
            "revenue": 1000000,
            "netWorth": 5000000,
            "taxId": "TAX123456",
            "businessLicenseNumber": "",
            "governmentId": {
                "idType": "passport",
                "idValue": "P123456789"
            },
            "isApproved": true,
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
        }
    ]
}
```

### 2. Get Investors with Pagination and Filters
Fetches investors with pagination support and filtering options.

**Endpoint:** `GET /api/v1/investors/paginated`

**Query Parameters:**
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Number of items per page
- `investorType` (optional): Filter by investor type ("individual" or "organization")
- `nationality` (optional): Filter by nationality (case-insensitive)
- `minRevenue` (optional): Minimum revenue filter
- `maxRevenue` (optional): Maximum revenue filter
- `minNetWorth` (optional): Minimum net worth filter
- `maxNetWorth` (optional): Maximum net worth filter
- `search` (optional): Search in name, email, organization name, or address

**Example Request:**
```
GET /api/v1/investors/paginated?page=1&limit=5&investorType=individual&minNetWorth=1000000
```

**Response:**
```json
{
    "success": true,
    "investors": [...],
    "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalItems": 25,
        "itemsPerPage": 5,
        "hasNextPage": true,
        "hasPrevPage": false
    }
}
```

### 3. Get Investor Details by ID
Fetches detailed information about a specific investor, including banking information and documents.

**Endpoint:** `GET /api/v1/investors/:investorId`

**Parameters:**
- `investorId`: The ID of the investor (can be either investor._id or user._id)

**Response:**
```json
{
    "personalInformation": {
        "fullName": "John Doe",
        "investorType": "individual",
        "organizationName": "",
        "phoneNumber": "+1234567890",
        "email": "john@example.com",
        "address": "123 Main St, City, Country",
        "dateOfBirth": "1980-01-01T00:00:00.000Z",
        "nationality": "USA",
        "linkedIn": "https://linkedin.com/in/johndoe"
    },
    "financialInformation": {
        "revenue": 1000000,
        "netWorth": 5000000,
        "businessLicenseNumber": "",
        "taxPayerIdentification": "TAX123456",
        "idType": "passport",
        "idValue": "P123456789"
    },
    "bankingInformation": {
        "bankName": "Example Bank",
        "accountNumber": "1234567890",
        "accountType": "savings",
        "ifscCode": "EXMP0001234",
        "branchName": "Main Branch",
        "swiftCode": "EXMPUS33"
    },
    "documents": {
        "identityProof": {
            "name": "Passport",
            "fileName": "passport_123.pdf",
            "fileUrl": "https://signed-url-to-document",
            "uploadedAt": "2024-01-01T00:00:00.000Z",
            "isApproved": true
        }
    }
}
```

## Error Responses

### 401 Unauthorized
```json
{
    "message": "access token missing"
}
```

### 403 Forbidden
```json
{
    "message": "forged access token"
}
```

### 404 Not Found
```json
{
    "message": "Investor not found",
    "searchedId": "507f1f77bcf86cd799439011"
}
```

### 500 Internal Server Error
```json
{
    "success": false,
    "message": "Error fetching investors",
    "error": "Error details..."
}
```

## Usage Examples

### cURL Example
```bash
# Get all investors
curl -X GET http://localhost:4000/api/v1/investors \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get paginated investors with filters
curl -X GET "http://localhost:4000/api/v1/investors/paginated?page=1&limit=10&investorType=individual" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get specific investor details
curl -X GET http://localhost:4000/api/v1/investors/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### JavaScript/Axios Example
```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:4000/api/v1';
const token = 'YOUR_TOKEN_HERE';

// Get all investors
const getAllInvestors = async () => {
    const response = await axios.get(`${API_BASE}/investors`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Get investors with filters
const getFilteredInvestors = async (filters) => {
    const response = await axios.get(`${API_BASE}/investors/paginated`, {
        params: filters,
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Get investor details
const getInvestorDetails = async (investorId) => {
    const response = await axios.get(`${API_BASE}/investors/${investorId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
```
