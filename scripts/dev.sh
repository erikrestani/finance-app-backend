#!/bin/bash

echo "🚀 Starting Finance App Development Environment..."

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up --build -d

# Wait for container to be ready
echo "⏳ Waiting for container to be ready..."
sleep 5

# Run Prisma migrations
echo "🗄️ Running Prisma migrations..."
docker-compose exec backend npx prisma db push

# Generate Prisma client
echo "🔧 Generating Prisma client..."
docker-compose exec backend npx prisma generate

echo "✅ Development environment is ready!"
echo ""
echo "📊 Services:"
echo "  - Backend API: http://localhost:3000"
echo "  - Database: SQLite file (dev.db)"
echo ""
echo "📝 Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Restart backend: docker-compose restart backend"
echo "  - Open Prisma Studio: docker-compose exec backend npx prisma studio" 