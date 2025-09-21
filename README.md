# Boolean Search Engine

A full-stack web application that implements a boolean search engine for retrieving comments from the Digikala dataset. The system supports complex boolean expressions with operators like AND, OR, and NOT for precise comment filtering.

## Technical Stack

### Backend (Node.js)

- **Express.js** - RESTful API server
- **MongoDB** with **Mongoose** - Database and ODM
- **expr-eval** - Mathematical expression parser for boolean operations
- **CORS** - Cross-origin resource sharing
- **ES6 Modules** - Modern JavaScript module system

### Frontend

- **React 18** with **TypeScript**
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool

## Key Features

### Boolean Search Implementation

- **Expression Parsing**: Converts natural language boolean expressions (`"word1" and "word2" or "word3"`) into mathematical expressions
- **Set Operations**: Implements union (+), intersection (-), and complement (not) operations on comment sets
- **Variable Substitution**: Dynamically maps search terms to database query variables

### Database Architecture

- **Inverted Index**: Pre-computed word-to-comment mappings stored in MongoDB
- **Optimized Queries**: Uses `$in` operator for efficient comment retrieval
- **Pagination**: Implements server-side pagination with configurable page sizes

### API Design

- **RESTful Endpoints**: `/api/comments` with query parameters for expression, page, and limit
- **Error Handling**: Comprehensive error responses with success/failure status
- **Response Format**: Standardized JSON responses with metadata

## Project Structure

```
server/
├── app.js                 # Express server configuration
├── controllers/           # Business logic layer
│   └── comments.controller.js
├── models/               # Mongoose schemas
│   ├── comment.model.js
│   └── word.model.js
└── route.js             # API routing

client/
├── src/
│   ├── App.tsx          # Main React component
│   └── compoments/      # Reusable UI components
```

## API Endpoints

- `GET /api/comments` - Retrieve comments based on boolean expression
  - Query Parameters:
    - `expression`: Boolean search expression (e.g., `"good" and "quality"`)
    - `page`: Page number for pagination
    - `limit`: Number of results per page

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   # Backend
   cd server && npm install

   # Frontend
   cd ../client && npm install
   ```

3. Start the application:

   ```bash
   # Backend (from server directory)
   npm run dev

   # Frontend (from client directory)
   npm run dev
   ```

## Technical Highlights

- **Algorithm Design**: Custom boolean expression evaluation engine
- **Database Optimization**: Inverted index for fast text search
- **Scalable Architecture**: Modular backend with separation of concerns
- **Type Safety**: Full TypeScript implementation on frontend
- **Modern Development**: ES6+ features and contemporary tooling

## Performance Considerations

- Pre-computed word mappings reduce query complexity
- Pagination prevents large dataset loading
- Efficient MongoDB queries using indexed fields
- Client-side caching with TanStack Query
