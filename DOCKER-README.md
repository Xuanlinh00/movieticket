# 🐳 Movie Ticket Booking - Docker Deployment

## 📋 Tổng quan

Dự án Movie Ticket Booking đã được đóng gói hoàn chỉnh trong môi trường container Docker với:

- ✅ **Multi-environment support**: Development, Testing, Production
- ✅ **Multi-stage builds**: Optimized production images
- ✅ **Complete infrastructure**: Database, Cache, Reverse Proxy, Monitoring
- ✅ **Management scripts**: Automated deployment and management
- ✅ **Security hardened**: Non-root users, minimal attack surface
- ✅ **Production ready**: Health checks, monitoring, backups

## 🚀 Quick Start

### 1. Prerequisites
```bash
# Install Docker and Docker Compose
docker --version    # Should be 20.10+
docker-compose --version    # Should be 2.0+
```

### 2. Setup Environment
```bash
# Clone repository
git clone <repository-url>
cd movie-ticket-booking

# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### 3. Choose Your Environment

#### 🔧 Development Environment
```bash
# Start development environment with hot reload
npm run docker:dev

# Access services:
# - Application: http://localhost:5000
# - MongoDB Express: http://localhost:8081 (admin/admin123)
# - Redis Commander: http://localhost:8082
# - MailHog: http://localhost:8025

# Stop development environment
npm run docker:dev:stop
```

#### 🧪 Testing Environment
```bash
# Run all tests in containers
npm run docker:test

# Run specific test types
npm run docker:test:unit
npm run docker:test:integration
npm run docker:test:api

# View test results
open test-results/newman-results.html
```

#### 🚀 Production Environment
```bash
# Set production secrets
export MONGO_ROOT_PASSWORD=your-secure-password
export REDIS_PASSWORD=your-redis-password
export JWT_SECRET=your-jwt-secret

# Start production environment
npm run docker:prod

# Access services:
# - Application: https://localhost (with SSL)
# - Prometheus: http://localhost:9090
# - Grafana: http://localhost:3000 (admin/admin123)
```

## 🏗️ Architecture Overview

### Container Services
```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Environment                        │
├─────────────────┬─────────────────┬─────────────────────────┤
│   Frontend      │    Backend      │    Infrastructure       │
├─────────────────┼─────────────────┼─────────────────────────┤
│ • Nginx Proxy   │ • Node.js App   │ • MongoDB Database      │
│ • SSL Term.     │ • Express API   │ • Redis Cache           │
│ • Load Balance  │ • File Uploads  │ • Prometheus Monitor    │
│ • Static Files  │ • Health Check  │ • Grafana Dashboard     │
└─────────────────┴─────────────────┴─────────────────────────┘
```

### Network Architecture
```
Internet → Nginx (80/443) → App (5000) → MongoDB (27017)
                                      → Redis (6379)
                                      → Prometheus (9090)
                                      → Grafana (3000)
```

## 📊 Service Details

### Application Container
- **Base Image**: node:18-alpine
- **Size**: ~200MB (production)
- **Features**: Multi-stage build, non-root user, health checks
- **Ports**: 5000 (HTTP), 9229 (Debug)

### Database Container
- **Image**: mongo:7.0
- **Features**: Automatic initialization, authentication, backups
- **Volumes**: Persistent data storage
- **Port**: 27017

### Cache Container
- **Image**: redis:7-alpine
- **Features**: Password protection, persistence, configuration
- **Volume**: Data persistence
- **Port**: 6379

### Reverse Proxy
- **Image**: nginx:alpine
- **Features**: SSL termination, load balancing, rate limiting
- **Ports**: 80 (HTTP), 443 (HTTPS)

## 🛠️ Management Commands

### Development Commands
```bash
npm run docker:dev              # Start development environment
npm run docker:dev:stop         # Stop development environment
npm run docker:dev:restart      # Restart development environment
npm run docker:dev:logs         # View development logs
npm run docker:dev:cleanup      # Clean up development environment

# Or use scripts directly:
./scripts/docker-dev.sh start
./scripts/docker-dev.sh exec bash    # Enter container shell
./scripts/docker-dev.sh reset-db     # Reset development database
```

### Production Commands
```bash
npm run docker:prod             # Start production environment
npm run docker:prod:stop        # Stop production environment
npm run docker:prod:restart     # Restart production environment
npm run docker:prod:logs        # View production logs
npm run docker:prod:backup      # Backup production database

# Or use scripts directly:
./scripts/docker-prod.sh start
./scripts/docker-prod.sh health      # Health check all services
./scripts/docker-prod.sh scale app 3 # Scale application to 3 replicas
./scripts/docker-prod.sh update      # Update application
```

### Testing Commands
```bash
npm run docker:test             # Run all tests
npm run docker:test:unit        # Run unit tests only
npm run docker:test:integration # Run integration tests only
npm run docker:test:api         # Run API tests only
npm run docker:test:cleanup     # Clean up test environment

# Or use scripts directly:
./scripts/docker-test.sh all
./scripts/docker-test.sh results     # View test results
```

## 🔧 Configuration

### Environment Variables (.env)
```bash
# Application
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key

# Database
MONGODB_URI=mongodb://admin:password@mongodb:27017/movietickets
MONGO_ROOT_PASSWORD=your-secure-password

# Cache
REDIS_URL=redis://:password@redis:6379
REDIS_PASSWORD=your-redis-password

