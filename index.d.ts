type EnvironmentType = number

export type AllowedCardNetworkType = 'AMEX' | 'DISCOVER' | 'JCB' | 'MASTERCARD' | 'VISA'

export type AllowedCardAuthMethodsType = 'PAN_ONLY' | 'CRYPTOGRAM_3DS'

export type tokenizationSpecificationType = 'PAYMENT_GATEWAY' | 'DIRECT'

export interface RequestDataType {
  cardPaymentMethod: {
    tokenizationSpecification: {
      type: tokenizationSpecificationType
      /** only with type: PAYMENT_GATEWAY */
      gateway?: string
      /** only with type: PAYMENT_GATEWAY */
      gatewayMerchantId?: string
      /** only with gateway: stripe */
      stripe?: {
        publishableKey: string
        version: string
      }
      /** only with type: DIRECT */
      publicKey?: string
    }
    allowedCardNetworks: AllowedCardNetworkType[]
    allowedCardAuthMethods: AllowedCardAuthMethodsType[]
  }
  transaction: {
    totalPrice: string
    totalPriceStatus: string
    currencyCode: string
    countryCode: string
  }
  merchantName: string
}

export interface AddressType {
  name?: string;
  postalCode?: string;
  countryCode?: string;
  phoneNumber?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  locality?: string;
  administrativeArea?: string;
  sortingCode?: string;
}

export interface AssuranceDetailsSpecificationsType {
  accountVerified: boolean;
  cardHolderAuthenticated: boolean;
}

export interface PaymentMethodTokenizationDataType {
  type: string;
  token?: string;
}

export interface CardInfoType {
  assuranceDetails: AssuranceDetailsSpecificationsType;
  cardDetails: string;
  cardNetwork: string;
  billingAddress?: AddressType;
}

export interface PaymentMethodDataType {
  type: string;
  description: string;
  info: CardInfoType;
  tokenizationData: PaymentMethodTokenizationDataType;
}

declare class GooglePay {
  static ENVIRONMENT_TEST: EnvironmentType
  static ENVIRONMENT_PRODUCTION: EnvironmentType
  static setEnvironment: (environment: EnvironmentType) => void
  static isReadyToPay: (
    allowedCardNetworks: AllowedCardNetworkType[],
    allowedCardAuthMethods: AllowedCardAuthMethodsType[]
  ) => Promise<boolean>
  static requestPayment: (requestData: RequestDataType) => Promise<PaymentMethodDataType>
}

export { GooglePay }
