import { fetchJobs } from "./fetch_jobs.ts"
import { parseJobs } from "./parse_jobs.ts"

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
				const res = await getJobs(1000)

				await Deno.writeFile(xmlPath, res.body!)
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
