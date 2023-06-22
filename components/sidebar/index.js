import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Navbar() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  const navItems = {
    "/": {
      name: "Home",
    },
    "/about": {
      name: "About",
    },
    "/blog": {
      name: "Blog",
    },
    "/create-post": {
      name: "Create post",
      reqAuth: true,
    },
    "/login": {
      name: "Login",
      reqAuth: false,
    },
    "/logout": {
      name: "Logout",
      reqAuth: true,
      onClick: async () => {
        await supabaseClient.auth.signOut();
        router.push("/login");
      },
    },
  };

  return (
    <aside>
      <div>
        <nav id="nav">
          <div className="flex justify-evenly md:justify-end">
            {Object.entries(navItems).map(([path, { name, reqAuth, onClick }]) => {
              const isActive = path === pathname;
              const linkClasses = classNames("md:mr-4 lg:mr-8 hover:text-accentGreen", {
                "text-lightColor": isActive,
                "text-gray-500": !isActive,
              });

              if ((reqAuth && !user) || (path === "/login" && user)) {
                return null;
              }

              if (path === "/logout") {
                return (
                  <button key={path} onClick={onClick}>
                    Sign out
                  </button>
                );
              }
              return (
                <Link key={path} href={path}>
                  <p className={linkClasses}>{name}</p>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
