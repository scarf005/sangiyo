import { Text } from "@mantine/core"
import { dataList } from "../hooks/data.ts"
import { useFilteredData } from "../hooks/useFilteredData.ts"

export const FilterResultArea = () => {
	const data = useFilteredData()

	return <Text>총 {dataList.length}중 {data.length}개</Text>
}
