
import { JobService } from './services/JobService';

async function main() {
  const jobService = new JobService();
  try {
    await jobService.run();
    console.log('Successfully generated dashboard image.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to generate dashboard image:', error);
    process.exit(1);
  }
}

main();
