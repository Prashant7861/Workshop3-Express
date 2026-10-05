const express = require('express');
const path = require('path');

// ========================================
// Task 1 - Create Express App
// ========================================
const app = express();

const PORT = process.env.PORT || 3000;

// Absolute path to the static files directory
const PUBLIC_DIR = path.join(__dirname, 'public');

// ========================================
// BONUS: Custom Request Logging Middleware
// ========================================
// Logs every incoming request (method, URL and timestamp)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ========================================
// Task 2 - Serve Static Files
// ========================================
// Serves HTML, CSS, images, etc. from the 'public' directory
app.use(express.static(PUBLIC_DIR));

// ========================================
// Task 3 - Add Route Handlers
// ========================================

// Home page route
app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// About page route
app.get('/about', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'about.html'));
});

// Contact page route
app.get('/contact', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'contact.html'));
});

// ========================================
// Task 4 + BONUS Task 6 - API Endpoints with Express Router
// ========================================
const apiRouter = express.Router();

// GET /api/time -> current date/time as JSON
apiRouter.get('/time', (req, res) => {
    res.json({
        datetime: new Date().toISOString(),
        timestamp: Date.now()
    });
});

// GET /api/info -> server information
apiRouter.get('/info', (req, res) => {
    res.json({
        name: 'Workshop03 Express Server',
        version: '1.0.0',
        nodeVersion: process.version,
        expressVersion: require('express/package.json').version
    });
});

// GET /api/status -> server status
apiRouter.get('/status', (req, res) => {
    res.json({
        status: 'ok',
        uptimeSeconds: Math.round(process.uptime()),
        memoryUsage: process.memoryUsage()
    });
});

// Mount the API router
app.use('/api', apiRouter);

// ========================================
// Task 5 - Error Handling Middleware
// ========================================

// 404 Handler - placed AFTER all other routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'), (err) => {
        if (err) {
            res.status(404).type('text/plain').send('404 - Page Not Found');
        }
    });
});

// 500 Error Handler - placed LAST (4 parameters: err, req, res, next)
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).sendFile(path.join(PUBLIC_DIR, '500.html'), (sendErr) => {
        if (sendErr) {
            res.status(500).type('text/plain').send('500 - Internal Server Error');
        }
    });
});

// ========================================
// Start the Server
// ========================================
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log('\n📍 Available routes:');
    console.log('  GET /              -> Home page');
    console.log('  GET /about         -> About page');
    console.log('  GET /contact       -> Contact page');
    console.log('  GET /api/time      -> Current date/time API');
    console.log('  GET /api/info      -> Server info API');
    console.log('  GET /api/status    -> Server status API');
    console.log('\n⏹️  Press Ctrl+C to stop the server\n');
});
