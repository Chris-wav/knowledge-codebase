import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import BugForm from '@/components/BugForm';
import type { Bug } from '@/types/bug';

interface BugPageProps {
    bug: {
        data: Bug;
    };
    project_slug: string;
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

export default function BugPage({ bug: bugResource, project_slug }: BugPageProps) {
    const [showEditForm, setShowEditForm] = useState(false);
    const bug = bugResource.data;

    return (
        <>
            <Head title={bug.title} />

            <main className="min-h-screen bg-[#f7f5ef] px-5 py-6 text-[#27313a] sm:px-8 lg:px-12">
                <div className="mx-auto max-w-4xl">
                    <header className="flex items-center justify-between border-b border-[#e2e1dc] pb-5">
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-items-center rounded-xl bg-[#dbe8dd] text-sm font-semibold text-[#47644e]">BV</div>
                            <div>
                                <p className="text-lg font-semibold tracking-[-0.02em]">BugVault</p>
                                <p className="text-xs text-[#7a8280]">Bug detail</p>
                            </div>
                        </div>

                        <Link
                            href="/"
                            className="rounded-full border border-[#d8dfd9] bg-white px-4 py-2 text-sm font-medium text-[#587260] transition hover:border-[#b9cbbb] hover:bg-[#f2f7f2]"
                        >
                            ← All projects
                        </Link>
                    </header>

                    <section className="py-10 sm:py-14">
                        <div className="rounded-3xl border border-[#deded8] bg-white p-6 shadow-[0_14px_35px_rgba(49,58,52,0.05)] sm:p-10">
                            <div className="flex flex-wrap items-start justify-between gap-5">
                                <div>
                                    <p className="text-xs font-semibold tracking-[0.16em] text-[#78917e] uppercase">Bug detail</p>
                                    <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{bug.title}</h1>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[bug.status]}`}>
                                        {statusLabels[bug.status]}
                                    </span>
                                    {!showEditForm && (
                                        <button type="button" onClick={() => setShowEditForm(true)} className="rounded-xl bg-[#9fbea6] px-4 py-2 text-sm font-semibold text-[#233329] transition hover:bg-[#90b198]">
                                            Edit bug
                                        </button>
                                    )}
                                </div>
                            </div>

                            {bug.technology && (
                                <p className="mt-4 text-sm font-medium text-[#78917e]">{bug.technology}</p>
                            )}

                            {showEditForm ? (
                                <div className="mt-8">
                                    <BugForm
                                        projectSlug={project_slug}
                                        mode="edit"
                                        bug={bug}
                                        onCancel={() => setShowEditForm(false)}
                                        onSaved={() => {
                                            setShowEditForm(false);
                                            router.reload();
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                    <InfoBlock label="Error message" value={bug.error_message} />
                                    <InfoBlock label="Description" value={bug.description} />
                                    <InfoBlock label="Cause" value={bug.cause} />
                                    <InfoBlock label="Solution" value={bug.solution} />
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

function InfoBlock({ label, value }: { label: string; value: string | null }) {
    return (
        <div className="rounded-2xl border border-[#ecebe6] bg-[#fcfcf9] p-5">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#78917e] uppercase">{label}</p>
            <p className="mt-3 text-sm leading-6 text-[#626d72]">{value || 'No information provided.'}</p>
        </div>
    );
}
