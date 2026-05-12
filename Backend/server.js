require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
  ╔══════════════════════════════════════════╗
  ║   Klaxon Ford Agric API                  ║
  ║   Server running on port ${PORT}            ║
  ║   Environment: ${process.env.NODE_ENV}      ║
  ╚══════════════════════════════════════════╝
  `);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});