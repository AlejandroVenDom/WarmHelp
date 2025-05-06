export interface RegisterRequest {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    number: string;
    mySelf_description: string;
    roleType: string; // e.g., "USER", "ADMIN"
  }
  