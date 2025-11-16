export async function GET() {
  console.log("SERVER API_KEY:", process.env.API_KEY);
  console.log("SERVER NEXT_PUBLIC_SITE_NAME:", process.env.NEXT_PUBLIC_SITE_NAME);

  return Response.json({
    apiKey: process.env.API_KEY,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME
  });
}
