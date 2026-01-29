import fs from 'fs';
import path from 'path';
import { indicators } from '../config/indicators';
import { DataAggregator } from './DataAggregator';
import { CanvasRenderer } from './CanvasRenderer';
import { SourceRegistry } from '../sources/SourceRegistry';
import { MockAdapter } from '../sources/MockAdapter';
import { YahooFinanceAdapter } from '../sources/YahooFinanceAdapter';
import { EastMoneyAdapter } from '../sources/EastMoneyAdapter';

export class JobService {
  private registry: SourceRegistry;
  private aggregator: DataAggregator;
  private renderer: CanvasRenderer;
  private publicDir: string;

  constructor() {
    this.registry = new SourceRegistry();
    // Register Adapters
    this.registry.register(new MockAdapter());
    this.registry.register(new YahooFinanceAdapter());
    this.registry.register(new EastMoneyAdapter());

    this.aggregator = new DataAggregator(this.registry);
    this.renderer = new CanvasRenderer();
    this.publicDir = path.join(__dirname, '../../public');
    
    if (!fs.existsSync(this.publicDir)) {
      fs.mkdirSync(this.publicDir, { recursive: true });
    }
  }

  async run() {
    console.log(`[${new Date().toISOString()}] Running update job...`);
    try {
        const data = await this.aggregator.fetchAll(indicators);
        const buffer = await this.renderer.render(data);
        
        // Save as 1-bit PNG
        const outputPath = path.join(this.publicDir, 'dashboard.png');
        fs.writeFileSync(outputPath, buffer);
        console.log(`Dashboard updated successfully at ${outputPath}`);
        
        // Cleanup old JPEG if exists
        const oldJpg = path.join(this.publicDir, 'dashboard.jpg');
        if (fs.existsSync(oldJpg)) {
            fs.unlinkSync(oldJpg);
        }
    } catch (error) {
        console.error('Job failed:', error);
    }
  }
}
