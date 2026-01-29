import express from 'express';
import cron from 'node-cron';
import path from 'path';
import { JobService } from './services/JobService';

const app = express();
const port = 3000;
const jobService = new JobService();

// Serve static files (the image)
app.use(express.static(path.join(__dirname, '../public')));

// Manual trigger for testing
app.get('/refresh', async (req, res) => {
  await jobService.run();
  res.send('Refreshed. Check <a href="/dashboard.png">dashboard.png</a>');
});

// Start Cron (Every hour at minute 0)
cron.schedule('0 * * * *', () => {
  jobService.run();
});

// Run once on startup so we have an image immediately
jobService.run();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Image available at http://localhost:${port}/dashboard.png`);
});
