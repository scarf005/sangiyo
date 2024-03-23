import { Text } from "@mantine/core"
import { date } from "./data.json" with { type: "json" }

export const UpdateArea = () => <Text>최종 업데이트: {date}</Text>
