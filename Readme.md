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

Access the deployed version of this API here: [Deployed](https://url-shortner-ogym.onrender.com)

---

## API Documentation (Swagger)

Explore the interactive API documentation via Swagger for detailed information on endpoints, request structures, and response formats.

### **Access the Swagger Documentation**

- **Deployed Version**: [API Docs](https://url-shortner-ogym.onrender.com/api-docs)
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
git clone https://github.com/tamal78/url-shortner.git
cd url-shortner
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
git clone https://github.com/tamal78/url-shortner.git
cd url-shortner
```

### 3. Set Up Environment Variables

```bash
SERVER_URL=http://localhost:5000
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.ap6br.mongodb.net/dev"
PORT=5000
```

### 4. Build Docker Image

```bash
docker build -t url-shortner .

```

### 5. Run the Docker Container

```bash
docker run -p 5000:5000 --env-file .env url-shortner

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

## API Endpoints

### **Try the API with Swagger**

For an interactive way to test and explore the API, visit the **Swagger API Documentation** at "/api-docs":
Swagger provides detailed documentation and allows you to directly test the endpoints.

---

### **API Endpoints (Brief)**

Here’s a quick overview of the available API endpoints and their functionality:

#### **1. POST `/shorten`**

- **What It Does**: Shortens a given valid URL into a compact, unique identifier.
- **Use Case**: Generate short URLs for easier sharing and tracking.
- **Example**:
  - **Request**:
    ```json
    {
      "originalUrl": "https://example.com"
    }
    ```
  - **Response**:
    ```json
    {
      "shortUrl": "http://localhost:5000/abc123"
    }
    ```

---

#### **2. GET `/{shortId}`**

- **What It Does**: Redirects the user from the short URL to the original URL. Additionally, it updates the **click count** and records the **last accessed timestamp** for tracking purposes.
- **Use Case**: Navigate to the original URL using its shortened version while keeping track of usage metrics.
- **Example**:
  - **Request**: Visit `http://localhost:5000/abc123`.
  - **Response**: Redirects to `https://example.com`.
  - **Backend Updates**:
    - **Click Count**: Incremented by `1`.
    - **Last Accessed**: Updated to the current timestamp.

---

#### **3. GET `/stats/{shortId}`**

- **What It Does**: Retrieves usage statistics for a given short URL.
- **Use Case**: Monitor the performance of your short URL, including click counts and last access time.
- **Example**:
  - **Request**: `http://localhost:5000/stats/abc123`
  - **Response**:
    ```json
    {
      "originalUrl": "https://example.com",
      "shortId": "abc123",
      "clicks": 10,
      "lastAccessed": "2024-11-26T12:00:00Z"
    }
    ```

---

Explore more at **Swagger API Docs** or test these endpoints directly using tools like Postman.
