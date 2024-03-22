import type { JobEntry } from "../scripts/type.d.ts"

export const distinct = <T,>(xs: T[]) => Array.from(new Set(xs))
export const filter = (
	xs: string | string[],
	key: keyof JobEntry,
	data: JobEntry[],
): JobEntry[] =>
	xs.length > 0 ? data.filter((item) => xs.includes(item[key] as string)) : data
