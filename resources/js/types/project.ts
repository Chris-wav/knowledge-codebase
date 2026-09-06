import type { Bug } from './bug';

export interface Project {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    bugs_count: number;
    bugs: Bug[];
    created_at: string;
    updated_at: string;
}
