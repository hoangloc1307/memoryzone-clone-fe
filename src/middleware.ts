import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { protectedPaths, rejectedPaths } from '~/constants/path'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const protects = protectedPaths
  const rejects = rejectedPaths
  const isPathMatch = [...protects, ...rejects].some((path) => pathname.startsWith(path))
  if (isPathMatch) {
    const token = await getToken({ req })
    if (!token && protects.includes(pathname)) {
      const url = new URL(`/login`, req.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
    if ((token && rejects.includes(pathname)) || (pathname.startsWith('/admin') && token?.role !== 'ADMIN')) {
      const url = new URL(`/`, req.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/me', '/cart', '/login', '/register'],
}
