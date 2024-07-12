import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent
) => NextResponse | Promise<NextResponse>;

export function chain(middlewares: CustomMiddleware[], index = 0): CustomMiddleware {
  const currentMiddleware = middlewares[index];

  if (currentMiddleware) {
    const next = chain(middlewares, index + 1);
    return async (request: NextRequest, event: NextFetchEvent): Promise<NextResponse> => {
      const response = await currentMiddleware(request, event);
      return response ?? next(request, event);
    };
  }

  return (request: NextRequest, event: NextFetchEvent): NextResponse => {
    return NextResponse.next();
  };
}
