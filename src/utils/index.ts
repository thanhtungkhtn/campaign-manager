export const uniqueId = (): string => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

export const getUniqueId = (prefix: string): string => `${prefix}-${uniqueId()}`;
