import "./App.css"

import { Grid } from "@mantine/core"

import { FilterGroup } from "./filter/FilterGroup.tsx"
import { JobDetailArea } from "./detail/JobDetail.tsx"
import { FilterResultArea } from "./filter/FilterResultArea.tsx"
import { JobsListArea } from "./jobslist/JobsListArea.tsx"

export const App = () => {
	return (
		<main>
			<Grid overflow="hidden" h="100%">
				<Grid.Col
					span={6}
					style={{
						display: "flex",
						flexDirection: "column",
						height: "100%",
					}}
				>
					<FilterGroup />
					<FilterResultArea />
					<JobsListArea />
				</Grid.Col>
				<Grid.Col span={6}>
					<JobDetailArea />
				</Grid.Col>
			</Grid>
		</main>
	)
}
