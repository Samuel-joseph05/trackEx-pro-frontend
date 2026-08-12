"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Receipt,
  PlusCircle,
  LogOut,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Invalid user data:", error);
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMobileMenuOpen(false);

    router.push("/login");
  };

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
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
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Desktop / Main Navbar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Track<span className="text-indigo-500">Ex</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            {navItems
              .filter((item) => {
                if (
                  item.href === "/dashboard" ||
                  item.href === "/expenses" ||
                  item.href === "/expenseForm"
                ) {
                  return user;
                }

                return true;
              })
              .map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                        : "text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={17} />
                    {item.name}
                  </Link>
                );
              })}
          </div>

          {/* Right Side */}
          <div className="hidden items-center gap-4 md:flex ">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <button
                  onClick={handleLogout}
                  title={`Logout ${user.name}`}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={25} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={25} />
              </motion.div>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-slate-800 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems
                  .filter((item) => {
                    if (
                      item.href === "/dashboard" ||
                      item.href === "/expenses" ||
                      item.href === "/expenseForm"
                    ) {
                      return user;
                    }

                    return true;
                  })
                  .map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                          active
                            ? "bg-indigo-600 text-white"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon size={19} />
                        {item.name}
                      </Link>
                    );
                  })}

                <div className="my-2 border-t border-slate-800" />

                {!user ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 py-3 text-slate-300 hover:bg-white/10 hover:text-white"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl bg-indigo-600 px-4 py-3 mb-4 text-center font-medium text-white hover:bg-indigo-700"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    {/* User Info */}
                    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-white">{user.name}</p>

                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                      <LogOut size={19} />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
