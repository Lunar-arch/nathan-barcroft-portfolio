"use client";

import type { RefObject } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

type HeaderProps = {
	mobileOpen: boolean;
	onToggleMobileMenu: () => void;
	menuToggleRef?: RefObject<HTMLButtonElement | null>;
	progress?: number;
	progressVisible?: boolean;
};

const Header = ({ mobileOpen, onToggleMobileMenu, menuToggleRef, progress = 0, progressVisible = false }: HeaderProps) => {
	const reduceMotion = useReducedMotion();
	const easeOut = [0.22, 1, 0.36, 1] as const;
	const headerVariants = {
		collapsed: { maxWidth: '48px' },
		expanded: {
			maxWidth: '72rem',
			transition: reduceMotion
				? { duration: 0 }
				: { duration: 0.8, ease: easeOut },
		},
	};
	const containerVariants = {
		collapsed: {},
		expanded: {
			transition: reduceMotion
				? { staggerChildren: 0, delayChildren: 0 }
				: { staggerChildren: 0.06, delayChildren: 0.45 },
		},
	};
	const itemVariants = {
		collapsed: { opacity: 0 },
		expanded: {
			opacity: 1,
			transition: reduceMotion ? { duration: 0 } : { duration: 0.45, ease: easeOut },
		},
	};

	return (
		<div tabIndex={-1} className="fixed top-0 inset-x-0 z-70 h-20 bg-linear-to-b from-background from-[1rem] to-transparent p-4 md:px-6 flex flex-row justify-center">
			<motion.header
				id="site-header"
				className="max-w-6xl w-full h-full rounded-full bg-background-secondary/50 backdrop-blur-xs flex flex-row py-2 px-6 border border-foreground-secondary/30 overflow-hidden"
				role="banner"
				variants={headerVariants}
				initial="collapsed"
				animate="expanded"
			>
				<motion.div
					className="absolute inset-x-0 bottom-0 h-[4px]"
					animate={{ opacity: progressVisible ? 1 : 0 }}
					transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: easeOut }}
				>
					<div className="h-full w-full bg-transparent">
						<motion.div
							className="h-full bg-blue-500"
							animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
							transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: easeOut }}
						/>
					</div>
				</motion.div>
				<motion.div
					className="w-full h-full flex flex-row items-center justify-between"
					variants={containerVariants}
					initial="collapsed"
					animate="expanded"
				>
					<motion.div className="flex items-center" variants={itemVariants}>
						<Link href="/" aria-label="Nathan Barcroft - Home" className="font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
							Nathan Barcroft
						</Link>
					</motion.div>

					<motion.nav aria-label="Primary" className="hidden sm:flex h-full flex-row items-center gap-4 text-foreground" role="navigation" variants={itemVariants}>
						<a href="#projects" className="hover:underline">Works</a>
						<a href="#about" className="hover:underline">About</a>
						<a href="#contact" className="hover:underline">Contact</a>
					</motion.nav>

					<motion.div className="sm:hidden" variants={itemVariants}>
						<button
							ref={menuToggleRef}
							aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={mobileOpen}
							onClick={onToggleMobileMenu}
							className="p-2 rounded-md text-foreground/90 hover:bg-background/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
						>
							{mobileOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</motion.div>
				</motion.div>
			</motion.header>
		</div>
	);
};

export default Header;