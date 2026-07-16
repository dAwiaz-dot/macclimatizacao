export const adminUsername = process.env.ADMIN_USERNAME ?? "";
export const adminPassword = process.env.ADMIN_PASSWORD ?? "";
export const sessionSecret = process.env.ADMIN_SESSION_SECRET ?? "";
export const blobToken = process.env.BLOB_READ_WRITE_TOKEN ?? "";

export const isAuthConfigured = Boolean(
  adminUsername && adminPassword && sessionSecret
);

export const isBlobConfigured = Boolean(blobToken);
