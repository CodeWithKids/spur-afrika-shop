const PAYHERO_API = "https://backend.payhero.co.ke/api/v2";

export type PayHeroConfig = {
  authorizationHeader: string;
  channelId: number;
  callbackUrl: string;
};

export function getPayHeroConfig(siteUrl?: string): PayHeroConfig {
  const basic = process.env.PAYHERO_BASIC_AUTH?.trim();
  const username = process.env.PAYHERO_API_USERNAME?.trim();
  const password = process.env.PAYHERO_API_PASSWORD?.trim();
  const channelRaw = process.env.PAYHERO_CHANNEL_ID?.trim();
  const baseUrl = (siteUrl ?? process.env.SITE_URL ?? "").replace(/\/$/, "");

  let authorizationHeader = "";
  if (basic) {
    authorizationHeader = basic.startsWith("Basic ") ? basic : `Basic ${basic}`;
  } else if (username && password) {
    const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");
    authorizationHeader = `Basic ${token}`;
  }

  if (!authorizationHeader) {
    throw new Error(
      "PayHero is not configured. Set PAYHERO_BASIC_AUTH or PAYHERO_API_USERNAME and PAYHERO_API_PASSWORD.",
    );
  }

  const channelId = channelRaw ? Number(channelRaw) : NaN;
  if (!Number.isFinite(channelId) || channelId <= 0) {
    throw new Error("PayHero channel is not configured. Set PAYHERO_CHANNEL_ID.");
  }

  if (!baseUrl) {
    throw new Error("SITE_URL is required to build the PayHero callback_url.");
  }

  return {
    authorizationHeader,
    channelId,
    callbackUrl: `${baseUrl}/api/public/payments/payhero/webhook`,
  };
}

export type InitiateMpesaResult = {
  success: boolean;
  status?: string;
  reference?: string;
  checkoutRequestId?: string;
  message?: string;
};

export async function initiateMpesaStkPush(input: {
  amount: number;
  phoneNumber: string;
  externalReference: string;
  customerName: string;
  callbackUrl: string;
}): Promise<InitiateMpesaResult> {
  const config = getPayHeroConfig();

  const amount = Math.round(input.amount);
  if (amount < 1) {
    throw new Error("Payment amount must be at least 1 KES.");
  }

  const response = await fetch(`${PAYHERO_API}/payments`, {
    method: "POST",
    headers: {
      Authorization: config.authorizationHeader,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      amount,
      phone_number: input.phoneNumber,
      channel_id: config.channelId,
      provider: "m-pesa",
      external_reference: input.externalReference,
      customer_name: input.customerName,
      callback_url: input.callbackUrl,
    }),
  });

  const body = (await response.json().catch(() => ({}))) as Record<string, unknown>;

  if (!response.ok) {
    const raw =
      (typeof body.message === "string" && body.message) ||
      (typeof body.error === "string" && body.error) ||
      `PayHero request failed (${response.status})`;
    const message =
      response.status === 401 || response.status === 403
        ? "The shop's payment credentials were rejected by PayHero. Please try again shortly, or contact us and we'll take your order directly."
        : raw;
    return { success: false, message };
  }

  return {
    success: Boolean(body.success ?? true),
    status: typeof body.status === "string" ? body.status : undefined,
    reference: typeof body.reference === "string" ? body.reference : undefined,
    checkoutRequestId:
      typeof body.CheckoutRequestID === "string"
        ? body.CheckoutRequestID
        : typeof body.checkoutRequestID === "string"
          ? body.checkoutRequestID
          : undefined,
    message: typeof body.message === "string" ? body.message : undefined,
  };
}

export async function getPayHeroTransactionStatus(reference: string) {
  const config = getPayHeroConfig();
  const url = new URL(`${PAYHERO_API}/transaction-status`);
  url.searchParams.set("reference", reference);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: config.authorizationHeader,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
