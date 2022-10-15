import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Button from '../src/components/button/button.component'
import Form from '../src/components/form/form.component'
import Gradients from '../src/components/gradients/gradients.component'

const formAnimation = {
    initial: {
        scale: 0.5,
        opacity: 0
    },
    animate: {
        scale: 1, opacity: 1,
        transition: {
            duration: 0.25,
            delay: 1
        }
    },
    exit: {
        scale: 0.5, opacity: 0,
        transition: {
            delay: 0.25,
            duration: 0.25,
        }
    }
}

const AccountPage = () => {
    const [inputs, setInputs] = useState({ email: "", password: "" })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(e);
        console.log(inputs);
    };

    return <>
        <Gradients />
        <section className="box flex items-center justify-center z-0 h-full">
            <motion.div
                variants={formAnimation} initial="initial" animate="animate" exit="exit"
                className="btn-gradient-outline p-[2px] z-0 rounded-md">
                <Form onSubmit={handleSubmit}>
                    <div className="mb-8 items-center flex items-center flex-col">
                        <h1 className="font-bold text-lg">Welcome to <span className="rounded-full bg-gradient-to-r from-indigo-400/20 to-fuchsia-500/20 px-2 text-fuchsia-300">Xenia</span></h1>
                        <small className="text-white/60">Please log in</small>
                    </div>
                    <Form.Group>
                        <Form.Input placeholder="Email" type="text" id="email" aria-labelledby="Email address" autoComplete="on" onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                        <Form.Label text="Email" htmlFor="email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input placeholder="Password" type="password" id="password" aria-labelledby="Password" autoComplete="off" onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                        <Form.Label text="Password" htmlFor="email" />
                    </Form.Group>
                    <Button.GradientOutline type="submit" expand text="Sign in" iconRight={<ChevronRightIcon width={18} height={18} />} />
                </Form>
            </motion.div>
        </section>
    </>
}

export default AccountPage
// z-10 flex flex-col bg-transparent border-[0.25px] border-white/10 bg-primary-900/60 backdrop-blur-md px-12 py-12 rounded-md gap-4
