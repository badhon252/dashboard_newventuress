import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

function SettingsNavbar() {
    const menuItems = [
        {
          title: "Personal Information",
          href: "/settings/personal-information",
        },
        {
          title: "Change Password",
          href: "/settings/change-password",
        },
        {
          title: "Terms & conditions",
          href: "/settings/terms-conditions",
        },
        {
          title: "Privacy Policy",
          href: "/settings/privacy-policy",
        },
        {
          title: "About Us",
          href: "/settings/about-us",
        },
    ]

  return (
    <div className="w-full bg-white p-[8px] rounded-[12px]">
        <div className="flex flex-col gap-[30px] p-4">
            {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                <Card className="flex items-center justify-between p-4 transition-colors border border-[#9E9E9E] hover:bg-[#E6EEF6] bg-[#F9FAFD]">
                    <span className="text-[18px] leading-[21.6px] font-medium text-gradient">{item.title}</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Card>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SettingsNavbar