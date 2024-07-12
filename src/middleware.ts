import { chain } from './middleware/chain';import authMiddleware from './middleware/authMiddleware';
import { i18nMiddleware } from './middleware/i18nMiddleware';

export default chain([authMiddleware, i18nMiddleware]);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

