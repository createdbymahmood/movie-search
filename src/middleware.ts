export {default} from 'next-auth/middleware'

export const config = {matcher: ['/', '/bookmarks', '/details/:path*']}
