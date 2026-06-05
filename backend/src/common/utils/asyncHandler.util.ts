import type {
 Request,
 Response,
 NextFunction,
 RequestHandler,

} from "express"
import type { ParamsDictionary } from "express-serve-static-core"
import type { ParsedQs } from "qs"

type AsyncHandler<
 P = ParamsDictionary,
 ResBody = any,
 ReqBody = any,
 ReqQuery = ParsedQs
> = (
 req: Request<P, ResBody, ReqBody, ReqQuery>,
 res: Response<ResBody>,
 next: NextFunction
) => Promise<any>

export const asyncHandler = <
 P = ParamsDictionary,
 ResBody = any,
 ReqBody = any,
 ReqQuery = ParsedQs
>(
 fn: AsyncHandler<P, ResBody, ReqBody, ReqQuery>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
 return (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
 }
}