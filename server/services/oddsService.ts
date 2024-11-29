import { TrendingCoin, OddsData } from '../types';

const MIN_ODDS = 1.2;
const MAX_ODDS = 10.0;
const BASELINE_MENTIONS = 100;

export class OddsService {
  private calculateBaseOdds(mentions: number): number {
    // Inverse relationship: more mentions = lower odds
    const baseOdds = (BASELINE_MENTIONS / Math.max(mentions, 1)) * 2;
    
    // Clamp odds between MIN_ODDS and MAX_ODDS
    return Math.min(Math.max(baseOdds, MIN_ODDS), MAX_ODDS);
  }

  private calculatePotentialMultiplier(odds: number): number {
    // Higher odds mean higher potential returns
    return parseFloat((odds * 0.95).toFixed(2)); // 5% house edge
  }

  public calculateOdds(coin: TrendingCoin): OddsData {
    // Use the coin's score as a proxy for mentions
    const normalizedMentions = Math.floor(coin.score * 100);
    const baseOdds = this.calculateBaseOdds(normalizedMentions);
    
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      mentions: normalizedMentions,
      odds: parseFloat(baseOdds.toFixed(2)),
      thumbnail: coin.thumb,
      potentialMultiplier: this.calculatePotentialMultiplier(baseOdds)
    };
  }

  public calculateBatchOdds(coins: TrendingCoin[]): OddsData[] {
    return coins.map(coin => this.calculateOdds(coin));
  }
}

export const oddsService = new OddsService();