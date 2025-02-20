import { ReactNode } from "react";


export default async function VendorDashboardSettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
        {children}
    </div>
  );
}