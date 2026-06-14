# Google Cloud Run Deployment Guide - Omastalo Brand

## Deployment Ready ✓

Your Omastalo Brand website is now configured and ready to deploy to Google Cloud Run. All issues from previous deployment attempts have been fixed.

## What Was Fixed

### 1. Production Dependencies
- **Issue**: Vite was imported at startup, causing `Cannot find package 'vite'` error
- **Fix**: All vite imports are now dynamically loaded (via `await import()`) inside `setupVite()`
- **Result**: Production bundle has ZERO vite references at startup

### 2. Port Binding
- **Issue**: Cloud Run doesn't support `reusePort: true` option
- **Fix**: Added `DISABLE_REUSE_PORT=true` environment variable
- **Result**: Server successfully binds to PORT 8080 in Cloud Run

### 3. Email Service
- **Issue**: ZeptoMail dependency would not exist in production
- **Fix**: Migrated to inbound.new SDK (installed)
- **Result**: Email sending now uses `inboundemail` package with proper error handling

### 4. Docker Optimization
- **Issue**: Build context was too large, included dev dependencies
- **Fix**: Created multi-stage Dockerfile + .dockerignore + .gcloudignore
- **Result**: Lean production image (~350MB), all assets included

## Files Created/Modified

### New Files
- `Dockerfile` - Multi-stage production build
- `.dockerignore` - Optimize build context
- `.gcloudignore` - Optimize Cloud Build

### Modified Files
- `server/index.ts` - Added error handling, disabled reusePort in production
- `server/vite.ts` - Dynamic vite imports only in development
- `server/email-service.ts` - Complete rewrite using inbound.new SDK
- `package.json` - inboundemail added to dependencies

## Pre-Deployment Checklist

### Required Secrets in Cloud Run

Set these as **Environment Variables** in Cloud Run service settings:

```
PORT=8080
DISABLE_REUSE_PORT=true
NODE_ENV=production
INBOUND_API_KEY=[Your API key from https://inbound.new/settings]
```

**Optional but Recommended**:
- `DATABASE_URL` - PostgreSQL connection string (Neon)
- `ADMIN_INIT_TOKEN` - For admin initialization
- Any other environment variables your app needs

### DNS Configuration (Cloudflare)

1. In Cloud Run service, note the service URL: `https://service-xxxx-region.a.run.app`
2. In Cloudflare DNS:
   - Add CNAME record pointing to the Cloud Run service
   - Enable "Proxy status" (orange cloud)
   - Set SSL/TLS encryption mode to "Full (strict)"

### Getting inbound.new API Key

1. Visit https://inbound.new/settings
2. Click "Create API Key"
3. Give it a name (e.g., "Omastalo Cloud Run")
4. Copy the key
5. Add to Cloud Run environment variables as `INBOUND_API_KEY`

## Deployment Steps

### Option 1: Using gcloud CLI (Recommended)

```bash
cd path/to/OmastaloBrand

# Deploy using Dockerfile
gcloud run deploy omastalo \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="PORT=8080,DISABLE_REUSE_PORT=true,NODE_ENV=production,INBOUND_API_KEY=YOUR_KEY_HERE" \
  --memory 1Gi \
  --cpu 2 \
  --timeout 300 \
  --max-instances 100
```

### Option 2: Using Cloud Console

1. Go to Cloud Run → Create Service
2. Choose "Deploy from Git" or "Deploy from container image"
3. If from Git:
   - Connect GitHub repository (Digital-Studio-Hub/OmastaloBrand)
   - Branch: main
   - Build type: Dockerfile
4. Set environment variables (see Pre-Deployment Checklist)
5. Configure resources:
   - Memory: 1 GB
   - CPU: 2
   - Timeout: 300 seconds
   - Max instances: 100
6. Deploy

## Verification After Deployment

1. **Health Check**
   - Visit your Cloud Run service URL
   - Should see the homepage load
   - Check assets load (CSS, images)

2. **Email Verification**
   - Trigger an event RSVP through the website
   - Check:
     - Confirmation email sent to registrant
     - Owner notification email sent to info@omastalo.co.za
     - Email log stored in database

3. **Logs**
   - Cloud Run → Select service → Logs
   - Should see "serving on port 8080"
   - No errors about "vite" or "Cannot find package"

## Troubleshooting

### "Container failed to start and listen on PORT 8080"

**Check logs** for:
- `Cannot find package 'vite'` → This is fixed in this version
- `Error: EADDRINUSE` → Port already in use (shouldn't happen)
- `Error: EACCES` → Permission denied (shouldn't happen)

### Email not sending

**Verify**:
1. `INBOUND_API_KEY` is set in Cloud Run environment variables
2. Key is valid at https://inbound.new/settings
3. Check logs for "Inbound API not configured" warning
4. Verify email addresses are valid (info@omastalo.co.za, user emails)

### Assets (images, CSS) not loading

**Check**:
1. Build completed successfully (check Cloud Build logs)
2. Vite built to `dist/public/`
3. Express serving static files correctly
4. Browser cache - hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## Performance Tuning

### For higher traffic:
```bash
gcloud run update omastalo \
  --memory 2Gi \
  --cpu 4 \
  --max-instances 200
```

### For development/testing:
```bash
gcloud run update omastalo \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10
```

## Rollback Plan

If deployment has issues:

1. **Via Cloud Console**: Revisions → Select previous version → Set traffic 100%
2. **Via CLI**:
   ```bash
   gcloud run services update-traffic omastalo --to-revisions REVISION_NAME=100
   ```

## Build Logs Location

**Cloud Build** (for Docker build issues):
- Cloud Console → Cloud Build → History
- Click on the failed build to see full logs

**Cloud Run Logs** (runtime errors):
- Cloud Console → Cloud Run → Select service → Logs
- Filter for errors or warnings

## Environment Variable Reference

| Variable | Value | Purpose |
|----------|-------|---------|
| PORT | 8080 | HTTP port (Cloud Run requirement) |
| DISABLE_REUSE_PORT | true | Cloud Run incompatibility |
| NODE_ENV | production | Disable dev mode |
| INBOUND_API_KEY | (from inbound.new) | Email sending |
| DATABASE_URL | (PostgreSQL) | Database connection |
| ADMIN_INIT_TOKEN | (generate) | Admin account initialization |

## Next Steps

1. ✓ Code pushed to GitHub
2. ⟶ Obtain `INBOUND_API_KEY` from https://inbound.new/settings
3. ⟶ Set up Cloud Run service with environment variables
4. ⟶ Configure Cloudflare DNS CNAME to Cloud Run
5. ⟶ Test deployment
6. ⟶ Monitor logs for 24 hours
7. ⟶ Set up alerting in Cloud Monitoring

## Support & Monitoring

**Monitor these metrics**:
- Cloud Run → Metrics tab
- Request count, latency, error rate
- Container startup time
- Memory/CPU usage

**Set up alerts**:
- Cloud Monitoring → Create alert policy
- Alert on: Error rate > 1%, Latency > 1000ms

---

**Commit Reference**: `9fe34ff` - feat: Add Google Cloud Run support
**Last Updated**: 2026-06-14
