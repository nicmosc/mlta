interface FiltersProps {
  value?: 'active' | 'completed';
  onChange: (filter: FiltersProps['value']) => void;
}

export const Filters = ({ value, onChange }: FiltersProps) => {
  console.log(value);
  return (
    <ul className="filters">
      <li>
        <a onClick={() => onChange(undefined)} className={value == null ? 'selected' : undefined}>
          All
        </a>
      </li>
      <li>
        <a
          onClick={() => onChange('active')}
          className={value === 'active' ? 'selected' : undefined}>
          Active
        </a>
      </li>
      <li>
        <a
          onClick={() => onChange('completed')}
          className={value === 'completed' ? 'selected' : undefined}>
          Completed
        </a>
      </li>
    </ul>
  );
};
