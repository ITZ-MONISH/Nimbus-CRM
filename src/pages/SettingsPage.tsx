import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User as UserIcon, Mail, Building2, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useToastStore } from '@/store/toastStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function SettingsPage() {
  const { user, updateProfile } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const showToast = useToastStore((s) => s.showToast);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      company: user?.company ?? '',
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    updateProfile(values);
    reset(values);
    showToast('Profile updated', 'success', 'Your changes have been saved.');
  };

  const handleReset = () => {
    reset({ name: user?.name ?? '', email: user?.email ?? '', company: user?.company ?? '' });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-50">Settings</h2>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Manage your profile and workspace preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Input label="Full name" leftIcon={<UserIcon className="h-4 w-4" />} error={errors.name?.message} {...register('name')} />
            <Input label="Email address" type="email" leftIcon={<Mail className="h-4 w-4" />} error={errors.email?.message} {...register('email')} />
            <Input label="Company" leftIcon={<Building2 className="h-4 w-4" />} error={errors.company?.message} {...register('company')} />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={handleReset} disabled={!isDirty}>
                Reset
              </Button>
              <Button type="submit" disabled={!isDirty}>
                Save changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-ink-500 dark:text-ink-400">Choose how Nimbus CRM looks on this device.</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors',
                theme === 'light' ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10' : 'border-ink-100 dark:border-ink-800',
              )}
            >
              <Sun className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-ink-700 dark:text-ink-200">Light</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors',
                theme === 'dark' ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10' : 'border-ink-100 dark:border-ink-800',
              )}
            >
              <Moon className="h-5 w-5 text-brand-500" />
              <span className="text-sm font-medium text-ink-700 dark:text-ink-200">Dark</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
