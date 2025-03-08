import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    /* Link */
    <Link href="https://www.google.com">
      <div>
      <Button>Click me</Button>
    </div>
    </Link>
  );
    
}