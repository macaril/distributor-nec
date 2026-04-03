import { supabase } from "@/src/lib/supabase";

export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  desc: string;
  stock: number;
  weight?: string;
  productCode?: string;
  fullDescription?: string;
}

interface ProductRow {
  id: number;
  name: string;
  category: string;
  image_url?: string;
  image?: string;
  description?: string;
  desc?: string;
  stock: number;
  weight?: string;
  productCode?: string;
  productcode?: string;
  fullDescription?: string;
  fulldescription?: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const NEWS_STORAGE_KEY = "nec-distributor-news";

const defaultNews: NewsArticle[] = [
  {
    id: 1,
    title: "Manfaat Hybrid PABX untuk Efisiensi",
    date: "20 Jan 2024",
    excerpt: "Mengapa kantor modern harus beralih ke sistem hybrid...",
    content: "Hybrid PABX dapat menggabungkan telepon analog dan IP secara bersamaan, membuat proses migrasi menjadi lebih mudah dan hemat biaya.",
  },
  {
    id: 2,
    title: "Cara Merawat Perangkat NEC Agar Awet",
    date: "15 Jan 2024",
    excerpt: "Tips maintenance sederhana yang bisa dilakukan sendiri...",
    content: "Bersihkan terminal secara berkala, gunakan stabilizer saat listrik tidak stabil, dan lakukan pengecekan kabel secara rutin untuk menjaga performa perangkat NEC.",
  },
];

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

function isClient() {
  return typeof window !== "undefined";
}

export async function uploadToCloudinary(file: File): Promise<string> {
  if (!cloudName || !cloudinaryUploadPreset) {
    throw new Error("Cloudinary config belum lengkap. Pastikan NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME dan NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET tersedia.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryUploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Gagal mengunggah gambar ke Cloudinary.");
  }

  return data.secure_url;
}

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    image: row.image_url ?? row.image ?? "",
    desc: row.description ?? row.desc ?? "",
    stock: row.stock,
    weight: row.weight,
    productCode: row.productCode ?? row.productcode,
    fullDescription: row.fullDescription ?? row.fulldescription,
  };
}

function parseSupabaseError(error: unknown): string {
  if (!error) return "Unknown error";
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null) {
    return (error as { message?: string }).message ?? JSON.stringify(error);
  }
  return String(error);
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (error) throw error;
    return (data as ProductRow[]).map(mapProductRow);
  } catch (error) {
    console.warn("getProducts supabase failed", error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error) {
      if (error.details?.includes("No rows")) return null;
      throw error;
    }
    return data ? mapProductRow(data as ProductRow) : null;
  } catch (error) {
    console.warn("getProductById supabase failed", error);
    return null;
  }
}

export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  const insertData = {
    name: product.name,
    category: product.category,
    image_url: product.image,
    description: product.desc,
    stock: product.stock,
    weight: product.weight,
    productcode: product.productCode,
    fulldescription: product.fullDescription,
  };

  const { data, error } = await supabase.from("products").insert(insertData).select().single();
  if (error) throw new Error(parseSupabaseError(error));
  return mapProductRow(data as ProductRow);
}

export async function updateProduct(id: number, product: Partial<Omit<Product, "id">>): Promise<Product> {
  const updateData = {
    name: product.name,
    category: product.category,
    image_url: product.image,
    description: product.desc,
    stock: product.stock,
    weight: product.weight,
    productcode: product.productCode,
    fulldescription: product.fullDescription,
  };

  const { data, error } = await supabase.from("products").update(updateData).eq("id", id).select().single();
  if (error) throw error;
  return mapProductRow(data as ProductRow);
}

export async function deleteProduct(id: number): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function getNews(): Promise<NewsArticle[]> {
  try {
    const { data, error } = await supabase.from("news").select("*").order("id", { ascending: false });
    if (error) throw error;
    return (data as NewsArticle[]) ?? [];
  } catch (error) {
    console.warn("getNews supabase failed", error);
    return defaultNews;
  }
}

export async function createNews(news: Omit<NewsArticle, "id">): Promise<NewsArticle> {
  const { data, error } = await supabase.from("news").insert(news).select().single();
  if (error) throw new Error(parseSupabaseError(error));
  return data as NewsArticle;
}

export async function deleteNews(id: number): Promise<void> {
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw error;
}

export function getStoredNews(): NewsArticle[] {
  if (!isClient()) return defaultNews;

  const stored = window.localStorage.getItem(NEWS_STORAGE_KEY);
  if (!stored) return defaultNews;

  try {
    const parsed = JSON.parse(stored) as NewsArticle[];
    return Array.isArray(parsed) ? parsed : defaultNews;
  } catch {
    return defaultNews;
  }
}

export function saveStoredNews(news: NewsArticle[]) {
  if (!isClient()) return;
  window.localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
}
