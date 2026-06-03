import { useEffect, useState } from "react";
import { loadNetworkData } from "@/lib/excel";
import type { NetworkData } from "@/types";

export function useNetworkData() {
  const [data, setData] = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    loadNetworkData()
      .then((d) => alive && setData(d))
      .catch((e) => alive && setError(String(e?.message ?? e)))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return { data, loading, error };
}
