"use client"; // Konieczne w Next.js App Router dla dynamicznych komponentów
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Link href="/auth/signUp">Go to Sign Up</Link>
      <Link href="/auth/login">Login</Link>
    </div>
  );
}
