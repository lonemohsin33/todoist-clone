import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private currentUser = new BehaviorSubject<User | null>(null);
  
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    
    // Set up auth state listener
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUser.next(session?.user ?? null);
      console.log(this.currentUser)
    });
  }

  // Auth methods
  async signIn(email: string, password: string) {
    const { user, error } = await this.supabase.auth.signIn({
      email,
      password
    });
    if (error) throw error;
    return user;
  }

  async signUp(email: string, password: string) {
    const { user, error } = await this.supabase.auth.signUp({
      email,
      password
    });
    if (error) throw error;
    return user;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  // Get current user
  async getUser() {
    const user = this.supabase.auth.user();
    return user;
  }

  // Data methods with error handling
  async getData(tableName: string) {
    const { data, error } = await this.supabase
      .from(tableName)
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

    return data;
  }

  async insertData(tableName: string, record: any) {
    // Get current user
    const user = this.supabase.auth.user();
    
    if (user) {
      record.user_id = user.id;
    }

    const { data, error } = await this.supabase
      .from(tableName)
      .insert([record]);

    if (error) {
      console.error('Error inserting data:', error);
      throw error;
    }

    return data;
  }

  async updateData(tableName: string, id: number, record: any) {
    const { data, error } = await this.supabase
      .from(tableName)
      .update(record)
      .match({ id });

    if (error) {
      console.error('Error updating data:', error);
      throw error;
    }

    return data;
  }

  async deleteData(tableName: string, id: number) {
    const { data, error } = await this.supabase
      .from(tableName)
      .delete()
      .match({ id });

    if (error) {
      console.error('Error deleting data:', error);
      throw error;
    }

    return data;
  }

  // Get current user observable
  getCurrentUser() {
    return this.currentUser.asObservable();
  }
}