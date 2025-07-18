# Startup API Documentation

## GET /api/v1/startups

Fetches all startups from the database with support for filtering, pagination, and sorting.

### Authentication
**Not required** - This is a public endpoint.

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `keyword` | string | No | "" | Search term to filter startups by name, description, or industry |
| `page` | integer | No | 1 | Page number for pagination (must be positive) |
| `limit` | integer | No | 10 | Number of items per page (1-100) |
| `status` | string | No | - | Filter by status: 'pending', 'approved', or 'rejected' |
| `industry` | string | No | - | Filter by industry (case-insensitive) |
| `sortBy` | string | No | "createdAt" | Sort field: 'createdAt', 'updatedAt', 'startupName', 'valuation', 'dateOfEstablishment' |
| `sortOrder` | string | No | "desc" | Sort order: 'asc' or 'desc' |

### Example Requests

```bash
# Get all startups (default pagination)
GET /api/v1/startups

# Search for startups with keyword
GET /api/v1/startups?keyword=health

# Get approved startups in healthcare industry
GET /api/v1/startups?status=approved&industry=healthcare

# Get startups with custom pagination
GET /api/v1/startups?page=2&limit=20

# Sort startups by valuation in ascending order
GET /api/v1/startups?sortBy=valuation&sortOrder=asc
```

### Success Response

**Status Code:** 200 OK

```json
{
    "success": true,
    "data": {
        "startups": [
            {
                "id": "64a1b2c3d4e5f6g7h8i9j0k1",
                "name": "HealthTech Solutions",
                "description": "Innovative healthcare technology solutions",
                "businessType": "B2B",
                "industry": "Healthcare",
                "address": "123 Tech Street, Silicon Valley",
                "country": "USA",
                "website": "https://healthtechsolutions.com",
                "valuation": 5000000,
                "dateOfEstablishment": "2023-01-15T00:00:00.000Z",
                "status": "approved",
                "logo": "https://s3.amazonaws.com/bucket/logo.png",
                "owner": {
                    "id": "64a1b2c3d4e5f6g7h8i9j0k2",
                    "name": "John Doe",
                    "email": "john@example.com",
                    "linkedIn": "https://linkedin.com/in/johndoe"
                },
                "createdAt": "2023-07-15T10:30:00.000Z",
                "updatedAt": "2023-07-20T14:45:00.000Z"
            }
        ],
        "pagination": {
            "currentPage": 1,
            "totalPages": 5,
            "totalItems": 47,
            "itemsPerPage": 10,
            "hasNextPage": true,
            "hasPrevPage": false
        }
    },
    "message": "Startups fetched successfully"
}
```

### Error Responses

**Invalid Query Parameters**
- **Status Code:** 400 Bad Request
```json
{
    "success": false,
    "message": "Page must be a positive integer"
}
```

**Server Error**
- **Status Code:** 500 Internal Server Error
```json
{
    "success": false,
    "message": "An error occurred while fetching startups",
    "error": "Error details (only in development mode)"
}
```

### Response Data Structure

#### Startup Object
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier of the startup |
| `name` | string | Name of the startup |
| `description` | string | Brief description of the startup |
| `businessType` | string | Type of business (B2B, B2C, etc.) |
| `industry` | string | Industry sector |
| `address` | string | Physical address |
| `country` | string | Country of operation |
| `website` | string | Company website URL |
| `valuation` | number | Current valuation in currency units |
| `dateOfEstablishment` | string | ISO date string of establishment |
| `status` | string | Current status: 'pending', 'approved', or 'rejected' |
| `logo` | string/null | URL to startup logo or null if not available |
| `owner` | object/null | Owner information object |
| `createdAt` | string | ISO date string of record creation |
| `updatedAt` | string | ISO date string of last update |

#### Owner Object
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier of the owner |
| `name` | string | Owner's full name |
| `email` | string | Owner's email address |
| `linkedIn` | string/null | LinkedIn profile URL or null |

#### Pagination Object
| Field | Type | Description |
|-------|------|-------------|
| `currentPage` | number | Current page number |
| `totalPages` | number | Total number of pages |
| `totalItems` | number | Total number of startups |
| `itemsPerPage` | number | Number of items per page |
| `hasNextPage` | boolean | Whether there's a next page |
| `hasPrevPage` | boolean | Whether there's a previous page |

### Notes for Frontend Integration

1. **Empty Results**: When no startups are found, the API returns a 200 status with an empty startups array and appropriate message.

2. **Pagination**: Always check `hasNextPage` and `hasPrevPage` for implementing pagination controls.

3. **Search**: The keyword search is case-insensitive and searches across startup name, description, and industry fields.

4. **Null Values**: Some fields like `logo` and owner's `linkedIn` may be null if not provided.

5. **Performance**: For better performance with large datasets, use pagination and limit the results per page.

6. **Filtering**: Multiple filters can be combined in a single request for more specific results.
