import { Head } from '@inertiajs/react';
import type { Project } from '@/types/project';

interface ProjectPageProps {
    project: {
        data: Project;
    };
}

export default function ProjectPage({ project }: ProjectPageProps) {
    const projectData = project.data;
    const initials = projectData.name.slice(0, 2).toUpperCase();

    return (
        <>
            <Head title={projectData.name} />

            <main className="min-h-screen bg-[#f7f5ef] px-5 py-6 text-[#27313a] sm:px-8 lg:px-12">
                <div className="mx-auto max-w-6xl">
                    <header className="flex items-center justify-between border-b border-[#e2e1dc] pb-5">
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-items-center rounded-xl bg-[#dbe8dd] text-sm font-semibold text-[#47644e]">
                                BV
                            </div>
                            <div>
                                <p className="text-lg font-semibold tracking-[-0.02em]">BugVault</p>
                                <p className="text-xs text-[#7a8280]">Project workspace</p>
                            </div>
                        </div>

                        <a
                            href="/"
                            className="rounded-full border border-[#d8dfd9] bg-white px-4 py-2 text-sm font-medium text-[#587260] transition hover:border-[#b9cbbb] hover:bg-[#f2f7f2]"
                        >
                            ← All projects
                        </a>
                    </header>

                    <section className="py-10 sm:py-14">
                        <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="grid size-16 shrink-0 place-items-center rounded-3xl bg-[#e4eff1] text-lg font-semibold text-[#4b7077] shadow-[0_12px_26px_rgba(75,112,119,0.10)]">
                                    {initials}
                                </div>
                                <div>
                                    <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-[#78917e] uppercase">
                                        Project overview
                                    </p>
                                    <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{projectData.name}</h1>
                                    <p className="mt-3 max-w-2xl text-base leading-7 text-[#687177]">
                                        {projectData.description || 'No project description has been added yet.'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex w-fit items-center gap-4 rounded-2xl border border-[#deded8] bg-white px-5 py-4 shadow-[0_12px_30px_rgba(49,58,52,0.05)]">
                                <span className="grid size-10 place-items-center rounded-xl bg-[#eee8f6] text-sm font-semibold text-[#6f6286]">
                                    {projectData.bugs_count}
                                </span>
                                <div>
                                    <p className="text-sm font-semibold">Tracked bugs</p>
                                    <p className="mt-0.5 text-xs text-[#7a8280]">Across this project</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-[#deded8] bg-white p-6 shadow-[0_14px_35px_rgba(49,58,52,0.05)] sm:p-8">
                        <div className="flex items-center justify-between gap-4 border-b border-[#efeee9] pb-5">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.16em] text-[#78917e] uppercase">Workspace</p>
                                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Project bugs</h2>
                            </div>
                            <span className="rounded-full bg-[#f4f1ea] px-3 py-1.5 text-xs font-medium text-[#6e6a5d]">
                                {projectData.bugs_count} tracked
                            </span>
                        </div>

                        <div className="grid min-h-64 place-items-center py-10 text-center">
                            <div className="max-w-md">
                                <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#e8f0e7] text-xl text-[#57765f]">✦</div>
                                <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em]">Your bug workspace is ready</h3>
                                <p className="mt-3 text-sm leading-6 text-[#70787d]">
                                    The project overview is connected. Bug cards will appear here when the project bug data is included in the page response.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
