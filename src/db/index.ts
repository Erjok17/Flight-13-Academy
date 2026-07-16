import Dexie, { type Table } from 'dexie';
import { API_URL } from '../config/api';

// 1. Define Interfaces
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth?: string;
  age?: string;
  position?: string;
  jerseyNumber?: string;
  height?: string;
  weight?: string;
  school?: string;
  childName?: string;
  childAge?: string;
  childSchool?: string;
  organization?: string;
  scoutRole?: string;
  userType: string;
  updatedAt?: string;
}

export interface SyncAction {
  id?: number;
  action: 'UPDATE_PROFILE';
  userId: string;
  payload: any;
  timestamp: number;
}

// 2. Initialize Dexie Database
class Flight13Database extends Dexie {
  users!: Table<UserProfile, string>;
  syncQueue!: Table<SyncAction, number>;

  constructor() {
    super('Flight13Database');
    this.version(1).stores({
      users: 'id, email, userType',
      syncQueue: '++id, action, userId, timestamp'
    });
  }
}

export const db = new Flight13Database();

// 3. Central Sync & Database Engine
export const CentralEngine = {
  // Save profile to local Dexie cache
  async saveProfileLocal(profile: UserProfile): Promise<void> {
    await db.users.put(profile);
    // Maintain localStorage sync for legacy elements
    localStorage.setItem('user', JSON.stringify(profile));
  },

  // Read profile from local Dexie cache
  async getProfileLocal(userId: string): Promise<UserProfile | undefined> {
    return await db.users.get(userId);
  },

  // Map camelCase frontend fields to backend snake_case columns
  mapToBackend(profile: any) {
    const mapped: any = {};
    const keyMap: Record<string, string> = {
      fullName: 'full_name',
      email: 'email',
      phone: 'phone',
      location: 'location',
      dateOfBirth: 'date_of_birth',
      age: 'age',
      position: 'position',
      jerseyNumber: 'jersey_number',
      height: 'height',
      weight: 'weight',
      school: 'school',
      childName: 'child_name',
      childAge: 'child_age',
      childSchool: 'child_school',
      organization: 'organization',
      scoutRole: 'scout_role',
      userType: 'user_type'
    };

    for (const key in profile) {
      if (keyMap[key]) {
        mapped[keyMap[key]] = profile[key];
      }
    }
    return mapped;
  },

  // Map backend snake_case columns to camelCase frontend fields
  mapToFrontend(profile: any): UserProfile {
    return {
      id: profile.id,
      fullName: profile.full_name || profile.fullName || '',
      email: profile.email || '',
      phone: profile.phone || '',
      location: profile.location || 'Kampala, Uganda',
      dateOfBirth: profile.date_of_birth || profile.dateOfBirth || '',
      age: profile.age || '',
      position: profile.position || '',
      jerseyNumber: profile.jersey_number || profile.jerseyNumber || '',
      height: profile.height || '',
      weight: profile.weight || '',
      school: profile.school || '',
      childName: profile.child_name || profile.childName || '',
      childAge: profile.child_age || profile.childAge || '',
      childSchool: profile.child_school || profile.childSchool || '',
      organization: profile.organization || '',
      scoutRole: profile.scout_role || profile.scoutRole || '',
      userType: profile.user_type || profile.userType || 'general',
      updatedAt: profile.updated_at || new Date().toISOString()
    };
  },

  // Push profile updates to the backend with offline queuing support
  async updateProfile(profile: UserProfile, token: string): Promise<boolean> {
    // 1. Update local IndexedDB cache immediately (Optimistic UI)
    await this.saveProfileLocal(profile);

    // 2. Check if browser is online
    if (!navigator.onLine) {
      console.warn('Browser is offline. Profile update queued in IndexedDB.');
      await db.syncQueue.add({
        action: 'UPDATE_PROFILE',
        userId: profile.id,
        payload: profile,
        timestamp: Date.now()
      });
      this.registerOnlineListener(token);
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(this.mapToBackend(profile))
      });

      const data = await response.json();
      if (data.success && data.user) {
        // Save the fresh backend profile (maps back to camelCase)
        const updatedProfile = this.mapToFrontend(data.user);
        await this.saveProfileLocal(updatedProfile);
        return true;
      } else {
        throw new Error(data.error || 'Failed to update backend profile.');
      }
    } catch (error) {
      console.error('Network sync failed. Profile update queued in IndexedDB.', error);
      // Queue action for offline sync
      await db.syncQueue.add({
        action: 'UPDATE_PROFILE',
        userId: profile.id,
        payload: profile,
        timestamp: Date.now()
      });
      this.registerOnlineListener(token);
      return false;
    }
  },

  // Pull fresh profile from backend `/api/auth/me` and cache it in Dexie
  async syncProfileFromBackend(token: string): Promise<UserProfile | null> {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const user = await response.json();
      if (user && user.id) {
        const profile = this.mapToFrontend(user);
        await this.saveProfileLocal(profile);
        return profile;
      }
      return null;
    } catch (error) {
      console.error('Failed to sync profile from backend:', error);
      return null;
    }
  },

  // Process any pending offline updates stored in the queue
  async processSyncQueue(token: string): Promise<void> {
    if (!navigator.onLine) return;

    const queuedActions = await db.syncQueue.toArray();
    if (queuedActions.length === 0) return;

    console.log(`Processing ${queuedActions.length} pending offline sync actions...`);

    for (const action of queuedActions) {
      try {
        if (action.action === 'UPDATE_PROFILE') {
          const response = await fetch(`${API_URL}/api/auth/profile`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(this.mapToBackend(action.payload))
          });

          const data = await response.json();
          if (data.success) {
            console.log(`Successfully synced action ID: ${action.id}`);
            await db.syncQueue.delete(action.id!);
          }
        }
      } catch (err) {
        console.error(`Failed to sync action ID: ${action.id}, will retry later.`, err);
        break; // Stop loop if network is still unreachable
      }
    }
  },

  // Register browser online event listener
  registerOnlineListener(token: string) {
    const handleOnline = () => {
      this.processSyncQueue(token);
      window.removeEventListener('online', handleOnline);
    };
    window.addEventListener('online', handleOnline);
  }
};
