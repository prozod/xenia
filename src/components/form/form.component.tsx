import React from 'react'

interface IForm extends React.FormHTMLAttributes<HTMLFormElement> {
    children?: React.ReactNode
}

const Form = ({ children, ...props }: IForm) => {

    return (
        <form {...props} className="z-10 flex flex-col bg-gradient-to-b from-primary-800 to-primary-900 border-[0.25px] border-white/10 bg-primary-900/60 px-12 py-12 rounded-md gap-2 drop-shadow-2xl">
            {children}
        </form>
    )
}

Form.Group = function FormGroup({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative mb-4">
            {children}
        </div>
    )
}

interface IFormLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
    text: string
}

Form.Label = function FormLabel({ text, ...props }: IFormLabel) {
    return (
        <label {...props} className="absolute -top-5 left-0 text-white/60 font-bold text-xs peer-focus:text-indigo-400 peer-focus:-top-5 peer-focus:left-0 peer-placeholder-shown:top-[0.6rem] peer-placeholder-shown:left-3 transition-all">
            {text}
        </label>
    )
}

Form.Input = function FormInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className="rounded-md px-2 py-1 text-white bg-primary-900/20 border-[0.25px] border-white/20 focus:border-b-1 focus:border-b-indigo-400/70 outline-none peer placeholder-transparent transition-all" />
}

export default Form
