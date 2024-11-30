interface User {
  id: string;
  username: string;
  balance: number;
  totalBets: number;
  winCount: number;
  lossCount: number;
}

// Mock user data stored in localStorage
class UserService {
  private readonly STORAGE_KEY = 'user_data';
  private readonly INITIAL_BALANCE = 10000;

  constructor() {
    // Initialize user data if not exists
    if (!this.getUserData()) {
      this.setUserData({
        id: 'user-1',
        username: 'Player1',
        balance: this.INITIAL_BALANCE,
        totalBets: 0,
        winCount: 0,
        lossCount: 0
      });
    }
  }

  private getUserData(): User | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  private setUserData(userData: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
  }

  getBalance(): number {
    return this.getUserData()?.balance ?? this.INITIAL_BALANCE;
  }

  updateBalance(amount: number): void {
    const userData = this.getUserData();
    if (userData) {
      userData.balance += amount;
      this.setUserData(userData);
    }
  }

  recordBet(won: boolean, amount: number): void {
    const userData = this.getUserData();
    if (userData) {
      userData.totalBets += 1;
      if (won) {
        userData.winCount += 1;
      } else {
        userData.lossCount += 1;
      }
      this.setUserData(userData);
    }
  }

  getStats(): Omit<User, 'id'> {
    const userData = this.getUserData();
    if (!userData) {
      return {
        username: 'Player1',
        balance: this.INITIAL_BALANCE,
        totalBets: 0,
        winCount: 0,
        lossCount: 0
      };
    }
    const { id, ...stats } = userData;
    return stats;
  }
}

export const userService = new UserService(); 