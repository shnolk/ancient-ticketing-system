# Event Ticketing App

This is a server-side event ticketing app built using Express and MongoDB. The app allows you to generate new tickets and scan existing tickets to increment their scan count.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/event-ticketing-app.git
   cd event-ticketing-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set environment variables:

   ```
   cp .env.example .env
   ```

   Open `.env` file and update the values of `MONGODB_URI` and `JWT_SECRET` with your MongoDB connection URI and a secret key for JWT token.

4. Start the server:

   ```
   npm start
   ```

   The server should now be running on `http://localhost:3000`.

## API Documentation

### `POST /tickets`

Generates a new ticket.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```

**Response:**

```json
{
  "id": "602be5a95d5c5d1e00e77db5",
  "barcode": "ABC12345"
}
```

### `GET /tickets/:barcode`

Retrieves a ticket's information.

**Response:**

```json
{
  "barcode": "ABC12345",
  "scanCount": 2
}
```

### `PUT /tickets/:barcode`

Scans a ticket and increments its scan count.

**Response:**

```json
{
  "scanCount": 3
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
