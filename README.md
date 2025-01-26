# WellPulse API

This is the API for my application WellPulse, a platform designed to help users track their habits and find healthy lifestyle locations. The backend is built with Node.js, Express, MongoDB, and Firebase for authentication.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Base64Encoding](#base64-encoding)

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- Firebase Admin SDK (for authentication)
- CORS

## Setup Instructions

1. **Clone the repository**

   ```sh
   git clone https://github.com/annahilla/wellpulse-api
   cd wellpulse-api
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Create a `.env` file** and add the necessary environment variables (see below).

4. **Start the server**
   ```sh
   npm start
   ```
   or for development with auto-restart:
   ```sh
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
FIREBASE_SERVICE_ACCOUNT=serviceAccountKey
```

The `FIREBASE_SERVICE_ACCOUNT` refers to a JSON object stored as an environment variable containing Firebase credentials:

```json
{
  "type": "service_account",
  "project_id": "your_project_id",
  "private_key_id": "your_private_key_id",
  "private_key": "your_private_key",
  "client_email": "your_client_email",
  "client_id": "your_client_id",
  "auth_uri": "your_auth_uri",
  "token_uri": "your_token_uri"
}
```

### Base64 Encoding

Sensitive data, such as Firebase credentials, is encoded as Base64 to ensure safe transmission over networks that may not handle binary data well. This encoded string is stored in the environment variables, where it will be decoded on the backend as needed.

## API Endpoints

### Habits

- `GET /api/habits` - Retrieve all habits
- `POST /api/habits` - Create a new habit
- `PUT /api/habits/:id` - Update a habit
- `DELETE /api/habits/:id` - Delete a habit

### Options

- `GET /api/options/categories` - Retrieve all options for habit categories
- `GET /api/options/frequencies` - Retrieve all options for habit frequencies

### Locations

- `GET /api/locations` - Retrieve locations for healthy habits

## Authentication

This project uses Firebase Authentication. Each request requiring authentication must include a Bearer token in the `Authorization` header:

```sh
Authorization: Bearer <your-firebase-token>
```

## Deployment

The backend is deployed on [Vercel](https://wellpulse-api.vercel.app/).
