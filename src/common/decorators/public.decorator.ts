import { SetMetadata } from "@nestjs/common";

export const Public = () => SetMetadata("is_Public" , true)