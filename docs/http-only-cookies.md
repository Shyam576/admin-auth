# HTTP-Only Cookie Authentication

This document explains the implementation of secure HTTP-only cookie authentication in the NestJS application.

## Overview

The application now uses HTTP-only cookies for storing JWT access tokens instead of returning them in the response body. This provides better security by:

1. **Preventing XSS attacks** - JavaScript cannot access HTTP-only cookies
2. **Automatic token transmission** - Cookies are automatically sent with requests
3. **Secure by default** - Cookies are configured with secure flags in production

## Configuration

### Environment Variables

Add these environment variables to your `.env` file:

```env
# JWT Configuration (existing)
JWT_PRIVATE_KEY=your_private_key
JWT_PUBLIC_KEY=your_public_key
JWT_EXPIRATION_TIME=3600

# Cookie Configuration (new)
COOKIE_DOMAIN=yourdomain.com  # Only needed in production
```

### Cookie Settings

The cookies are configured with the following security settings:

- **httpOnly**: `true` - Prevents JavaScript access
- **secure**: `true` in production, `false` in development - Requires HTTPS in production
- **sameSite**: `'strict'` in production, `'lax'` in development - Prevents CSRF attacks
- **maxAge**: Set to JWT expiration time in milliseconds
- **domain**: Set in production for cross-subdomain support
- **path**: `'/'` - Available across the entire domain

## API Endpoints

### Login

**POST** `/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "admin"
}
```

The access token is automatically set as an HTTP-only cookie named `access_token`.

### Logout

**POST** `/auth/logout`

**Response:**
```json
{
  "message": "Successfully logged out"
}
```

The access token cookie is automatically cleared.

### Get Current User

**GET** `/auth/me`

**Headers:** No Authorization header needed - token is read from cookies automatically.

**Response:**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "admin"
}
```

## Frontend Integration

### Making Authenticated Requests

Since cookies are automatically sent with requests, you don't need to manually add the Authorization header:

```javascript
// Login
const response = await fetch('/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important for cookies
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

// Subsequent requests automatically include the cookie
const userData = await fetch('/auth/me', {
  credentials: 'include'
});
```

### Logout

```javascript
const response = await fetch('/auth/logout', {
  method: 'POST',
  credentials: 'include'
});
```

## Security Considerations

1. **HTTPS Required**: In production, ensure your application runs over HTTPS
2. **CORS Configuration**: The application is configured with `credentials: true` for CORS
3. **Cookie Domain**: Set the appropriate domain in production for your use case
4. **Token Expiration**: Tokens automatically expire based on the `JWT_EXPIRATION_TIME` setting

## Backward Compatibility

The JWT strategy still supports Bearer tokens in the Authorization header as a fallback for backward compatibility with existing clients.

## Testing

To test the authentication:

1. Start the application
2. Make a POST request to `/auth/login` with valid credentials
3. Check that the `Set-Cookie` header is present in the response
4. Make a GET request to `/auth/me` - it should work without manually setting headers
5. Make a POST request to `/auth/logout` to clear the cookie 