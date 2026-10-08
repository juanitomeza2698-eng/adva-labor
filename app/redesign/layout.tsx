import "@/redesign/styles.css";
export const metadata = {
  title: {
    default: "ADVA Labor — Site Development in Colorado",
    template: "%s | ADVA Labor",
  },
  description:
    "ADVA Labor website design preview: earthwork, demolition, underground utilities, and environmental services in Colorado.",
  robots: { index: false, follow: false },
  icons: { icon: "/redesign/favicon.svg" },
};
export default function RedesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
