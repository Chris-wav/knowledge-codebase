export interface Bug {
    id: number;
    title: string;
    error_message: string | null;
    description: string | null;
    cause: string | null;
    solution: string | null;
    status: 'open' | 'in_progress' | 'resolved';
    project_name: string | null;
    technology: string | null;
    created_at: string;
    updated_at: string;
}
