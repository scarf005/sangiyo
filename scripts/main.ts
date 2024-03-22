import { deepMerge } from "$std/collections/deep_merge.ts"
import { resolve } from "$std/path/resolve.ts"

import { crawlJobs, parseCrawlJobs } from "./crawl_jobs.ts"
import { fetchJobs } from "./fetch_jobs.ts"
import { parseJobs } from "./parse_jobs.ts"
import { Item, ItemDetail } from "./type.d.ts"

const key = Deno.env.get("API_KEY")
if (!key) throw new Error("API_KEY is not set")

const crawlJobDetails = async (jobs: Item[]) => {
	console.log(`crawling ${jobs.length} jobs`)
	const queries = await Promise.allSettled(
		jobs.map((x) =>
			crawlJobs({ id: x.채용번호 })
				.then((y) => [x.채용번호, parseCrawlJobs(y!)] as const)
				.catch((e) => {
					throw new Error(`could not crawl ${x.채용번호}`, { cause: e })
				})
		),
	)

	const errors = queries.filter((x) => x.status === "rejected")
	if (errors.length > 0) console.error(errors)

	const items = Object.fromEntries(
		queries
			.filter((x): x is PromiseFulfilledResult<[number, ItemDetail]> =>
				x.status === "fulfilled" && x.value[1] !== null
			)
			.map((x) => x.value),
	)
	return items
}

const jobsToMap = (jobs: Item[]): Record<string, Item> =>
	Object.fromEntries(jobs.map((x) => [x.채용번호, x] as const))

type GetOrCreateOption<T> = {
	name: string
	path: URL | string
	fn: () => Promise<T>
	serialize?: (x: T) => string
	deserialize?: (x: string) => T
}
export const getOrCreate = async <T>({
	name,
	path,
	fn,
	serialize = (x) => JSON.stringify(x, null, 2),
	deserialize = JSON.parse,
}: GetOrCreateOption<T>): Promise<T> => {
	try {
		const res = deserialize(await Deno.readTextFile(path))
		console.log(`${name}: loaded from cache`)
		return res
	} catch {
		console.log(`${name}: creating`)
		const res = await fn()
		await Deno.writeTextFile(path, serialize(res))
		return res
	}
}

const cachePaths = {
	xml: import.meta.dirname + "/response.xml",
	jobs: import.meta.dirname + "/jobs.json",
	details: import.meta.dirname + "/details.json",
	data: resolve(import.meta.dirname + "/../src/data.json"),
}

const cleanCaches = () =>
	Promise.allSettled(
		Object.values(cachePaths).map(async (x) => {
			console.log(`removing ${x}`)
			try {
				await Deno.remove(x)
			} catch {
				// ignore
			}
		}),
	)

const getXML = () =>
	getOrCreate({
		name: "xml API",
		path: cachePaths.xml,
		fn: () => fetchJobs({ key, rows: 10000 }).then((x) => x.text()),
		serialize: (x) => x,
		deserialize: (x) => x,
	})

const getJobs = () =>
	getOrCreate({
		name: "parse jobs",
		path: cachePaths.jobs,
		fn: () => getXML().then(parseJobs).then(jobsToMap),
	})

const getDetails = () =>
	getOrCreate({
		name: "crawl job details",
		path: cachePaths.details,
		fn: () => getJobs().then(Object.values).then(crawlJobDetails),
	})

const getData = () =>
	getOrCreate({
		name: "all data",
		path: cachePaths.data,
		fn: async () => deepMerge(await getJobs(), await getDetails()),
	})

if (import.meta.main) {
	switch (Deno.args[0]) {
		case "clean":
			await cleanCaches()
			break
		case "fetch":
			console.log(`fetched ${(await getXML()).length} characters`)
			break
		case "jobs":
			console.log(`queried ${Object.keys(await getJobs()).length} jobs`)
			break
		case "details":
			console.log(
				`crawled ${Object.keys(await getDetails()).length} job details`,
			)
			break
		case "all":
			console.log(`total ${Object.keys(await getData()).length} entries`)
			break
		default:
			console.log(
				"Invalid command. Use 'clean', 'fetch', 'jobs', 'details' or 'all'",
			)
	}
}
