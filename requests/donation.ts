import config from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";
import { Donation } from "utils/types";

/**
 * Send request to server to create a Stripe PaymentIntent, and send an email notification
 * of the transaction receipt.
 *
 * @param {number} amount - Amount (in US cents) to be collected by the PaymentIntent
 * @param {string} email - Email address to send the transaction receipt to
 * @param {string} stripeAccount - stripe account we are sending payment to
 * @returns {Promise<string>} - client_secret of the PaymentIntent created
 */
export const createPaymentIntent = async (
  amount: number,
  email: string,
  stripeAccount: string
): Promise<string> =>
  fetchRequestWithPayloadResponse<string>(config.apis.createPaymentIntent, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount, email, stripeAccount })
  });

export const logDonation = async ({
  name,
  email,
  amount,
  nonprofitId
}: Omit<Donation, "timestamp">): Promise<boolean> =>
  fetchRequestWithPayloadResponse<boolean>(config.apis.logDonation, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, amount, nonprofitId })
  });
