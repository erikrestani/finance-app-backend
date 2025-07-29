# Finance App Backend - Authentication API

Backend API for user authentication of the Finance App.

## 🚀 Features

- **User Registration** - Account creation with data validation
- **User Login** - Authentication with JWT
- **Current User Verification** - Protected endpoint to get logged user data

## 🛠️ Technologies

- **Node.js** with TypeScript
- **Express.js** for REST API
- **Prisma** as ORM
- **SQLite** as database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Docker** for containerization

## 📁 Project Structure

```
src/
├── controllers/
│   └── auth.controller.ts      # Authentication controller
├── middleware/
│   └── auth.middleware.ts      # JWT authentication middleware
├── routes/
│   └── auth.routes.ts          # Authentication routes
├── services/
│   └── auth.service.ts         # Authentication business logic
├── types/
│   └── index.ts               # TypeScript types
└── index.ts                   # Main server
```

## 🔧 Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-app-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file based on the example:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key-here"
   PORT=3000
   NODE_ENV=development
   ```

4. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## 🚀 Running the Project

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### With Docker
```bash
# Using development script
./scripts/dev.sh

# Or manually
docker-compose up --build
```

## 📡 API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

#### POST `/api/auth/login`
User login.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

#### GET `/api/auth/me`
Get current user data (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Health Check

#### GET `/health`
Check API status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Security

- Passwords are hashed with bcrypt (salt rounds: 12)
- JWT tokens expire in 7 days
- Email and password validation
- Authentication middleware for protected routes
- Security headers with Helmet
- CORS configured

## 🧪 Validations

- **Email**: Valid email format
- **Password**: Minimum 6 characters
- **Name**: Required field
- **JWT Token**: Format and expiration validation

## 📝 Available Scripts

- `npm run dev` - Run in development mode
- `npm run build` - Compile TypeScript
- `npm start` - Run in production
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Sync schema with database
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Prisma Studio

## 🐳 Docker

The project includes complete Docker configuration:

- **Dockerfile** for application containerization
- **docker-compose.yml** for orchestration
- **Development script** to facilitate setup

## 📊 Database

- **SQLite** for development
- **Prisma Schema** with User model
- **Automatic migrations** with `db:push`

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
``` 