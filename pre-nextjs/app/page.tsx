import { Button } from "@/components/ui/button"
import { tv } from 'tailwind-variants';

export default function Home() {
  const twStayles = tv({
    variants: {
      style:{
        text01:'text-cyan-400',
      },
    },
  });

  return (
    <>
      <div className={twStayles({style:'text01'})}>
        first_commit
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  );
}
