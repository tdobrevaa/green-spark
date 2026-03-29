import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface ImpactRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext?: string;
  progress?: number;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export const ImpactRow: React.FC<ImpactRowProps> = ({
  icon: Icon,
  label,
  value,
  subtext,
  progress,
  variant = 'default',
  className,
}) => {
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3 py-3', className)}>
        <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-forest" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {label}
            </span>
            <span className="text-sm font-bold text-forest">{value}</span>
          </div>
          {progress !== undefined && (
            <div className="mt-2 h-1.5 bg-sage rounded-full overflow-hidden">
              <div
                className="h-full bg-forest rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={cn('bg-white rounded-3xl p-5 shadow-card', className)}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sage/50 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-forest" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <p className="text-2xl font-bold text-forest mt-1">{value}</p>
            {subtext && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{subtext}</p>}
            {progress !== undefined && (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-medium text-forest">GOAL: 3.0KG</span>
                  <span className="font-semibold text-forest">{progress}%</span>
                </div>
                <div className="h-2.5 bg-sage rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forest rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-between py-3', className)}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-forest" />
        </div>
        <div>
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <p className="text-lg font-bold text-forest">{value}</p>
        </div>
      </div>
      {progress !== undefined && (
        <div className="w-24 h-2 bg-sage rounded-full overflow-hidden">
          <div
            className="h-full bg-forest rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
