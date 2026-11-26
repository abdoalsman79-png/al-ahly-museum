import { useMemo, useState } from 'react';
import { useStore, LibTab } from '../store';
import { tr, pick, Key } from '../data/i18n';
import { CHRONICLES, ALMANACS, CLIPPINGS, TIMELINE } from '../data/library';

export function LibraryPanel() {
  const s = useStore(); const lang = s.lang; const t = (k: Key) => tr(lang, k);
  const [q, setQ] = useState(''); const [tag, setTag] = useState<string>('all'); const [open, setOpen] = useState<string | null>('c0');
  const clips = useMemo(() => CLIPPINGS.filter((c) => (tag === 'all' || c.tag === tag) && (!q.trim() || (c.headline + ' ' + c.outlet + ' ' + c.summary.en + ' ' + c.summary.ar).toLowerCase().includes(q.trim().toLowerCase()))), [q, tag]);
  if (!s.libraryOpen) return null;
  const tabs: LibTab[] = ['chronicles', 'almanacs', 'press', 'timeline'];
  const tags: [string, Key][] = [['all', 'allTags'], ['continental', 'tagContinental'], ['world', 'tagWorld'], ['club', 'tagClub'], ['heritage', 'tagHeritage']];
  return (
    <div className="absolute inset-0 z-30 flex items-stretch justify-center bg-black/55 p-2 sm:p-8" data-testid="library">
      <div className="glass fade-up flex w-full max-w-4xl flex-col rounded-2xl">
        <header className="flex items-center gap-2 border-b border-ahly-gold/25 p-3">
          <h2 className="font-display text-xl gold flex-1">{t('library')}</h2>
          <button className="btn" onClick={() => s.closeLibrary()} data-testid="library-close">{t('close')} ✕</button>
        </header>
        <nav className="flex gap-1 overflow-x-auto p-2" role="tablist">{tabs.map((x) => <button key={x} role="tab" aria-selected={s.libTab === x} data-testid={'tab-' + x} className={'btn whitespace-nowrap ' + (s.libTab === x ? 'btn-on' : '')} onClick={() => s.openLibrary(x)}>{t(x)}</button>)}</nav>
        <div className="scroll flex-1 overflow-y-auto p-4 text-sm">
          {s.libTab === 'chronicles' && <div className="space-y-2">{CHRONICLES.map((c, i) => (
            <article key={c.id} className="rounded-xl bg-white/5 p-3">
              <button className="flex w-full items-center justify-between text-start" onClick={() => setOpen(open === 'c' + i ? null : 'c' + i)} aria-expanded={open === 'c' + i}>
                <span><b className="font-display">{pick(c.title, lang)}</b><span className="ms-2 text-xs gold">{pick(c.date, lang)}</span></span><span>{open === 'c' + i ? '−' : '+'}</span></button>
              {open === 'c' + i && <p className="mt-2 whitespace-pre-line leading-relaxed text-ahly-paper/85">{pick(c.body, lang)}</p>}
            </article>))}</div>}
          {s.libTab === 'almanacs' && <div className="space-y-6">{ALMANACS.map((a) => (
            <div key={a.id}><h3 className="font-display text-lg gold">{pick(a.title, lang)}</h3>{a.note && <p className="mb-2 text-xs text-ahly-paper/60">{pick(a.note, lang)}</p>}
              <div className="overflow-x-auto"><table className="w-full text-xs sm:text-sm"><thead><tr>{a.cols.map((c, i) => <th key={i} className="border-b border-ahly-gold/30 p-1.5 text-start gold">{pick(c, lang)}</th>)}</tr></thead>
                <tbody>{a.rows.map((r, i) => <tr key={i} className="odd:bg-white/5">{r.map((c, j) => <td key={j} className="p-1.5">{c}</td>)}</tr>)}</tbody></table></div></div>))}</div>}
          {s.libTab === 'press' && <div>
            <div className="mb-3 flex flex-wrap gap-2"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('searchPress')} aria-label={t('searchPress')} data-testid="press-search" className="min-w-[12rem] flex-1 rounded-full border border-ahly-gold/40 bg-black/30 px-4 py-1.5 outline-none focus:border-ahly-gold" />
              {tags.map(([k, l]) => <button key={k} className={'btn !text-xs ' + (tag === k ? 'btn-on' : '')} onClick={() => setTag(k)}>{t(l)}</button>)}</div>
            <div className="space-y-2">{clips.map((c) => (
              <article key={c.id} className="rounded-xl bg-white/5 p-3"><div className="text-xs gold">{c.outlet} · {pick(c.date, lang)}</div>
                <h4 className="font-semibold" dir="ltr">{c.headline}</h4><p className="mt-1 text-ahly-paper/85">{pick(c.summary, lang)}</p>
                <a className="mt-1 inline-block text-xs underline text-ahly-paper/70" href={c.url} target="_blank" rel="noreferrer">{t('openSource')} ↗</a></article>))}
              {clips.length === 0 && <p className="text-ahly-paper/60">—</p>}</div></div>}
          {s.libTab === 'timeline' && <ol className="relative ms-2 border-s-2 border-ahly-gold/50 ps-5">{TIMELINE.map((x) => (
            <li key={x.year + x.text.en} className="mb-4"><span className="absolute -start-[7px] mt-1.5 h-3 w-3 rounded-full bg-ahly-red ring-2 ring-ahly-gold" /><b className="gold">{x.year}</b><p>{pick(x.text, lang)}</p></li>))}</ol>}
        </div>
      </div>
    </div>
  );
}
