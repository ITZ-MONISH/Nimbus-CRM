import { InputHTMLAttributes, forwardRef, useId } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, id, className, ...props }, ref) => {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  return (
    <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-2 select-none">
      <input
        ref={ref}
        type="checkbox"
        id={checkboxId}
        className="h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-2 focus:ring-brand-400 dark:border-ink-600 dark:bg-ink-800"
        {...props}
      />
      <span className="text-sm text-ink-600 dark:text-ink-300">{label}</span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
