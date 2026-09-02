import type { Project } from './project';

export interface DashboardProps {
    projects: {
        data: Project[];
    };
}
