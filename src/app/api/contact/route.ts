import { NextRequest, NextResponse } from "next/server";

import { MAX_CONTACT_REQUEST_BYTES } from "@/lib/intake/normalize";
import { handleContactRequestText } from "@/lib/intake/service";

export async function POST(request: NextRequest) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_CONTACT_REQUEST_BYTES) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const result = await handleContactRequestText(await request.text());
  return NextResponse.json(result.body, { status: result.status });
}
