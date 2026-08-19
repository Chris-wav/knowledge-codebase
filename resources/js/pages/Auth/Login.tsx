import { Head, useForm } from '@inertiajs/react';
import type { SubmitEvent } from 'react';

export default function Login() {
    const { data, setData, post, processing } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Sign in" />

            <main className="min-h-screen bg-[#f7f5ef] px-5 py-6 text-[#27313a] sm:px-8">
                <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-items-center rounded-xl bg-[#dbe8dd] text-sm font-semibold text-[#47644e]">
                                BV
                            </div>
                            <span className="text-lg font-semibold tracking-[-0.02em]">BugVault</span>
                        </div>

                        <div className="hidden items-center gap-2 text-sm text-[#6f777c] sm:flex">
                            <span className="size-2 rounded-full bg-[#91b69a]" />
                            Secure company access
                        </div>
                    </header>

                    <div className="grid flex-1 place-items-center py-12">
                        <section className="w-full max-w-[420px]" aria-labelledby="login-heading">
                            <div className="mb-8">
                                <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-[#78917e] uppercase">
                                    Internal knowledge base
                                </p>
                                <h1 id="login-heading" className="text-4xl font-semibold tracking-[-0.035em]">
                                    Welcome back
                                </h1>
                                <p className="mt-3 leading-7 text-[#687177]">
                                    Sign in to find past fixes, track active bugs, and keep your projects moving.
                                </p>
                            </div>

                            <form
                                className="rounded-3xl border border-[#deded8] bg-white p-6 shadow-[0_18px_50px_rgba(49,58,52,0.07)] sm:p-8"
                                onSubmit={submit}
                            >
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                                        Work email
                                    </label>
                                    <input
                                        value={data.email}
                                        onChange={(event) => setData('email', event.target.value)}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@company.com"
                                        className="h-12 w-full rounded-xl border border-[#d7d9d4] bg-[#fbfbf8] px-4 text-[15px] outline-none transition placeholder:text-[#a0a6a3] focus:border-[#87a88e] focus:ring-4 focus:ring-[#dbe8dd]"
                                    />
                                </div>

                                <div className="mt-5">
                                    <label htmlFor="password" className="mb-2 block text-sm font-medium">
                                        Password
                                    </label>
                                    <input
                                        value={data.password}
                                        onChange={(event) => setData('password', event.target.value)}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        className="h-12 w-full rounded-xl border border-[#d7d9d4] bg-[#fbfbf8] px-4 text-[15px] outline-none transition placeholder:text-[#a0a6a3] focus:border-[#87a88e] focus:ring-4 focus:ring-[#dbe8dd]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#9fbea6] px-4 text-sm font-semibold text-[#233329] transition hover:bg-[#90b198] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f9277] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Signing in…' : 'Sign in'}
                                    {!processing && <span aria-hidden="true">→</span>}
                                </button>
                            </form>

                            <p className="mt-5 text-center text-sm text-[#7a8280]">
                                Access is limited to members of your organization.
                            </p>
                        </section>
                    </div>

                    <footer className="flex items-center justify-between border-t border-[#e2e1dc] pt-5 text-xs text-[#8a908d]">
                        <span>Engineering knowledge, kept useful.</span>
                        <span>BugVault</span>
                    </footer>
                </div>
            </main>
        </>
    );
}
