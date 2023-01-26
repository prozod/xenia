import React from "react"

export interface IForm extends React.FormHTMLAttributes<HTMLFormElement> {
	children?: React.ReactNode
}
interface IFormLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
	text: string
}

interface IFormTextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	text: string
}

interface IFormInput extends React.InputHTMLAttributes<HTMLInputElement> {}

function Form(props: IForm) {
	return (
		<form
			{...props}
			className={`z-10 flex flex-col bg-gradient-to-b from-primary-800 to-primary-900 border-[0.25px] border-white/10 bg-primary-900/60 px-12 py-12 rounded-md gap-2 drop-shadow-2xl min-w-[20vw] relative + ${props.className}`}
			onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
		>
			{props.children}
		</form>
	)
}

Form.displayName = "Form"

Form.Group = function FormGroup({ children }: IForm) {
	return <div className="relative mb-7 flex flex-col justify-between">{children}</div>
}

Form.Label = function FormLabel({ text, ...props }: IFormLabel) {
	return (
		<label
			{...props}
			className="absolute -top-5 left-0 text-white/60 font-bold text-xs peer-focus:text-indigo-400 peer-focus:-top-5 peer-focus:left-0 peer-placeholder-shown:top-[0.6rem] peer-placeholder-shown:left-3 transition-all"
		>
			{text}
		</label>
	)
}

Form.Textarea = function FormTextarea({ text, ...props }: IFormTextarea) {
	return (
		<textarea
			{...props}
			className="absolute -top-5 left-0 text-white/60 font-bold text-xs peer-focus:text-indigo-400 peer-focus:-top-5 peer-focus:left-0 peer-placeholder-shown:top-[0.6rem] peer-placeholder-shown:left-3 transition-all"
		>
			{text}
		</textarea>
	)
}

Form.Input = React.forwardRef(function FormInput(
	{ className, ...props }: IFormInput,
	ref: React.ForwardedRef<HTMLInputElement>
) {
	return (
		<input
			{...props}
			ref={ref}
			className={`flex items-center justify-center rounded-md px-2 py-2 text-white bg-primary-900/20 border-[0.25px] text-xs border-white/20 focus:border-b-1 focus:border-b-indigo-400/70 outline-none peer placeholder-transparent transition-all w-full file:bg-primary-800 file:text-white file:px-4 file:border-0 file:text-xs file:mr-2 file:text-white file:border-[0.25px] file:rounded-md file:border-white/20 ${className}`}
		/>
	)
})

export default Form
