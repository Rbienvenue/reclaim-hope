import IremboPay  from "@irembo/irembopay-node-sdk";
const iPay = new IremboPay(process.env.IPAY_SECRET_KEY,process.env.IPAY_ENVIRONMENT)

iPay.invoice.createInvoice({
  transactionId: "TST-100236",
  paymentAccountIdentifier: "07808652516",
  customer: {
    email: "user@email.com",
    phoneNumber: "0780000001",
    name: "Jixle Manzi",
  },
  paymentItems: [
    {
      unitAmount: 2000,
      quantity: 1,
      code: "PC-aaf751b73f",
    },
  ],
  description: "Invoice description",
  expiryAt: "2024-09-30T01:00:00+02:00",
  language: "EN",
}).then((data: any) => {
    console.log(data);
}).catch((error: any) => {
    console.log(error);
});