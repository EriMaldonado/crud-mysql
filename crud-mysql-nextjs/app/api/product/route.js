import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const product = await prisma.product.create({
      data: data,
    });
    return new NextResponse(JSON.stringify(product), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return new NextResponse(JSON.stringify({ data: products }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
