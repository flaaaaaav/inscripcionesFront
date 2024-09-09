// src/global.d.ts
export {};

declare global {
  interface Window {
    cloudinary: any; // Puedes definir 'any' o el tipo más específico si lo prefieres
  }
}
