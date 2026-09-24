import { useEffect, useState, type FormEvent } from 'react';

interface Member { id: number; name: string; email: string; role: string; }

export default function MembersPanel({ projectSlug }: { projectSlug: string }) {
    const [members, setMembers] = useState<Member[]>([]);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const loadMembers = async () => {
        const response = await fetch(`/api/projects/${projectSlug}/members`, { credentials: 'same-origin', headers: { Accept: 'application/json' } });
        if (response.ok) { const payload = await response.json(); setMembers(payload.data ?? []); }
        setLoading(false);
    };

    useEffect(() => { void loadMembers(); }, [projectSlug]);

    const addMember = async (event: FormEvent) => {
        event.preventDefault(); setMessage('');
        const response = await fetch(`/api/projects/${projectSlug}/members`, { method: 'POST', credentials: 'same-origin', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
        const payload = await response.json().catch(() => null);
        if (!response.ok) { setMessage(payload?.message ?? payload?.errors?.email?.[0] ?? 'Could not add member.'); return; }
        setEmail(''); setMessage('Member added.'); await loadMembers();
    };

    const removeMember = async (id: number) => {
        if (!window.confirm('Remove this member from the project?')) return;
        const response = await fetch(`/api/projects/${projectSlug}/members/${id}`, { method: 'DELETE', credentials: 'same-origin', headers: { Accept: 'application/json' } });
        const payload = await response.json().catch(() => null);
        setMessage(response.ok ? 'Member removed.' : payload?.message ?? 'Could not remove member.');
        if (response.ok) await loadMembers();
    };

    return <section className="mt-6 rounded-3xl border border-[#deded8] bg-white p-6 shadow-[0_14px_35px_rgba(49,58,52,0.05)] sm:p-8">
        <div className="flex items-center justify-between"><div><p className="text-xs font-semibold tracking-[0.16em] text-[#78917e] uppercase">Collaboration</p><h2 className="mt-2 text-2xl font-semibold">Project members</h2></div><span className="rounded-full bg-[#f4f1ea] px-3 py-1.5 text-xs font-medium text-[#6e6a5d]">{members.length} members</span></div>
        <form onSubmit={addMember} className="mt-5 flex flex-col gap-2 sm:flex-row"><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="Invite by email" className="h-11 flex-1 rounded-xl border border-[#d7d9d4] bg-[#fbfbf8] px-4 text-sm outline-none focus:border-[#87a88e]" /><button className="h-11 rounded-xl bg-[#9fbea6] px-5 text-sm font-semibold text-[#233329]">Add member</button></form>
        {message && <p className="mt-3 text-sm text-[#687177]">{message}</p>}
        {loading ? <p className="mt-5 text-sm text-[#7a8280]">Loading members…</p> : <div className="mt-5 divide-y divide-[#efeee9]">{members.map((member) => <div key={member.id} className="flex items-center justify-between py-3"><div><p className="text-sm font-medium">{member.name}</p><p className="text-xs text-[#7a8280]">{member.email}</p></div><div className="flex items-center gap-3"><span className="rounded-full bg-[#e8f0e7] px-3 py-1 text-xs font-medium text-[#57765f]">{member.role}</span>{member.role !== 'owner' && <button type="button" onClick={() => void removeMember(member.id)} className="text-xs font-medium text-[#a45e51]">Remove</button>}</div></div>)}</div>}
    </section>;
}
