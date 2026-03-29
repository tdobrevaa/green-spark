import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon: LucideIcon;
  variant?: 'default' | 'green' | 'outline' | 'gradient';
  className?: string;
  iconClassName?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon: Icon,
  variant = 'default',
  className,
  iconClassName,
}) => {
  const variants = {
    default: 'bg-white shadow-card',
    green: 'bg-forest text-white',
    outline: 'bg-white border-2 border-sage',
    gradient: 'gradient-forest text-white',
  };

  const iconVariants = {
    default: 'bg-sage/50 text-forest',
    green: 'bg-white/20 text-white',
    outline: 'bg-sage/30 text-forest',
    gradient: 'bg-white/20 text-white',
  };

  return (
    <div
      className={cn(
        'rounded-3xl p-4 flex flex-col items-center justify-center text-center transition-all duration-200',
        variants[variant],
        className
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-2xl flex items-center justify-center mb-3',
          iconVariants[variant],
          iconClassName
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-2xl font-bold">{value}</span>
      <span
        className={cn(
          'text-xs font-medium mt-1',
          variant === 'default' || variant === 'outline'
            ? 'text-muted-foreground'
            : 'text-white/80'
        )}
      >
        {label}
      </span>
    </div>
  );
};
