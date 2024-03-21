import { crawlJobs, parseCrawlJobs } from "./crawl_jobs.ts"
import { fetchJobs } from "./fetch_jobs.ts"
import { parseJobs } from "./parse_jobs.ts"
import { Item } from "./type.d.ts"

const getJobs = (rows: number) => {
	const endpoint = Deno.env.get("API_ENDPOINT")
	if (!endpoint) throw new Error("API_ENDPOINT is not set")

	const key = Deno.env.get("API_KEY")
	if (!key) throw new Error("API_KEY is not set")

	return fetchJobs({ endpoint, key, rows })
}

if (import.meta.main) {
	const xmlPath = import.meta.dirname + "/response.xml"

	switch (Deno.args[0]) {
		case "fetch":
			{
				const res = await getJobs(10000)

				await Deno.writeFile(xmlPath, res.body!)
			}
			break
		case "crawl":
			{
				const jobs: Item[] = JSON.parse(await Deno.readTextFile("./jobs.json"))

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

				console.error(queries.filter((x) => x.status === "rejected"))

				const items = Object.fromEntries(
					queries
						.filter((x): x is PromiseFulfilledResult<
							[number, NonNullable<ReturnType<typeof parseCrawlJobs>>]
						> => x.status === "fulfilled" && x.value[1] !== null)
						.map((x) => x.value),
				)

				await Deno.writeTextFile(
					"./descriptions.json",
					JSON.stringify(items, null, 2),
				)
			}
			break
		case "xml":
			{
				const xml = await Deno.readTextFile(xmlPath)
				const jobs = parseJobs(xml)
				console.log(jobs)

				await Deno.writeTextFile("./jobs.json", JSON.stringify(jobs, null, 2))
			}
			break
		case "all":
			{
				const res = await getJobs(1000)
				const jobs = parseJobs(await res.text())

				console.log(jobs)

				await Deno.writeTextFile("./jobs.json", JSON.stringify(jobs, null, 2))
			}
			break
		default:
			console.log("Invalid command. Use 'fetch', 'xml' or 'all'")
	}
}
