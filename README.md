# TrackEx - Expense Tracker

TrackEx is a full-stack expense tracking web application built with **Next.js, Node.js, Express.js, and MongoDB**. It allows users to securely manage expenses and view spending summaries through a responsive dashboard.

## Live Demo

**Frontend:** https://trackex-pro.vercel.app

## Features

* JWT authentication
* Create, update, and delete expenses
* Search and filter expenses
* Sort and paginate expenses
* Dashboard with expense summaries
* Monthly expense analysis
* Responsive UI
* Loading skeletons
* User-specific expense management

## Tech Stack

**Frontend:** Next.js, React, Tailwind CSS, shadcn/ui, Axios

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

## Architecture

```text id="f7n5b1"
Next.js
   ↓
Axios
   ↓
Express.js API
   ↓
JWT Middleware
   ↓
Services / Controllers
   ↓
MongoDB
```

## Getting Started

```bash id="h8q2w4"
git clone https://github.com/Samuel-joseph05/trackEx-pro-frontend.git
git clone https://github.com/Samuel-joseph05/trackEx-pro-backend.git
```

Install dependencies in both projects:

```bash id="n1l3q7"
npm install
```

Configure the required environment variables and run:

```bash id="c2p8x6"
npm run dev
```

## Project Highlights

* Protected API routes with JWT authentication
* User-based expense ownership
* MongoDB pagination, filtering, and sorting
* Debounced expense search
* Responsive dashboard UI

## Author

**Samuel Joseph**

GitHub: https://github.com/Samuel-joseph05
