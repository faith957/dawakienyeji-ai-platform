# 🚀 Deploying DawaKienyeji to Google Cloud Platform (GCP)

DawaKienyeji is fully prepared, containerized, and configured for enterprise-grade deployment on **Google Cloud Run** using the provided `Dockerfile`. 

Cloud Run is a fully managed serverless platform that automatically scales containerized applications from zero to infinity, without server management or cold-start headaches.

---

## 🛠️ Step 1: Install & Set Up Google Cloud SDK
If you haven't already, install the **Google Cloud CLI** on your local machine:
1. Download and install [GCP CLI](https://cloud.google.com/sdk/docs/install).
2. Authenticate with your Google account:
   ```bash
   gcloud auth login
   ```
3. Establish your target project ID (replace `YOUR_PROJECT_ID` with your real GCP project ID):
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

---

## 🏗️ Step 2: Enable Mandatory APIs
Run the following terminal command to enable the core GCP APIs needed to build containers and run serverless instances:
```bash
gcloud services enable \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  run.googleapis.com
```

---

## 📦 Step 3: Create a Google Artifact Registry
Create a secure Docker registry within Google Artifact Registry to house your compiled app images (e.g., in `europe-west3` or your premium region):
```bash
gcloud artifacts repositories create dawakienyeji-repo \
  --repository-format=docker \
  --location=europe-west3 \
  --description="DawaKienyeji Production Container Registry"
```

---

## 🚀 Step 4: Build & Deploy via Google Cloud Build

You can compile, build, and deploy your code directly with one unified gcloud command. Run the following command at the root of your project:

```bash
gcloud run deploy dawakienyeji-service \
  --source . \
  --region europe-west3 \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars="NODE_ENV=production" \
  --set-env-vars="GEMINI_API_KEY=your_gemini_api_key_here"
```

> 🔒 **Security Best Practice (Recommended):** Instead of putting your database secrets and `GEMINI_API_KEY` directly in cleartext in the `--set-env-vars` command, you can reference **Google Secret Manager** secrets directly inside Cloud Run config setup.

---

## 📡 Step 5: Setting Port Mapping & Dynamic Auto-scaling
Cloud Run matches custom container ports automatically. DawaKienyeji's production server is programmed to naturally listen to whichever `$PORT` environment variable GCP passes to it, falling back back to port `3000` locally. 

If you want custom resources or concurrency optimizations:
- **Min Instances:** Set `--min-instances 0` to enable **scale-to-zero** (cost-saving mode, completely free when not accessed).
- **CPU Allocations:** Cloud Run allocates CPU dynamically during HTTP request handling, keeping running costs highly affordable.

---

## 🌐 Next Steps: Custom Domains
Once deployed, Cloud Run registers a default secure URL like `https://dawakienyeji-service-xxxxx.a.run.app`. 
1. Navigate to the Cloud Run panel in your **GCP Console**.
2. Click **Manage Custom Domains**.
3. Map your own domain (e.g., `dawakienyeji.org` or `dawabot.com`) with automated SSL certification.
