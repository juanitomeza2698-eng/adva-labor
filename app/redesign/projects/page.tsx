import { ProjectsPage } from "@/redesign/Projects";
import { Shell } from "@/redesign/Shell";
export const metadata = { title: "Fieldwork & Projects" };
export default function Page() {
  return (
    <Shell active="Projects">
      <ProjectsPage />
    </Shell>
  );
}
