const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("silk_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data as T;
}

export const authApi = {
  signup: (name: string, email: string, password: string, role = "consumer", extra: any = {}) =>
    request<{ token: string; user: User }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role, ...extra }),
    }),

  login: (email: string, password: string) =>
    request<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getProfile: () => request<User>("/auth/profile"),

  updateProfile: (data: Partial<User>) =>
    request<{ user: User }>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  toggleWishlist: (sareeId: string) =>
    request<{ wishlist: string[]; added: boolean }>(`/auth/wishlist/${sareeId}`, {
      method: "POST",
    }),

  getWeavers: () => request<User[]>("/auth/weavers"),
  getFarmers: () => request<User[]>("/auth/farmers"),
};

export const sareesApi = {
  getAll: (params?: { search?: string; category?: string; minPrice?: number; maxPrice?: number; sortBy?: string }) => {
    const query = new URLSearchParams(
      Object.entries(params || {})
        .filter(([, v]) => v !== undefined && v !== "")
        .map(([k, v]) => [k, String(v)])
    ).toString();
    return request<{ total: number; sarees: any[]; categories: string[] }>(
      `/sarees${query ? `?${query}` : ""}`
    );
  },
  getById: (id: string) => request<{ saree: any; artisan: any }>(`/sarees/${id}`),
};

export const ordersApi = {
  place: (payload: { items: any[]; shippingAddress: any; paymentMethod?: string; notes?: string }) =>
    request<{ message: string; order: any }>("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getMyOrders: () => request<any[]>("/orders/my"),
  getById: (id: string) => request<any>(`/orders/${id}`),
  cancel: (id: string) => request<any>(`/orders/${id}/cancel`, { method: "PUT" }),
};

export const prelovedApi = {
  getAll: () => request<any[]>("/preloved"),
  submit: (listing: any) =>
    request<{ message: string; listing: any }>("/preloved", {
      method: "POST",
      body: JSON.stringify(listing),
    }),
  getMyListings: () => request<any[]>("/preloved/my"),
  delete: (id: string) => request<{ message: string }>(`/preloved/${id}`, { method: "DELETE" }),
};

export const artisansApi = {
  getAll: () => request<any[]>("/artisans"),
  getById: (id: string) => request<any>(`/artisans/${id}`),
};

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  businessName?: string;
  location?: string;
  specialization?: string;
  verified?: boolean;
  address?: { street: string; city: string; state: string; pincode: string };
  wishlist?: string[];
}

export interface ShippingAddress {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}