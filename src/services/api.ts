import axios, { AxiosError, type AxiosProgressEvent } from "axios";
import type { ApiErrorBody } from "@/types/api";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL,
  // timeout: 120_000,
});

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export function parseApiError(error: unknown): string {
  if (error instanceof ApiRequestError) return error.message;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorBody>;
    const detail = axiosError.response?.data?.detail;

    if (typeof detail === "string") return detail;

    if (Array.isArray(detail) && detail.length > 0) {
      return detail.map((item) => item.msg).join(", ");
    }

    if (axiosError.code === "ECONNABORTED") {
      return "Request timed out. The server may still be processing your resume.";
    }

    if (!axiosError.response) {
      return "Unable to reach the server. Check that the API is running.";
    }

    return `Request failed with status ${axiosError.response.status}.`;
  }

  if (error instanceof Error) return error.message;

  return "An unexpected error occurred.";
}

export function uploadProgressPercent(
  event: AxiosProgressEvent,
): number | undefined {
  const total = event.total ?? event.loaded;
  if (!total) return undefined;
  return Math.min(99, Math.round((event.loaded / total) * 100));
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
