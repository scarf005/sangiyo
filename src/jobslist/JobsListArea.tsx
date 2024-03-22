import { useSetAtom } from "jotai"
import { idAtom } from "../hooks/atom.ts"
import { Card, ScrollArea, Stack, Text, Title } from "@mantine/core"
import { useFilteredData } from "../hooks/useFilteredData.ts"

export const JobsListArea = () => {
	const setId = useSetAtom(idAtom)
	const data = useFilteredData()

	return (
		<ScrollArea>
			<Stack gap="xs">
				{data.map((x) => (
					<Card
						shadow="xl"
						key={x.채용번호}
						component="button"
						onClick={() => setId(x.채용번호)}
						style={{ display: "flex", alignItems: "flex-start" }}
					>
						<Title order={3}>{x.채용제목}</Title>
						<Text>{x.업체명} - {x.근무지주소}</Text>
					</Card>
				))}
			</Stack>
		</ScrollArea>
	)
}
