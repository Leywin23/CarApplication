export function getErrorMessage(err: any): string {
  const data = err?.response?.data;

  if (!data) return err?.message ?? "Unknown error";

  if (typeof data === "object") {
    if (data.errors && typeof data.errors === "object") {
      const msgs: string[] = [];
      for (const k of Object.keys(data.errors)) {
        const arr = data.errors[k];
        if (Array.isArray(arr)) msgs.push(...arr);
      }
      if (msgs.length) return msgs.join(" | ");
    }
    if (typeof data.title === "string") return data.title;
    if (typeof data.detail === "string") return data.detail;
    return "Request failed";
  }

  if (typeof data === "string") return data;

  return "Request failed";
}
