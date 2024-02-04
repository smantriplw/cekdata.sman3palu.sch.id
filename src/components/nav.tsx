'use client';
import NextLink from 'next/link';
import { NavItem } from "@/typings/navbar";
import { usePathname } from "next/navigation";
import React from "react"
import { twMerge } from "tailwind-merge";
import Image from 'next/image';
import {motion} from 'framer-motion';
import { SwapThemeComponent } from './swapTheme';

export const Navbar: React.FC<{
    items: NavItem[];
}> = (props) => {
    const pathname = usePathname();

    return (
        <div>
            <div className="navbar sm:hidden md:block">
                <motion.div className="navbar-start space-x-4" initial={{
                    opacity: 0,
                }} animate={{
                    opacity: 1,
                    x: 10,
                }} transition={{
                    delay: 0.5,
                }}>
                    <div className="avatar">
                        <div className="w-16 lg:w-20 rounded-md">
                            <Image src={'/mpkosis-removed.png'} alt={'MPK OSIS Logo'} fill sizes={'100vh'} />
                        </div>
                    </div>
                    <motion.h1 className="text-2xl font-semibold" animate={{
                        x: 10,
                    }}>
                        SEKBID <span className="text-red-500 hidden md:block">SEMBILAN <span className="text-slate-100">(9)</span></span><span className="text-red-500 block md:hidden">SEMBILAN</span>
                    </motion.h1>
                </motion.div>
                <div className="navbar-end">
                    <SwapThemeComponent />
                </div>
            </div>
            <motion.div className="btm-nav md:hidden" initial={{
                opacity: 0,
            }} animate={{
                opacity: 1,
            }}>
                {props.items.map(item => (
                    <div key={item.href} className={twMerge(pathname === item.href ? 'active' : null)}>
                        {item.icon && item.icon}
                        {item.isRoute ? (
                            <NextLink href={item.href}>{item.name}</NextLink>
                        ) : (
                            <a href={item.href}>{item.name}</a>
                        )}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}