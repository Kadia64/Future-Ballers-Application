# Deployment Guide for FBA Application

## Environment Variables in Production

### For Cloudways Deployment

Since Cloudways primarily supports PHP applications natively, you'll likely be using one of these approaches for your Next.js app:

## Option 1: Using Cloudways with Node.js (Via SSH)

If you're manually deploying Node.js on Cloudways:

1. **SSH into your Cloudways server**
2. **Create a `.env.local` file in your application directory:**
```bash
cd /home/your-app-directory
nano .env.local
```

3. **Add your environment variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://aiywamauidfqsotopbqq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-key-here
```

4. **Set up PM2 environment variables (if using PM2):**
Create an `ecosystem.config.js` file:
```javascript
module.exports = {
  apps: [{
    name: 'fba-app',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: 'https://aiywamauidfqsotopbqq.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'your-key-here'
    }
  }]
}
```

## Option 2: Static Export Deployment (Recommended for Cloudways)

Since Cloudways is optimized for PHP/static sites, you might want to use Next.js static export:

1. **Build your app locally or in CI/CD:**
```bash
# Set environment variables during build
NEXT_PUBLIC_SUPABASE_URL=https://aiywamauidfqsotopbqq.supabase.co \
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here \
npm run build
```

2. **For static export (if using):**
```bash
npm run build:static
```

3. **Upload the `out` directory to Cloudways**

## Option 3: Using Vercel/Netlify (Easier Alternative)

If Cloudways becomes complex for Next.js, consider these alternatives:

### Vercel (Recommended for Next.js):
1. Connect your GitHub repo to Vercel
2. In Vercel Dashboard → Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy automatically on push

### Netlify:
1. Connect GitHub repo
2. Site Settings → Environment Variables
3. Add the same variables
4. Deploy

## Important Security Notes

### What's Safe to Expose:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - This is meant to be public
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - This is a public anonymous key with RLS

### What to Keep Secret (if you add these later):
- ❌ `SUPABASE_SERVICE_KEY` - Never expose this
- ❌ Database passwords
- ❌ Admin keys

## Cloudways Specific Setup

### If using Cloudways Application Management:

1. **Access your Cloudways Platform**
2. **Go to Application → Application Settings**
3. **Look for Environment Variables section** (if available)
4. **Add your variables there**

### Manual Setup via SSH:

```bash
# 1. SSH into your server
ssh username@your-server-ip

# 2. Navigate to application directory
cd /home/cloudways/your-app

# 3. Create production env file
nano .env.local

# 4. Add your variables (paste these):
NEXT_PUBLIC_SUPABASE_URL=https://aiywamauidfqsotopbqq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here

# 5. Save and exit (Ctrl+X, Y, Enter)

# 6. Build your application
npm run build

# 7. Start your application
npm start
# OR with PM2
pm2 start npm --name "fba-app" -- start
```

## GitHub Actions Deployment (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudways

on:
  push:
    branches: [main, staging]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
        run: npm run build
        
      - name: Deploy to Cloudways
        run: |
          # Add your deployment script here
          # This could be rsync, scp, or Cloudways API
```

Then add secrets in GitHub:
1. Go to your repo → Settings → Secrets
2. Add `NEXT_PUBLIC_SUPABASE_URL`
3. Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Testing Production Environment Locally

Before deploying, test with production environment:

```bash
# Create .env.production.local (for testing only)
cp .env.local .env.production.local

# Build with production settings
npm run build

# Test production build
npm start
```

## Post-Deployment Checklist

- [ ] Environment variables are set on server
- [ ] Application builds successfully
- [ ] Registration form submits to Supabase
- [ ] Payment redirects work
- [ ] All pages load correctly
- [ ] Mobile responsive design works
- [ ] Test registration flow end-to-end

## Troubleshooting

### "Supabase not configured" error in production:
- Verify environment variables are set
- Check if variables are available during build time
- Rebuild application after setting variables

### Forms not submitting:
- Check browser console for errors
- Verify Supabase URL is correct
- Check if RLS policies allow inserts

### Static export issues:
- API routes don't work with static export
- Consider using client-side submission directly to Supabase
- Or use a different hosting solution that supports API routes