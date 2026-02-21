"use client";

import React, { forwardRef } from "react";
import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";

type To = string;

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: To;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, ...props }, ref) => {
    return (
      <NextLink ref={ref} href={to} {...props}>
        {children}
      </NextLink>
    );
  },
);

Link.displayName = "Link";

export interface NavigateOptions {
  replace?: boolean;
}

export const useNavigate = () => {
  const router = useRouter();

  return (to: To, options?: NavigateOptions) => {
    if (options?.replace) {
      router.replace(to);
      return;
    }
    router.push(to);
  };
};

export const useParams = <T extends Record<string, string>>() =>
  useNextParams() as T;

export const useSearchParams = () => {
  const safeSearchParams =
    typeof window === "undefined"
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);
  return [safeSearchParams, () => undefined] as const;
};

export interface LocationLike {
  pathname: string;
  search: string;
  hash: string;
}

export const useLocation = (): LocationLike => {
  const pathname = usePathname() ?? "/";

  return {
    pathname,
    search: "",
    hash: "",
  };
};

export interface NavLinkRenderProps {
  isActive: boolean;
  isPending: boolean;
}

type NavClassName =
  | string
  | ((props: NavLinkRenderProps) => string | undefined);

export interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> {
  to: To;
  className?: NavClassName;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, className, children, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === to;
    const resolvedClassName =
      typeof className === "function"
        ? className({ isActive, isPending: false })
        : className;

    return (
      <NextLink ref={ref} href={to} className={resolvedClassName} {...props}>
        {children}
      </NextLink>
    );
  },
);

NavLink.displayName = "NavLink";
