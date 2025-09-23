export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  dueDate: string | null;
  babyGender: string | null;
  avatar: string | null;
}

export interface ApiResponse {
  status: number;
  message: string;
  data:  UserResponse ;
}
