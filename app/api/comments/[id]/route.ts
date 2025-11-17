// app/api/comments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

type Comment = {
  id: number;
  comment: string;
};

// ВАЖЛИВО: використовуємо той самий масив, що й у /api/comments.
// У реальному проекті ти б працював з базою.
let comments: Comment[] = [
  { id: 1, comment: "First comment" },
  { id: 2, comment: "Second comment" },
];

// GET /api/comments/:id – отримати один
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const comment = comments.find((c) => c.id === id);

  if (!comment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(comment, { status: 200 });
}

// PATCH /api/comments/:id – часткове оновлення
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const idx = comments.findIndex((c) => c.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();

  if (body.comment && typeof body.comment !== "string") {
    return NextResponse.json(
      { error: "Field 'comment' must be a string" },
      { status: 400 }
    );
  }

  comments[idx] = {
    ...comments[idx],
    ...body,
  };

  return NextResponse.json(comments[idx], { status: 200 });
}

// DELETE /api/comments/:id – видалити
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const idx = comments.findIndex((c) => c.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const deleted = comments[idx];
  comments.splice(idx, 1);

  return NextResponse.json(deleted, { status: 200 });
}
