import { Head, Link } from '@inertiajs/react';
import type { DashboardProps } from '@/types/dashboardProps';

export default function Dashboard({ projects }: DashboardProps) {
    const projectCount = projects.data.length;

    return (
        <>
            <Head title="Projects" />

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

                        <div className="hidden items-center gap-2 rounded-full border border-[#dce5df] bg-[#f0f6f1] px-3 py-1.5 text-xs font-medium text-[#52725a] sm:flex">
                            <span className="size-1.5 rounded-full bg-[#80ae8b]" />
                            All systems clear
                        </div>
                    </header>

                    <section className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between sm:py-14">
                        <div className="max-w-2xl">
                            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-[#78917e] uppercase">
                                Workspace overview
                            </p>
                            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Your projects</h1>
                            <p className="mt-4 max-w-xl text-base leading-7 text-[#687177]">
                                Keep an eye on the work that matters, surface active issues, and preserve the context
                                behind every fix.
                            </p>
                        </div>

                        <div className="flex w-fit items-center gap-4 rounded-2xl border border-[#deded8] bg-white px-5 py-4 shadow-[0_12px_30px_rgba(49,58,52,0.05)]">
                            <span className="grid size-10 place-items-center rounded-xl bg-[#eee8f6] text-sm font-semibold text-[#6f6286]">
                                {projectCount}
                            </span>
                            <div>
                                <p className="text-sm font-semibold">{projectCount === 1 ? 'Project' : 'Projects'}</p>
                                <p className="mt-0.5 text-xs text-[#7a8280]">Available to you</p>
                            </div>
                        </div>
                    </section>

                    {projectCount > 0 ? (
                        <section className="grid gap-4 pb-12 sm:grid-cols-2 lg:grid-cols-3" aria-label="Projects">
                            {projects.data.map((project) => (
                                <Link
                                    href={`/project/${project.slug}`}
                                    key={project.id}
                                    className="group flex min-h-60 cursor-pointer flex-col rounded-3xl border border-[#deded8] bg-white p-6 shadow-[0_14px_35px_rgba(49,58,52,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#c8d8cb] hover:shadow-[0_20px_45px_rgba(49,58,52,0.09)]"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#e4eff1] text-sm font-semibold text-[#4b7077]">
                                            {project.name.slice(0, 2).toUpperCase()}
                                        </span>
                                        <span className="rounded-full bg-[#f4f1ea] px-3 py-1 text-xs font-medium text-[#6e6a5d]">
                                            {project.bugs_count} {project.bugs_count === 1 ? 'bug' : 'bugs'} tracked
                                        </span>
                                    </div>

                                    <div className="mt-7">
                                        <h2 className="text-xl font-semibold tracking-[-0.025em]">{project.name}</h2>
                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#70787d]">
                                            {project.description || 'No project description has been added yet.'}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between border-t border-[#efeee9] pt-5 text-sm font-medium text-[#5b7862]">
                                        <span>Project overview</span>
                                        <span aria-hidden="true" className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </section>
                    ) : (
                        <section className="grid min-h-80 place-items-center rounded-3xl border border-dashed border-[#cfd8d0] bg-[#fbfbf8] px-6 text-center">
                            <div className="max-w-sm">
                                <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#e8f0e7] text-lg text-[#57765f]">⌘</div>
                                <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em]">No projects yet</h2>
                                <p className="mt-3 text-sm leading-6 text-[#70787d]">
                                    When you join or create a project, its bugs and team knowledge will appear here.
                                </p>
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </>
    );
}
