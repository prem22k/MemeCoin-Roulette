import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BetModal } from '../BetModal';
import { mockCoin, mockBetData } from '../../../utils/testUtils';

describe('BetModal', () => {
  const mockOnClose = jest.fn();
  const mockOnPlaceBet = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with coin data', () => {
    render(
      <BetModal
        isOpen={true}
        onClose={mockOnClose}
        coin={mockCoin}
        onPlaceBet={mockOnPlaceBet}
      />
    );

    expect(screen.getByText('Place Your Bet')).toBeInTheDocument();
    expect(screen.getByText(mockCoin.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockCoin.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it('validates bet amount', async () => {
    render(
      <BetModal
        isOpen={true}
        onClose={mockOnClose}
        coin={mockCoin}
        onPlaceBet={mockOnPlaceBet}
      />
    );

    const submitButton = screen.getByText('Place Bet');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Please select a trend direction')).toBeInTheDocument();
  });

  it('handles successful bet placement', async () => {
    mockOnPlaceBet.mockResolvedValueOnce({});

    render(
      <BetModal
        isOpen={true}
        onClose={mockOnClose}
        coin={mockCoin}
        onPlaceBet={mockOnPlaceBet}
      />
    );

    // Select direction
    const upButton = screen.getByText('Trending Up');
    fireEvent.click(upButton);

    // Enter amount
    const amountInput = screen.getByPlaceholderText('Enter amount');
    fireEvent.change(amountInput, { target: { value: '100' } });

    // Submit bet
    const submitButton = screen.getByText('Place Bet');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnPlaceBet).toHaveBeenCalledWith({
        coinId: mockCoin.id,
        amount: 100,
        direction: 'up',
        odds: mockCoin.odds
      });
    });

    expect(await screen.findByText('Bet placed successfully!')).toBeInTheDocument();
  });
}); 