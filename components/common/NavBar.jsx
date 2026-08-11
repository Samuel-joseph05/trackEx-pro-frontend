"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  PlusCircle,
  BarChart3,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Navbar() {

  const pathname = usePathname();

  const menus = [

    {
        name:"Home",
        href:"/",
        icon: LayoutDashboard,
    }
    ,
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Expenses",
      href: "/expenses",
      icon: Receipt,
    },
    {
      name: "Add Expense",
      href: "/expenseForm",
      icon: PlusCircle,
    },
    // {
    //   name: "Analytics",
    //   href: "/analytics",
    //   icon: BarChart3,
    // },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

        <h1 className="text-2xl font-bold text-white">
          TrackEx
        </h1>

        <nav className="hidden items-center gap-3 md:flex">

          {menus.map((menu) => {

            const Icon = menu.icon;

            return (
              <Link key={menu.href} href={menu.href}>

                <Button
                  variant="ghost"
                  className={`gap-2 rounded-xl px-4 text-slate-300 transition-all

                  ${
                    pathname === menu.href
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-white/10 hover:text-white"
                  }`}
                >

                  <Icon size={18} />

                  {menu.name}

                </Button>

              </Link>
            );

          })}

        </nav>

        <Button
          variant="destructive"
          className="hidden md:flex"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>

      </div>

    </header>
  );
}