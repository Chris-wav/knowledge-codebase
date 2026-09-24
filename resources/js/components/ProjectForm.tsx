import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Project } from '@/types/project';

interface ProjectFormProps {
    onCancel: () => void;
    onSaved: () => void;
    mode?: 'create' | 'edit';
    project?: Project;
}

export default function ProjectForm({ onCancel, onSaved, mode = 'create', project }: ProjectFormProps) {
    const editing = mode === 'edit';
    const [name, setName] = useState(project?.name ?? '');
    const [description, setDescription] = useState(project?.description ?? '');
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [requestError, setRequestError] = useState('');
    const [processing, setProcessing] = useState(false);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setProcessing(true);
        setErrors({});
        setRequestError('');

        try {
            const response = await fetch(editing ? `/api/projects/${project?.slug}` : '/api/projects', {
                method: editing ? 'PATCH' : 'POST',
                credentials: 'same-origin',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description: description || null }),
            });
            const payload = await response.json().catch(() => null);

            if (response.status === 422) {
                setErrors(payload?.errors ?? {});
                return;
            }

            if (!response.ok) {
                setRequestError(payload?.message ?? 'The project could not be created.');
                return;
            }

            onSaved();
        } catch {
            setRequestError('Could not connect to the server. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const clearNameError = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setErrors((current) => ({ ...current, name: [] }));
    };

    return (
        <section className="mb-6 rounded-3xl border border-[#deded8] bg-white p-6 shadow-[0_14px_35px_rgba(49,58,52,0.05)] sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#78917e] uppercase">Project settings</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{editing ? 'Edit project' : 'Create a project'}</h2>
            <form className="mt-6 space-y-5" onSubmit={submit}>
                <label className="block">
                    <span className="mb-2 block text-sm font-medium">Project name</span>
                    <input value={name} onChange={clearNameError} placeholder="e.g. Checkout platform" className="h-12 w-full rounded-xl border border-[#d7d9d4] bg-[#fbfbf8] px-4 text-sm outline-none transition placeholder:text-[#a0a6a3] focus:border-[#87a88e] focus:ring-4 focus:ring-[#dbe8dd]" />
                    {errors.name?.[0] && <span className="mt-1.5 block text-xs text-[#a45e51]">{errors.name[0]}</span>}
                </label>
                <label className="block">
                    <span className="mb-2 block text-sm font-medium">Description</span>
                    <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} placeholder="What does this project contain?" className="w-full resize-y rounded-xl border border-[#d7d9d4] bg-[#fbfbf8] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#a0a6a3] focus:border-[#87a88e] focus:ring-4 focus:ring-[#dbe8dd]" />
                </label>
                {requestError && <p className="rounded-xl bg-[#f8e9e5] px-4 py-3 text-sm text-[#a45e51]">{requestError}</p>}
                <div className="flex justify-end gap-3 border-t border-[#efeee9] pt-5">
                    <button type="button" onClick={onCancel} className="h-11 rounded-xl px-5 text-sm font-medium text-[#6f777c] transition hover:bg-[#f4f4ef]">Cancel</button>
                    <button type="submit" disabled={processing} className="h-11 rounded-xl bg-[#9fbea6] px-5 text-sm font-semibold text-[#233329] transition hover:bg-[#90b198] disabled:cursor-not-allowed disabled:opacity-60">{processing ? 'Saving…' : editing ? 'Save changes' : 'Create project'}</button>
                </div>
            </form>
        </section>
    );
}
