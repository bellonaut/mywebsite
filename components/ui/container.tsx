import { clsx } from 'clsx';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function Container({ className, children }: Props) {
  return <div className={clsx('mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12', className)}>{children}</div>;
}
