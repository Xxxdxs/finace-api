import { SourceAdapter } from '../interfaces/SourceAdapter';

export class SourceRegistry {
  private adapters: Map<string, SourceAdapter> = new Map();

  register(adapter: SourceAdapter) {
    this.adapters.set(adapter.sourceName, adapter);
    console.log(`[Registry] Registered source adapter: ${adapter.sourceName}`);
  }

  get(sourceName: string): SourceAdapter | undefined {
    return this.adapters.get(sourceName);
  }
}
