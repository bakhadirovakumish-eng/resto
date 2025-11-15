# 📦 Deployment Guide

## Development Environment

### Prerequisites
- Node.js 14+
- MongoDB 4.4+ (local or Atlas)
- npm 6+

### Local Development Setup
```bash
# 1. Clone the repository
git clone <repository-url>
cd café-management-system

# 2. Run installation script
# Windows
install.bat

# Mac/Linux
bash install.sh

# 3. Configure environment
cd server
cp .env.example .env
# Edit .env with your local settings

# 4. Start MongoDB
mongod

# 5. In two terminals, run:
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm start
```

## Staging Environment

### Deploy to Heroku (Backend)

```bash
# 1. Install Heroku CLI
# Download from https://devcenter.heroku.com/articles/heroku-cli

# 2. Login to Heroku
heroku login

# 3. Create Heroku app
heroku create café-management-api

# 4. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_production_secret
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set STRIPE_SECRET_KEY=your_stripe_key
heroku config:set FRONTEND_URL=https://your-frontend-url.com

# 5. Deploy
git push heroku main

# 6. View logs
heroku logs --tail
```

### Deploy Frontend to Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
cd client
vercel --prod

# 4. Set environment variables
# In Vercel dashboard:
REACT_APP_API_URL=https://café-management-api.herokuapp.com/api
```

### Database Setup (MongoDB Atlas)

```bash
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create cluster
# 3. Add IP whitelist (0.0.0.0 for all, or specific IPs)
# 4. Create database user
# 5. Get connection string
# 6. Update .env with connection string
```

## Production Environment

### Backend Deployment Options

#### Option 1: AWS EC2
```bash
# 1. Launch EC2 instance (Ubuntu 20.04)
# 2. SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
sudo apt-get install -y mongodb-org

# 5. Clone repository
git clone <your-repo>
cd café-management-system/server

# 6. Install dependencies
npm install --production

# 7. Create .env with production variables
cp .env.example .env

# 8. Start with PM2
npm install -g pm2
pm2 start src/index.js --name "café-api"
pm2 startup
pm2 save

# 9. Setup Nginx reverse proxy
sudo apt-get install nginx
# Configure /etc/nginx/sites-available/default
sudo systemctl restart nginx

# 10. Enable HTTPS with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### Option 2: DigitalOcean App Platform
```bash
# 1. Go to https://cloud.digitalocean.com
# 2. Create App
# 3. Connect GitHub repository
# 4. Set environment variables
# 5. Deploy
```

### Frontend Deployment to AWS S3 + CloudFront

```bash
# 1. Build React app
cd client
npm run build

# 2. Create S3 bucket
aws s3 mb s3://café-management-app

# 3. Upload files
aws s3 cp build/ s3://café-management-app --recursive --acl public-read

# 4. Create CloudFront distribution
# In AWS Console:
# - Create distribution
# - Origin: S3 bucket
# - Default root object: index.html
# - Set custom domain

# 5. Setup SSL/TLS certificate
# Request certificate in ACM
# Associate with CloudFront
```

## Performance Optimization

### Database Optimization
```javascript
// Create indexes
db.users.createIndex({ email: 1 })
db.orders.createIndex({ location: 1 })
db.reservations.createIndex({ location: 1, reservationDate: 1 })

// Enable compression
mongod --profile 1
```

### API Optimization
```javascript
// Enable gzip compression
const compression = require('compression');
app.use(compression());

// Implement caching
const redis = require('redis');
const client = redis.createClient();

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

### Frontend Optimization
```bash
# Code splitting
npm install react-router-dom

# Lazy loading
const Menu = React.lazy(() => import('./components/Menu'));

# Image optimization
npm install image-webpack-loader
```

## Monitoring & Logging

### Setup Logging
```bash
# Install Winston
npm install winston

# Configure logging
const logger = require('winston');

logger.info('Server started');
logger.error('Database error');
```

### Setup Monitoring
```bash
# Install Sentry for error tracking
npm install @sentry/node
```

### Server Health Checks
```bash
# Setup health check endpoint
GET /api/health

# Use monitoring service
# Uptime Robot
# New Relic
# DataDog
```

## Backup Strategy

### Database Backups
```bash
# MongoDB Atlas automatic backups
# Configure in settings: Daily, weekly, monthly

# Manual backup
mongodump --uri "mongodb+srv://..." --out ./backup

# Restore
mongorestore ./backup
```

### Code Backups
```bash
# Use GitHub for version control
git push origin main

# Enable GitHub Actions for CI/CD
```

## SSL/TLS Certificates

### Let's Encrypt (Free)
```bash
certbot certonly --standalone -d your-domain.com
# Auto-renew
certbot renew --dry-run
```

### AWS Certificate Manager
```bash
# Request certificate in ACM
# Verify domain
# Attach to ALB/CloudFront
```

## Disaster Recovery

### Backup Plan
1. Daily database backups
2. Weekly code backups
3. Monthly full system backup

### Recovery Procedure
```bash
# 1. Restore database
mongorestore ./backup

# 2. Deploy latest code
git pull origin main
npm install
npm start

# 3. Verify health
curl http://localhost:5000/api/health
```

## Scaling Strategies

### Horizontal Scaling
```bash
# Load Balancer (AWS ALB)
# Multiple EC2 instances behind load balancer
# Auto-scaling groups

# Database replication
# MongoDB replica sets
# Read replicas for analytics
```

### Vertical Scaling
```bash
# Increase server resources
# Increase database resources
# Increase memory/CPU
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables configured
- [ ] JWT secrets strong (32+ characters)
- [ ] Database backups enabled
- [ ] Firewall rules configured
- [ ] DDoS protection enabled
- [ ] Regular security audits
- [ ] Dependency updates
- [ ] Log aggregation enabled
- [ ] Incident response plan

## Cost Estimation

### Monthly Costs (Approximate)
- **EC2 Instance**: $10-30
- **MongoDB Atlas**: $0-57+ (cluster tier)
- **CloudFront**: $0.085/GB
- **S3**: $0.023/GB
- **Domain**: $10-15
- **SSL Certificate**: Free (Let's Encrypt)
- **Total**: $20-100+/month

## Support & Maintenance

- Monitor error logs daily
- Update dependencies monthly
- Security patches immediately
- Database maintenance weekly
- Performance reviews monthly
- Cost optimization quarterly

## Contact & Support

For deployment help:
- Documentation: See README.md
- Issues: GitHub Issues
- Email: support@café-management.com
