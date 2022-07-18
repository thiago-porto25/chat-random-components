import React from "react"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { render } from "../../test-utils"
import { Input, InputProps } from "."
import { theme } from "../../theme"

const onChange = jest.fn()
const getInput = () => screen.getByPlaceholderText("Input")
const renderInput = (props?: InputProps) =>
	render(<Input placeholder="Input" onChange={onChange} {...props} />)

// --------------- SIMPLE TESTS ---------------
describe("Input - simple tests", () => {
	it("should render without errors", () => {
		renderInput()

		expect(getInput()).toBeInTheDocument()
	})

	it("should have a text value when 'value' prop is set", () => {
		renderInput({ value: "test" })

		expect(getInput()).toHaveValue("test")
	})

	it("should run onChange function when 'onChange' event fire", async () => {
		renderInput()

		const Input = getInput() as HTMLTextAreaElement

		await userEvent.type(Input, "test")

		expect(onChange).toHaveBeenCalledTimes(4)
	})
})

// --------------- STYLE TESTS ---------------
describe("Input - style tests", () => {
	it("should have default styles when no props are passed", () => {
		renderInput()

		expect(getInput()).toHaveStyle({
			width: "100%",
			height: "100%",
			borderRadius: theme.base.borderRadius.sm,
			padding: `${theme.base.spacing.nn} ${theme.base.spacing.xxxs}`,
		})
	})

	it("should have custom styles when props are passed", () => {
		renderInput({
			w: "lg",
			h: "sm",
			shapedByParent: false,
			radius: "sm",
			py: "xs",
			px: "xxs",
		})

		expect(getInput()).toHaveStyle({
			width: theme.base.spacing.lg,
			height: theme.base.spacing.sm,
			borderRadius: theme.base.borderRadius.sm,
			padding: `${theme.base.spacing.xs} ${theme.base.spacing.xxs}`,
		})
	})

	it("should have error styles when error props is passed", () => {
		renderInput({ error: true })

		expect(getInput()).toHaveStyle({
			borderColor: theme.colors.feedback.red,
		})
	})
})
