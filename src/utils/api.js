import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // We'll set up the backend later

export const saveUserProgress = async (walletAddress, data) => {
  console.log('Saving progress for wallet:', walletAddress, 'Data:', data);
  const response = await fetch(`${API_URL}/save-progress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress, data })
  });
  if (!response.ok) {
    throw new Error('Failed to save progress');
  }
  return response.json();
};

export const loadUserProgress = async (walletAddress) => {
  console.log('Loading progress for wallet:', walletAddress);
  const response = await fetch(`${API_URL}/load-progress/${walletAddress}`);
  if (!response.ok) {
    throw new Error('Failed to load progress');
  }
  return response.json();
};

export const fetchLeaderboardData = async () => {
  try {
    const response = await fetch(`${API_URL}/leaderboard`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Leaderboard data from API:', data);
    return data;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
};
