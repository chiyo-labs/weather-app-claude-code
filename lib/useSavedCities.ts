"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "weather-app-claude-code:saved-cities";

const EMPTY_SAVED_CITIES: string[] = [];

const listeners = new Set<() => void>();
let cache: string[] | null = null;

function readCities(): string[] {
  if (typeof window === "undefined") return EMPTY_SAVED_CITIES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SAVED_CITIES;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_SAVED_CITIES;
    const filtered = parsed.filter((item): item is string => typeof item === "string");
    return filtered.length === 0 ? EMPTY_SAVED_CITIES : filtered;
  } catch {
    return EMPTY_SAVED_CITIES;
  }
}

function getSnapshot(): string[] {
  if (cache === null) cache = readCities();
  return cache;
}

function getServerSnapshot(): string[] {
  return EMPTY_SAVED_CITIES;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit(next: string[]) {
  cache = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ストレージ容量超過などは無視
    }
  }
  listeners.forEach((l) => l());
}

export function useSavedCities() {
  const cities = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveCity = useCallback((city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;
    const current = getSnapshot();
    if (current.some((c) => c.toLowerCase() === trimmed.toLowerCase())) return;
    commit([...current, trimmed]);
  }, []);

  const removeCity = useCallback((city: string) => {
    commit(getSnapshot().filter((c) => c !== city));
  }, []);

  return { cities, saveCity, removeCity };
}
