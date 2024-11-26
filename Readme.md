# URL Shortener API

A lightweight and efficient API to shorten URLs, redirect users, and track usage statistics. This API is ideal for deployment in production-ready applications.

---

## Features

- Shorten any valid URL to a unique, compact format.
- Redirect users from the shortened URL to the original URL.
- Track usage statistics:
  - Total clicks.
  - Last accessed timestamp.
- Rate Limiting Only 100 requests per minute

---

## Deployed URL

Access the deployed version of this API here: [Deployed](https://dummy-url-shortener.com)

---

## API Documentation (Swagger)

Explore the interactive API documentation via Swagger for detailed information on endpoints, request structures, and response formats.

### **Access the Swagger Documentation**

- **Deployed Version**: [API Docs](https://dummy-url-shortener.com/api-docs)
- **Or go "/api-docs" route either in localhost or deployed URL**
- **For Example: http://localhost:5000/api-docs**

### **How to Access**

- Local: Start the application locally using the setup instructions, and navigate to `/api-docs` on your browser.

This comprehensive Swagger UI allows you to test endpoints interactively and view live examples of request/response data.

## Local Setup

### 1. Prerequisites

- **Node.js** (v16 or later)
- **MongoDB** (Atlas cluster)

### 2. Clone the Repository

```bash
git clone https://github.com/tamal78/url-shortener.git
cd url-shortener
```

### 3. Set Up Environment Variables

```bash
SERVER_URL=http://localhost:5000
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.ap6br.mongodb.net/dev"
PORT=5000
```

### 4. Run the application

```bash
npm run dev
```

## Setup with Docker

### 1. Prerequisites

- **Docker installed locally**

### 2. Clone the Repository

```bash
git clone https://github.com/tamal78/url-shortener.git
cd url-shortener
```

### 3. Set Up Environment Variables

```bash
SERVER_URL=http://localhost:5000
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.ap6br.mongodb.net/dev"
PORT=5000
```

### 4. Build Docker Image

```bash
docker build -t url-shortener .

```

### 5. Run the Docker Container

```bash
docker run -p 5000:5000 --env-file .env url-shortener

```

## Running Tests

The project includes a robust test suite built with **Jest** and **Supertest** to ensure the API works as expected. Follow these steps to run the tests and check the coverage.

---

### 1. Configure MongoDb

```bash
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.ap6br.mongodb.net/dev"
##Use test in place of dev in the mongo url and give user permission to admin in MongoDb Atlas when testing
```

### 2. Run test

```bash
npm run test
```

#### Expected Test Results

```
 PASS  tests/urlRoutes.test.js
  URL Shortener API
    √ POST /shorten - Should shorten a URL (602 ms)
    √ GET /stats/:shortId - Should return URL stats (51 ms)
    √ GET /:shortId - Should redirect to the original URL (92 ms)
    √ GET /stats/:shortId - Should update clicks (43 ms)
    √ GET /stats/:shortId - Should return 404 for non-existent shortId (43 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        2.006 s
Ran all test suites.
```
