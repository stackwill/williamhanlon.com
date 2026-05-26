type Env = {
  readonly CARD_PHONE_NUMBER?: string;
};

type PagesContext = {
  readonly env: Env;
};

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, max-age=0",
};

export const onRequestGet = ({ env }: PagesContext) => {
  const phone = env.CARD_PHONE_NUMBER?.trim();

  if (!phone) {
    return Response.json({ available: false }, { headers: jsonHeaders });
  }

  return Response.json({ available: true, phone }, { headers: jsonHeaders });
};
