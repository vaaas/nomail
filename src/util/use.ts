const SINGLETONS: Map<any, any> = new Map();

export function use<T>(provider: () => T): T {
  if (!SINGLETONS.has(provider)) SINGLETONS.set(provider, provider());
  return SINGLETONS.get(provider);
}

export function provide<T>(provider: () => T, instance: T): void {
  SINGLETONS.set(provider, instance);
}

export function clear(): void {
  SINGLETONS.clear();
}
