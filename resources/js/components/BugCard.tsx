import { Link } from '@inertiajs/react';
import type { Bug } from '@/types/bug';

interface BugCardProps {
    bug: Bug;
    projectSlug: string;
}

const statusStyles = {
    open: 'bg-[#f8e9e5] text-[#a45e51]',
    in_progress: 'bg-[#eee8f6] text-[#6f6286]',
    resolved: 'bg-[#e8f0e7] text-[#57765f]',
} as const;

const statusLabels = {
    open: 'Open',
    in_progress: 'In progress',
    resolved: 'Resolved',
} as const;

export default function BugCard({ bug, projectSlug }: BugCardProps) {
    return (
        <Link
            href={`/project/${projectSlug}/bugs/${bug.id}`}
            className="block rounded-2xl border border-[#ecebe6] bg-[#fcfcf9] p-5 transition hover:-translate-y-0.5 hover:border-[#cbd9ce] hover:shadow-[0_12px_28px_rgba(49,58,52,0.06)]"
        >
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-base leading-6 font-semibold text-[#303a40]">{bug.title}</h3>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[bug.status]}`}>
                    {statusLabels[bug.status]}
                </span>
            </div>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#70787d]">
                {bug.description || bug.error_message || 'No additional context has been added yet.'}
            </p>
            {bug.technology && (
                <div className="mt-5 border-t border-[#efeee9] pt-4 text-xs font-medium text-[#78917e]">{bug.technology}</div>
            )}
        </Link>
    );
}
