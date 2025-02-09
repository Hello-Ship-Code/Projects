# Short Hand URL

## 🚀 Overview

Short-Hand-URL is a URL shortening service built with **Node.js**, **Express**, and **MongoDB**. It allows users to shorten URLs, track visits, and analyze usage.

## 🛠 Features

- ✨ Generate short URLs
- 🔄 Redirect short URLs to original links
- 📊 Track visit history
- ⚡ Fast and efficient API

## 📂 Project Structure

```
short-hand-url/
│-- src/
│   ├── controllers/
│   │   ├── user.js
│   ├── models/
│   │   ├── user.js
│   ├── routes/
│   │   ├── router.js
│   ├── views/
│   │   ├── home.ejs
│   ├── env.config.js
│   ├── app.js
│-- dist/ (compiled output)
│-- .env
│-- package.json
│-- README.md
```

## 🏗 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Hello-Ship-Code/Projects.git
   cd short-hand-url
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the environment variables in `.env`:
   ```env
   DATABASE_URL=mongodb://localhost:27017/short-hand-url
   PORT=8000
   NODE_ENV=development
   ```
4. Start the server:
   ```sh
   npm start
   ```

## 🔗 Usage

- **Shorten a URL**: Send a `POST` request to `/url` with `{ "url": "https://example.com" }`.
- **Get all URLs**: Visit `http://localhost:8000/url`
- **Redirect a short URL**: Visit `http://localhost:8000/url/:shortId`
- **Analytics**: Fetch visit count with `GET /url/analytics/:shortId`

## 📜 License

This project is licensed under the MIT License.
