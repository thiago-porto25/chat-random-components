import React from "react"
import { screen } from "@testing-library/react"

import { render } from "../../tests"
import { Message } from "."

const text = "This is a message"
const timestamp = new Date("2022-07-14T18:41:49.638Z")
const getMessage = () => screen.getByText(text)
const renderMessage = () =>
	render(<Message message={text} timestamp={timestamp} />)

// --------------- SIMPLE TESTS ---------------
describe("Message - Simple tests", () => {
	it("should render correctly", () => {
		renderMessage()

		expect(getMessage()).toBeInTheDocument()
	})

	it("should render the correct text", () => {
		renderMessage()

		expect(getMessage()).toHaveTextContent(text)
	})

	it("should render correct timestamp", () => {
		renderMessage()

		expect(screen.getByText("15:41")).toHaveTextContent("15:41")
	})
})