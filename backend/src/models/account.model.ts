export interface Account {
    id: number;
    role_id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    gender: number;
    birthday: Date;
    status: number;
    created_at: Date
    updated_at: Date
}