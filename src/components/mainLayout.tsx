'use client';
import React from "react";
import {motion} from 'framer-motion';
import { Navbar } from "./nav";
import { useChangeableTheme } from "@/stores/themeAtom";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { Toaster } from "react-hot-toast";

export const MainLayout: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    const {theme} = useChangeableTheme();
    
    return (
        <ReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITEKEY}>
            <motion.main data-theme={theme} layout className="min-h-screen" transition={{
                delay: 0.5,
            }}>
                <Navbar items={[
                    {
                        name: 'Home',
                        href: '/',
                        isRoute: true,
                    }
                ]} />

                <motion.div initial={{
                    opacity: 0,
                }} animate={{
                    opacity: 1,
                }}>
                    {props.children}
                </motion.div>
                <Toaster />
            </motion.main>
        </ReCaptchaProvider>
    );
}