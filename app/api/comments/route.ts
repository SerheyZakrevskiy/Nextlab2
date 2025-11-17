// app/api/comments/route.ts
import { NextRequest, NextResponse } from "next/server";

type Comment = {
  id: number;
  comment: string;
};

let comments: Comment[] = [
  { id: 1, comment: "First comment" },
  { id: 2, comment: "Second comment" },
];

// GET /api/comments – повертає список
export async function GET() {
  return NextResponse.json(comments, { status: 200 });
}

// POST /api/comments – створює новий
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.comment || typeof body.comment !== "string") {
    return NextResponse.json(
      { error: "Field 'comment' is required" },
      { status: 400 }
    );
  }

  const newComment: Comment = {
    id: comments.length ? comments[comments.length - 1].id + 1 : 1,
    comment: body.comment,
  };

  comments.push(newComment);

  return NextResponse.json(newComment, { status: 201 });
}
