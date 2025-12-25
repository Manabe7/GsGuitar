import React from 'react'
import UserProfile from './UserProfile'
import { Link } from 'react-router-dom'
import DarkMode from './DarkMode'
import LoginState from './LoginState'

import { motion } from 'framer-motion'
import { useState } from 'react'

const tabs = ['Home', 'Blog', 'Store', 'Course']

interface TabProps {
  text: string
  selected: boolean
  setSelected: (text: string) => void
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
    return (
        <button
            onClick={() => setSelected(text)}
            className={`${
            selected
                ? 'text-black'
                : 'text-gray-500 hover:text-black-900 dark:hover:text-gray-100'
            } relative rounded-md px-2 py-1 text-sm font-medium transition-colors  cursor-pointer`}
        >
            <span className="relative z-10">{text}</span>
            {selected && (
            <motion.span
                layoutId="tab"
                transition={{ type: 'spring', duration: 0.4 }}
                className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500"
            ></motion.span>
            )}
        </button>
        )
        }

        const Nav = () => {
        const [selected, setSelected] = useState<string>(tabs[0])
        return (
        <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab, index) => (
                <a href={`#${tab}`} key={index}>
                    <Tab
                        text={tab}
                        selected={selected === tab}
                        setSelected={setSelected}
                        key={tab}
                    />
                </a>
            ))}
        </div>
        )
    }

export default Nav

