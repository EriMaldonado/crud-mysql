import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  try {
    const product = await prisma.product.findFirst({
      where: { id: id },
    });
    if (!product) {
      return new NextResponse(`product with ID ${id} not found.`, {
        status: 404,
      });
    }
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  try {
    const result = await prisma.product.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  const data = await request.json();
  const { name, description, price } = data;
  try {
    const result = await prisma.product.update({
      where: { id: id },
      data: {
        name,
        description,
        price: parseFloat(price),
      },
    });

    if (!result) {
      return new NextResponse(`Product with ID ${id} not found.`, {
        status: 404,
      });
    }
    return new NextResponse(
      JSON.stringify({ message: "Product updated successfully." }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
