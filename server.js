import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/timetable';
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-in-production';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

app.use(helmet());
app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (LOG_LEVEL === 'debug') {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  }
  next();
});

app.get('/', (req, res) => {
  res.json({
    service: 'Timetable Service API',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: DATABASE_URL ? 'configured' : 'not configured'
  });
});

app.get('/api/timetables', (req, res) => {
  res.json({
    timetables: [],
    count: 0,
    message: 'Timetables endpoint working'
  });
});

app.post('/api/timetables', (req, res) => {
  const { title, schedule } = req.body;
  res.status(201).json({
    id: Date.now(),
    title: title || 'New Timetable',
    schedule: schedule || [],
    created: new Date().toISOString(),
    message: 'Timetable created successfully'
  });
});

app.get('/api/timetables/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: parseInt(id),
    title: 'Sample Timetable',
    schedule: [],
    updated: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database: ${DATABASE_URL}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Log Level: ${LOG_LEVEL}`);
  console.log(`Ready to handle requests!`);
});
