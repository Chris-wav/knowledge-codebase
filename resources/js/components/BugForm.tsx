import { useState, type ChangeEvent, type FormEvent } from 'react';

type BugStatus = 'open' | 'in_progress' | 'resolved';

type BugFormData = {
    title: string;
    error_message: string;
    description: string;
    cause: string;
    solution: string;
    status: BugStatus;
    project_name: string;
    technology: string;
};

interface BugFormProps {
    projectSlug: string;
    onCancel: () => void;
    onCreated: () => void;
}

const initialFormData: BugFormData = {
    title: '',
    error_message: '',
    description: '',
    cause: '',
    solution: '',
    status: 'open',
    project_name: '',
    technology: '',
};

export default function BugForm({ projectSlug, onCancel, onCreated }: BugFormProps) {
    const [formData, setFormData] = useState<BugFormData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [requestError, setRequestError] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setFormData((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: [] }));
    };

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setProcessing(true);
        setErrors({});
        setRequestError('');

        try {
            const response = await fetch(`/api/projects/${projectSlug}/bugs`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const payload = await response.json().catch(() => null);

            if (response.status === 422) {
                setErrors(payload?.errors ?? {});
                return;
            }

            if (!response.ok) {
                setRequestError(payload?.message ?? 'The bug could not be created.');
                return;
            }

            setFormData(initialFormData);
            onCreated();
        } catch {
            setRequestError('Could not connect to the server. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <section className="rounded-3xl border border-[#deded8] bg-white p-6 shadow-[0_14px_35px_rgba(49,58,52,0.05)] sm:p-8">
            <div className="border-b border-[#efeee9] pb-6">
                <p className="text-xs font-semibold tracking-[0.16em] text-[#78917e] uppercase">New record</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Document a bug</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#70787d]">Capture the context behind an issue so the next fix is easier to find.</p>
            </div>

            <form className="mt-7 space-y-6" onSubmit={submit}>
                <div className="grid gap-5 sm:grid-cols-2">
                    <InputField label="Title" name="title" value={formData.title} error={errors.title?.[0]} placeholder="e.g. Login returns a server error" onChange={handleChange} wide />
                    <SelectField label="Status" name="status" value={formData.status} error={errors.status?.[0]} onChange={handleChange} />
                    <InputField label="Technology" name="technology" value={formData.technology} error={errors.technology?.[0]} placeholder="e.g. Laravel" onChange={handleChange} />
                </div>

                <TextAreaField label="Error message" name="error_message" value={formData.error_message} error={errors.error_message?.[0]} placeholder="Paste the relevant error or log output" onChange={handleChange} />

                <div className="grid gap-5 sm:grid-cols-2">
                    <TextAreaField label="Description" name="description" value={formData.description} error={errors.description?.[0]} placeholder="What happened?" onChange={handleChange} />
                    <TextAreaField label="Cause" name="cause" value={formData.cause} error={errors.cause?.[0]} placeholder="What caused it?" onChange={handleChange} />
                    <TextAreaField label="Solution" name="solution" value={formData.solution} error={errors.solution?.[0]} placeholder="How was it fixed?" onChange={handleChange} />
                    <InputField label="Project name" name="project_name" value={formData.project_name} error={errors.project_name?.[0]} placeholder="Optional project reference" onChange={handleChange} />
                </div>

                {requestError && <p className="rounded-xl bg-[#f8e9e5] px-4 py-3 text-sm text-[#a45e51]">{requestError}</p>}

                <div className="flex flex-col-reverse gap-3 border-t border-[#efeee9] pt-6 sm:flex-row sm:justify-end">
                    <button type="button" onClick={onCancel} className="h-11 rounded-xl px-5 text-sm font-medium text-[#6f777c] transition hover:bg-[#f4f4ef]">Cancel</button>
                    <button type="submit" disabled={processing} className="h-11 rounded-xl bg-[#9fbea6] px-5 text-sm font-semibold text-[#233329] transition hover:bg-[#90b198] disabled:cursor-not-allowed disabled:opacity-60">
                        {processing ? 'Saving…' : 'Save bug'}
                    </button>
                </div>
            </form>
        </section>
    );
}

type FieldProps = {
    label: string;
    name: keyof BugFormData;
    value: string;
    error?: string;
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    wide?: boolean;
};

function InputField({ label, name, value, error, placeholder, onChange, wide = false }: FieldProps) {
    return (
        <label className={wide ? 'block sm:col-span-2' : 'block'}>
            <span className="mb-2 block text-sm font-medium text-[#303a40]">{label}</span>
            <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} className="h-12 w-full rounded-xl border border-[#d7d9d4] bg-[#fbfbf8] px-4 text-sm outline-none transition placeholder:text-[#a0a6a3] focus:border-[#87a88e] focus:ring-4 focus:ring-[#dbe8dd]" />
            {error && <span className="mt-1.5 block text-xs text-[#a45e51]">{error}</span>}
        </label>
    );
}

function SelectField({ label, name, value, error, onChange }: Omit<FieldProps, 'placeholder' | 'wide'>) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#303a40]">{label}</span>
            <select name={name} value={value} onChange={onChange} className="h-12 w-full rounded-xl border border-[#d7d9d4] bg-[#fbfbf8] px-4 text-sm outline-none transition focus:border-[#87a88e] focus:ring-4 focus:ring-[#dbe8dd]">
                <option value="open">Open</option>
                <option value="in_progress">In progress</option>
                <option value="resolved">Resolved</option>
            </select>
            {error && <span className="mt-1.5 block text-xs text-[#a45e51]">{error}</span>}
        </label>
    );
}

function TextAreaField({ label, name, value, error, placeholder, onChange }: Omit<FieldProps, 'wide'>) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#303a40]">{label}</span>
            <textarea name={name} value={value} onChange={onChange} rows={4} placeholder={placeholder} className="w-full resize-y rounded-xl border border-[#d7d9d4] bg-[#fbfbf8] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#a0a6a3] focus:border-[#87a88e] focus:ring-4 focus:ring-[#dbe8dd]" />
            {error && <span className="mt-1.5 block text-xs text-[#a45e51]">{error}</span>}
        </label>
    );
}
