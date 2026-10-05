# Workshop 03 - Express.js Web Server

This project demonstrates an Express.js web server with routing and middleware capabilities.

## Features

✅ **Task 1**: Express application instance created  
✅ **Task 2**: Static files served using `express.static()` middleware  
✅ **Task 3**: Route handlers for HTML pages (index, about, contact)  
✅ **Task 4**: `/api/time` JSON endpoint returning current date/time  
✅ **Task 5**: Custom error handling middleware (404 and 500)  
✅ **Task 6** (Bonus): Routes organized using Express Router  

## Project Structure

```
starter/
├── server.js                 # Main Express server file
├── package.json             # Project configuration with dependencies
├── public/                  # Public directory for static files
│   ├── index.html          # Home page
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   ├── 404.html            # Custom 404 page
│   ├── 500.html            # Custom 500 page
│   └── styles/
│       └── style.css       # Stylesheet
└── .gitignore              # Git ignore file
```

## Installation

First, install the required dependencies:

```bash
npm install
```

This will install:
- **express**: Web framework for Node.js
- **nodemon**: (dev dependency) Auto-restart server on file changes

## Running the Server

**Production mode:**
```bash
npm start
```

**Development mode (with auto-restart):**
```bash
npm run dev
```

Or directly:
```bash
node server.js
```

The server will start on `http://localhost:3000`

## Available Routes

- `GET /` → Home page (index.html)
- `GET /about` → About page (about.html)
- `GET /contact` → Contact page (contact.html)
- `GET /styles/style.css` → CSS stylesheet (served automatically via static middleware)
- `GET /api/time` → Current date/time in JSON format
- Any unknown path → 404 error page

## Testing the Server

Once the server is running, you can test it:

1. **Open in browser**: Navigate to `http://localhost:3000`
2. **Test pages**: 
   - Home: `http://localhost:3000/`
   - About: `http://localhost:3000/about`
   - Contact: `http://localhost:3000/contact`
3. **Test API endpoint**: Visit `http://localhost:3000/api/time` or use curl:
   ```bash
   curl http://localhost:3000/api/time
   ```
4. **Test 404 handling**: Visit any non-existent route like `http://localhost:3000/unknown`

## Implementation Details

### Express Middleware Stack
```javascript
1. express.static('public')     // Serve static files
2. Custom logging middleware     // (Optional) Log requests
3. Route handlers               // Handle specific routes
4. 404 handler                  // Catch unmatched routes
5. Error handler                // Catch errors
```

### Key Express Features Used

**Static File Serving:**
```javascript
app.use(express.static('public'));
```
Automatically serves all files from the `public` directory.

**Route Handlers:**
```javascript
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
```

**JSON API:**
```javascript
app.get('/api/time', (req, res) => {
    res.json({ datetime: new Date().toISOString() });
});
```

**Error Handling:**
```javascript
// 404 Handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// 500 Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});
```

## Comparison with Workshop 02 (Node.js HTTP)

| Feature | Workshop 02 (HTTP) | Workshop 03 (Express) |
|---------|-------------------|----------------------|
| Lines of code | ~180 lines | ~80 lines |
| Static files | Manual `fs.readFile()` | `express.static()` |
| Routing | if-else chains | `app.get()` methods |
| JSON response | Manual JSON.stringify | `res.json()` |
| Error handling | Custom functions | Middleware |

**Express makes everything simpler! 🎉**

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
  - Built-in middleware (`express.static`)
  - Routing methods (`app.get`, `app.use`)
  - Response methods (`res.sendFile`, `res.json`)
- **Path module** - For working with file paths

## API Response Example

**GET /api/time**
```json
{
  "datetime": "2026-01-28T13:00:00.000Z",
  "timestamp": 1738065600000
}
```

## Troubleshooting

**Module not found error:**
```
Error: Cannot find module 'express'
```
Solution: Run `npm install`

**Port already in use:**
```
Error: listen EADDRINUSE: address already in use :::3000
```
Solution: Stop other processes using port 3000 or change PORT in server.js

**CSS not loading:**
- Verify `express.static('public')` is configured
- Check that middleware is placed before route handlers
- Ensure CSS file path in HTML is correct: `/styles/style.css`

## License
Copyright ©Jari Kovis 2026 Laurea FullStack 2026

ISC