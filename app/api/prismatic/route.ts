import jsonwebtoken from 'jsonwebtoken';

export async function GET(request: Request) {
  const currentTime = Math.floor(Date.now() / 1000);
  const expires = currentTime + 60 * 60 * 24 * 7;
  const token = jsonwebtoken.sign(
    {
      exp: expires,
      iat: currentTime,
      sub: 'unfurl_customer1_app1',
      external_id: 'unfurl_customer1_app1',
      name: 'App 1 (Customer 1)',
      organization: process.env.PRISMATIC_ORGANIZATION_ID,
      customer: process.env.PRISMATIC_CUSTOMER_ID
    },
    process.env.PRISMATIC_PRIVATE_KEY!,
    {
      algorithm: 'RS256'
    }
  );
  return Response.json({ token });
}
