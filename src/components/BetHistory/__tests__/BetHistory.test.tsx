import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BetHistory } from '../index';
import { createMockBet } from '../../../utils/testUtils';
import * as api from '../../../services/api';

jest.mock('../../../services/api');

describe('BetHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', () => {
    render(<BetHistory />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays bet history after loading', async () => {
    const mockBets = [
      createMockBet({ status: 'won' }),
      createMockBet({ status: 'lost', direction: 'down' })
    ];

    (api.getUserBets as jest.Mock).mockResolvedValueOnce({ bets: mockBets });

    render(<BetHistory />);

    await waitFor(() => {
      expect(screen.getByText('Betting History')).toBeInTheDocument();
    });

    expect(screen.getByText('TEST')).toBeInTheDocument();
    expect(screen.getByText('Won')).toBeInTheDocument();
    expect(screen.getByText('Lost')).toBeInTheDocument();
  });

  it('handles error state', async () => {
    (api.getUserBets as jest.Mock).mockRejectedValueOnce(new Error('Failed to load'));

    render(<BetHistory />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load bet history')).toBeInTheDocument();
    });
  });
}); 