import { cookies } from "next/headers";
import type { Locale } from "@/i18n";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale");
  
  if (localeCookie?.value && ["en", "pt-BR", "es"].includes(localeCookie.value)) {
    return localeCookie.value as Locale;
  }
  
  return "en";
}
