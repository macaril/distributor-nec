// src/app/admin/products/actions.ts
"use server";

import { supabase } from "@/src/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: {
  name: string;
  category: string;
  image_url: string;
  description: string;
}) {
  const { data, error } = await supabase
    .from("products") // Pastikan nama tabel di Supabase adalah 'products'
    .insert([
      {
        name: formData.name,
        category: formData.category,
        image_url: formData.image_url,
        description: formData.description,
      },
    ]);

  if (error) {
    throw new Error(error.message);
  }

  // Membersihkan cache agar daftar produk di web langsung terupdate
  revalidatePath("/admin/products");
  revalidatePath("/products");
  
  return { success: true };
}