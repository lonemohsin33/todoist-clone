export interface PriorityObject {
    priority: string;          // You can adjust the type (e.g., number) based on actual use
    priority_icon: string;     // Assuming this is a string (URL or icon name)
    priority_color: string;    // Color as a string (hex code, color name, etc.)
  }
  
  export interface Task {
    task_name: string;          // Task name as a string
    task_desc: string;          // Task description as a string
    priority_obj: PriorityObject;
    due_date: Date | string;    // Date object or string (depending on how you manage it)
    due_color: string;          // Color as a string
    day_diff: number;           // Difference in days as a number
    date_time_date_format: string; // Date format as a string
  }
  