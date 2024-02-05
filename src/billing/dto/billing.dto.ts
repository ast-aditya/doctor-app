import { IsString, IsNumber,IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";


export type BillingDTO = HydratedDocument<CreateBillingDto>

export class CreateBillingDto {
    @ApiProperty()
    @IsNumber()
    readonly amountPaid: number;
    @ApiProperty()
    @IsNumber()
    readonly totalAmount: number;
    @ApiProperty()
    @IsNumber()
    readonly discount?: number;
    @ApiProperty()
    @IsString()
    readonly discountCoupon?: string;
    @ApiProperty()
    @IsString()
    readonly methodOfPayment: string;
    @ApiProperty()
    @IsString()
    readonly transactionStatus: string;
    @ApiProperty()
    @IsBoolean()
    readonly isVerified: boolean;
    @ApiProperty()
    @IsString()
    readonly patientID: string;
    @ApiProperty()
    @IsString()
    readonly doctorID: string;
    @ApiProperty()
    @IsString()
    readonly appointmentID: string;
  }
  