import type { User } from '../types';

// Mock user storage
const USERS_KEY = 'train_booking_users';
const CURRENT_USER_KEY = 'train_booking_current_user';

interface StoredUser extends User {
  passwordHash: string;
}

function getUsers(): StoredUser[] {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function registerUser(name: string, email: string, password: string): Promise<User> {
  const users = getUsers();
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }

  // In a real app, we'd hash the password. Here we're just storing it
  const newUser: StoredUser = {
    id: Date.now().toString(),
    name,
    email,
    passwordHash: password,
    bookings: []
  };

  users.push(newUser);
  saveUsers(users);

  const { passwordHash, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user || user.passwordHash !== password) {
    throw new Error('Invalid credentials');
  }

  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUserProfile(userId: string): Promise<User> {
  const users = getUsers();
  const user = users.find(u => u.id === userId);

  if (!user) {
    throw new Error('User not found');
  }

  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  users[userIndex] = {
    ...users[userIndex],
    ...data
  };

  saveUsers(users);

  const { passwordHash, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
}