export class CreateBillingDto {
    readonly amountPaid: number;
    readonly totalAmount: number;
    readonly discount?: number;
    readonly discountCoupon?: string;
    readonly methodOfPayment: string;
    readonly transactionStatus: string;
    readonly isVerified: boolean;
    readonly patientID: string;
    readonly doctorID: string;
    readonly appointmentID: string;
  }
  