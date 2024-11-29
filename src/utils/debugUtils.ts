interface DebugConfig {
  enabled: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
}

class DebugLogger {
  private config: DebugConfig = {
    enabled: process.env.NODE_ENV === 'development',
    logLevel: 'info'
  };

  constructor(config?: Partial<DebugConfig>) {
    this.config = { ...this.config, ...config };
  }

  private shouldLog(level: DebugConfig['logLevel']): boolean {
    const levels = ['error', 'warn', 'info', 'debug'];
    return this.config.enabled && levels.indexOf(level) <= levels.indexOf(this.config.logLevel);
  }

  logGiphyResponse(data: unknown) {
    if (!this.shouldLog('debug')) return;

    console.group('🖼 Giphy API Response');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Data:', data);
    
    if (Array.isArray(data)) {
      console.table(data.map(item => ({
        id: item.id,
        title: item.title?.substring(0, 30) + '...',
        hasImage: Boolean(item.imageUrl),
        hasThumbnail: Boolean(item.thumbnailUrl)
      })));
    }
    
    console.groupEnd();
  }

  logError(error: unknown, context?: string) {
    if (!this.shouldLog('error')) return;

    console.group('❌ Error');
    console.error('Context:', context || 'Unknown context');
    console.error('Error:', error);
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.groupEnd();
  }

  logPerformance(label: string, startTime: number) {
    if (!this.shouldLog('info')) return;

    const duration = performance.now() - startTime;
    console.log(`⚡ Performance [${label}]: ${duration.toFixed(2)}ms`);
  }
}

export const debugLogger = new DebugLogger(); 