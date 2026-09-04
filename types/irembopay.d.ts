declare module '@irembo/irembopay-node-sdk' {
  interface InvoiceApi {
    createInvoice(data: unknown): Promise<unknown>
  }

  export default class IremboPay {
    invoice: InvoiceApi

    constructor(secretKey?: string, environment?: string)
  }
}