# Monitoring
GRAFANA_PASSWORD=your-grafana-password
```

### Docker Compose Files
- **docker-compose.yml**: Production environment
- **docker-compose.dev.yml**: Development environment
- **docker-compose.test.yml**: Testing environment

### Dockerfiles
- **Dockerfile**: Production multi-stage build
- **Dockerfile.dev**: Development with hot reload

## 📈 Monitoring & Health Checks

### Health Check Endpoints
```bash
# Application health
curl http://localhost:5000/api/movies

# Database health
curl http://localhost:5000/api/health/db

# Cache health
curl http://localhost:5000/api/health/redis

# Overall system health
curl http://localhost:5000/api/health
```

### Monitoring Stack
- **Prometheus**: Metrics collection (http://localhost:9090)
- **Grafana**: Visualization dashboards (http://localhost:3000)
- **Application logs**: Centralized logging
- **Health checks**: Automated service monitoring

### Key Metrics
- Response time (P95 < 2s)
- Error rate (< 1%)
- CPU usage (< 70%)
- Memory usage (< 80%)
- Database connections
- Cache hit rate

## 🔐 Security Features

### Container Security
- ✅ Non-root user execution
- ✅ Minimal Alpine base images
- ✅ Security updates automated
- ✅ Read-only root filesystem
- ✅ No unnecessary packages

### Network Security
- ✅ Custom bridge networks
- ✅ Service isolation
- ✅ SSL/TLS termination
- ✅ Rate limiting
- ✅ Security headers

### Data Security
- ✅ Database authentication
- ✅ Redis password protection
- ✅ Encrypted secrets
- ✅ Volume encryption
- ✅ Backup encryption

## 📦 Data Management

### Persistent Volumes
```bash
# Production volumes
mongodb_prod_data     # Database data
redis_prod_data       # Cache data
prod_uploads          # User uploads
prod_logs            # Application logs
prometheus_data      # Metrics data
grafana_data         # Dashboard data
```

### Backup & Restore
```bash
# Create backup
npm run docker:prod:backup

# Restore from backup
./scripts/docker-prod.sh restore-db backup-file.tar.gz

# Manual volume backup
docker run --rm -v mongodb_prod_data:/data -v $(pwd)/backups:/backup alpine tar czf /backup/mongodb-$(date +%Y%m%d).tar.gz /data
```

## 🚀 Deployment Strategies

### Local Development
1. Clone repository
2. Copy `.env.example` to `.env`
3. Run `npm run docker:dev`
4. Access http://localhost:5000

### Staging Deployment
1. Set staging environment variables
2. Run `npm run docker:prod`
3. Run smoke tests
4. Verify functionality

### Production Deployment
1. Set production secrets
2. Configure SSL certificates
3. Run `npm run docker:prod`
4. Monitor health checks
5. Set up automated backups

## 🔧 Troubleshooting

### Common Issues

#### Container Won't Start
```bash
# Check logs
docker-compose logs service-name

# Check container status
docker-compose ps

# Restart specific service
docker-compose restart service-name
```

#### Database Connection Failed
```bash
# Check MongoDB logs
docker-compose logs mongodb-prod

# Test connection
docker exec app-prod curl mongodb-prod:27017

# Reset database
./scripts/docker-dev.sh reset-db
```

#### Performance Issues
```bash
# Check resource usage
docker stats

# Scale application
./scripts/docker-prod.sh scale app-prod 3

# Check health
./scripts/docker-prod.sh health
```

### Debug Commands
```bash
# Enter application container
docker exec -it movie-ticket-booking-app-prod /bin/sh

# View environment variables
docker exec app-prod env

# Check network connectivity
docker exec app-prod ping mongodb-prod

# View application logs
docker-compose logs -f app-prod
```

## 📋 Best Practices

### Development
- ✅ Use volume mounts for hot reload
- ✅ Keep development data separate
- ✅ Use debug-friendly configurations
- ✅ Enable verbose logging

### Production
- ✅ Use specific image tags
- ✅ Implement health checks
- ✅ Set resource limits
- ✅ Enable monitoring
- ✅ Use secrets management
- ✅ Implement backup strategy

### Security
- ✅ Run as non-root user
- ✅ Use minimal base images
- ✅ Keep images updated
- ✅ Scan for vulnerabilities
- ✅ Use network policies
- ✅ Encrypt sensitive data

## 🎯 Performance Optimization

### Image Optimization
- Multi-stage builds reduce image size by 70%
- Layer caching speeds up builds
- Alpine base images minimize attack surface
- Dependency optimization reduces startup time

### Runtime Optimization
- Resource limits prevent resource exhaustion
- Health checks enable automatic recovery
- Connection pooling improves database performance
- Redis caching reduces database load

### Scaling
- Horizontal scaling with Docker Compose
- Load balancing with Nginx
- Database read replicas for high load
- CDN integration for static assets

## 📞 Support

### Documentation
- **Docker Guide**: `docs/DOCKER-GUIDE.md`
- **API Documentation**: `docs/API.md`
- **Deployment Guide**: `docs/DEPLOYMENT.md`

### Getting Help
- Check logs: `docker-compose logs`
- Health check: `./scripts/docker-prod.sh health`
- Reset environment: `./scripts/docker-dev.sh cleanup`

---

**🐳 Happy Containerizing! 🎬🎫**
