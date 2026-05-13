# Discover Evav

Discover Evav is a modern web application built with **Next.js**, orchestrated via **Docker Compose**, and designed with a robust and scalable infrastructure. 

The application uses **PostgreSQL** for the database, **MinIO** for S3-compatible object storage, **Nginx** as a reverse proxy, and is securely exposed to the internet using a **Cloudflare Zero Trust Tunnel**.

## 🏗️ Architecture & Tech Stack

- **Frontend/Backend:** Next.js 16 (React 19, Tailwind CSS v4)
- **Database:** PostgreSQL 15
- **Object Storage:** MinIO
- **Reverse Proxy:** Nginx (Alpine)
- **Tunnel/Security:** Cloudflare Tunnel (`cloudflared`)
- **Containerization:** Docker & Docker Compose

## 📂 Project Structure

```
.
├── .env                 # Environment variables (required for Docker Compose)
├── docker-compose.yml   # Docker Compose orchestration configuration
├── nginx/               # Nginx reverse proxy configurations
│   └── default.conf
└── web/                 # Next.js application source code
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- A Cloudflare Tunnel token (if you plan to run the `cloudflared` service)

### 1. Environment Configuration

Ensure you have a `.env` file at the root of the project. It should contain the necessary variables for PostgreSQL, MinIO, and Cloudflare. Here is an example of what it should include:

```env
# PostgreSQL
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name

# MinIO
MINIO_ROOT_USER=your_minio_user
MINIO_ROOT_PASSWORD=your_minio_password

# Cloudflare Tunnel
CLOUDFLARE_TUNNEL_TOKEN=your_tunnel_token
```

### 2. Running the Application

You can start the entire infrastructure (Next.js, PostgreSQL, MinIO, Nginx, and Cloudflare Tunnel) using Docker Compose:

```bash
docker-compose up -d
```

### 3. Accessing Services locally

If running locally and exposing ports directly:
- **Next.js App:** `http://localhost:81` (via Nginx proxy on port 81)
- **MinIO Console:** `http://localhost:9001` (accessible if you expose port 9001 in `docker-compose.yml`)

*(Note: Port bindings may differ based on your specific docker-compose overrides or cloud configurations.)*

## 🛠️ Development

To work on the Next.js application locally without Docker:

1. Navigate to the `web/` directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📝 License

This project is proprietary and confidential.
