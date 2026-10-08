interface SectionHeaderProps {
  index: string;
  title: string;
  id?: string;
  subtitle?: string;
}

const SectionHeader = ({ index, title, id, subtitle }: SectionHeaderProps) => (
  <div className="mb-10">
    <div className="flex items-center gap-4">
      <span className="text-xs font-mono text-accent">{index}</span>
      <h2 id={id} className="text-2xl font-semibold tracking-tight lowercase">
        {title}
      </h2>
      <div
        className="h-px flex-1"
        style={{ background: "linear-gradient(to right, var(--border-strong), transparent)" }}
      />
    </div>
    {subtitle && <p className="text-sm text-muted mt-3 max-w-xl">{subtitle}</p>}
  </div>
);

export default SectionHeader;
