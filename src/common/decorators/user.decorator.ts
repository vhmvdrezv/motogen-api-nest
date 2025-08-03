import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IUser } from "../interfaces/user.interface";
import { Request } from "express";

export const User = createParamDecorator(
    (data: keyof IUser | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request & { user: IUser}>();
        const user = request.user;
        return data ? user?.[data] : user
    }
)