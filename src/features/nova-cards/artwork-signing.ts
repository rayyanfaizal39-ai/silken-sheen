/**
 * Lifetime of an owner-only nova-artwork signed URL.
 * Public visitors never receive these; they load `/card/c/{publicId}/art`,
 * which re-checks sharing on every request. Previously issued signed URLs
 * remain fetchable from storage until this TTL elapses.
 */
export const NOVA_ARTWORK_SIGNED_URL_SECONDS = 60 * 60;
