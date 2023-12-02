export class MaxMap<K extends string> extends Map<K, number> {
  constructor() {
    super();
  }

  public set(key: K, value: number) {
    const current = this.get(key);

    if (current === undefined || value > current) {
      super.set(key, value);
    }

    return this;
  }

  public setAll(values: Record<K, number>) {
    Object.entries(values).forEach(([key, value]: [K, number]) => {
      this.set(key, value);
    });
    return this;
  }
}