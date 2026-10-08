import { ServicesPage } from "@/redesign/Services";
import { Shell } from "@/redesign/Shell";
export const metadata = { title: "Services" };
export default function Page() {
  return (
    <Shell active="Services">
      <ServicesPage />
    </Shell>
  );
}
