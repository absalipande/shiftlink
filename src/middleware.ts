import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type UserType = "professional" | "facility";

function parseSessionCookie(request: NextRequest): { type: UserType } | null {
  const raw = request.cookies.get("shiftlink_session")?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { type?: string };
    if (parsed.type === "professional" || parsed.type === "facility") {
      return { type: parsed.type };
    }
    return null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = parseSessionCookie(request);
  const isAuthed = Boolean(session);

  if (pathname.startsWith("/board")) {
    if (!isAuthed) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (session?.type !== "professional") {
      return NextResponse.redirect(new URL("/dashboard/facility", request.url));
    }
  }

  if (pathname.startsWith("/dashboard/facility")) {
    if (!isAuthed) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (session?.type !== "facility") {
      return NextResponse.redirect(new URL("/board", request.url));
    }
  }

  if (pathname.startsWith("/login") && isAuthed) {
    const target = session?.type === "facility" ? "/dashboard/facility" : "/board";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/board/:path*", "/dashboard/facility/:path*", "/login"],
};
