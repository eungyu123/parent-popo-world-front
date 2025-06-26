export interface StayTimeGraphProps {
  avgStayTime: number;
  avgStayTimeMean: number;
  startedAt: string;
  tagAvgStayTime: number;
  tagAvgStayTimeMean: number;
  userId: string;
}

export interface TradingRatioGraph1Props {
  userId: string;
  highBuyRatio: number;
  lowBuyRatio: number;
  midBuyRatio: number;
  startedAt: string;
  highBuyRatioMean: number;
  midBuyRatioMean: number;
  lowBuyRatioMean: number;
}

export interface TradingRatioGraph2Props {
  userId: string;
  highSellRatio: number;
  midSellRatio: number;
  lowSellRatio: number;
  startedAt: string;
  highSellRatioMean: number;
  midSellRatioMean: number;
  lowSellRatioMean: number;
}

export interface TradingRatioGraph3Props {
  userId: string;
  startedAt: string;
  MyhighRatioMean: number;
  MymidRatioMean: number;
  MylowRatioMean: number;
  Type: string;
  highRatio_age: number;
  midRatio_age: number;
  lowRatio_age: number;
}

export interface BettingSuccessGraphProps {
  betBuyRatio: number;
  userId: string;
  startedAt: string;
  betBuyRatioMean: number;
  betSellRatio: number;
  betSellRatioMean: number;
}

export interface BalanceTrendGraphProps {
  userId: string;
  startedAt: string;
  avgCashRatio: number;
  avgCashRatioMean: number;
}
