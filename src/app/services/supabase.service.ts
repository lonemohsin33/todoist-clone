import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const SUPABASE_URL = environment.supabaseUrl;  // Your Supabase project URL
    const SUPABASE_ANON_KEY = environment.supabaseKey;  // Your Supabase anon/public API key

    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  // Example: Fetch data from a table
  async getData(tableName: string) {
    console.log(tableName)
    const { data, error } = await this.supabase
      .from(tableName)
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }

    return data;
  }

  // Example: Insert data into a table
  async insertData(tableName: string, record: any) {
    const { data, error } = await this.supabase
      .from(tableName)
      .insert([record]);

    if (error) {
      console.error('Error inserting data:', error);
      return null;
    }

    return data;
  }
}
