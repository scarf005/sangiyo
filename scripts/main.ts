import { fetchJobs } from "./fetch_jobs.ts"
import { parseJobs } from "./parse_jobs.ts"

if (import.meta.main) {
	const xmlPath = "./response.xml"

	switch (Deno.args[0]) {
		case "fetch":
			{
				const endpoint = Deno.env.get("API_ENDPOINT")
				if (!endpoint) throw new Error("API_ENDPOINT is not set")

				const key = Deno.env.get("API_KEY")
				if (!key) throw new Error("API_KEY is not set")

				const res = await fetchJobs({ endpoint, key, rows: 3 })

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
	}
}
