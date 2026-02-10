"use client";

import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type MobileMenuProps = {
	open: boolean;
	onClose: () => void;
	triggerRef?: RefObject<HTMLButtonElement | null>;
};

const links = [
	{ href: '#projects', label: 'Works' },
	{ href: '#about', label: 'About' },
	{ href: '#contact', label: 'Contact' },
];

const dialogId = 'mobile-menu-dialog';
const labelId = 'mobile-menu-heading';

const MobileMenu = ({ open, onClose, triggerRef }: MobileMenuProps) => {
	const itemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
	const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
	const reduceMotion = useReducedMotion();
	const easeOut = [0.22, 1, 0.36, 1] as const;
	const easeIn = [0.4, 0, 1, 1] as const;

	useEffect(() => {
		if (open) {
			const focusTarget = firstLinkRef.current ?? itemsRef.current[0];
			requestAnimationFrame(() => focusTarget?.focus());
			return;
		}
		triggerRef?.current?.focus();
	}, [open, triggerRef]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!open) return;
			if (event.key === 'Escape') {
				event.preventDefault();
				onClose();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [open, onClose]);

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					id={dialogId}
					className="sm:hidden fixed inset-0 bg-accent/75 backdrop-blur-sm z-60 p-6 flex flex-col pt-20"
					role="dialog"
					aria-modal="true"
					aria-hidden={!open}
					aria-labelledby={labelId}
					tabIndex={-1}
					initial={{ x: '100%', opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: reduceMotion ? { duration: 0 } : { duration: 0.35, ease: easeOut } }}
					exit={{ x: '100%', opacity: 0, transition: reduceMotion ? { duration: 0 } : { duration: 0.25, ease: easeIn } }}
				>
					<div className="flex items-center justify-between mb-6">
						<p id={labelId} className="sr-only">
							Mobile navigation menu
						</p>
						<button
							type="button"
							className="rounded-md p-2 text-foreground/90 hover:bg-background/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
							onClick={onClose}
						>
							<span className="sr-only">Close navigation menu</span>
							<X size={18} aria-hidden="true" />
						</button>
					</div>

					<motion.nav
						className="flex flex-col gap-4 mt-2"
						aria-label="Primary mobile navigation"
						initial="hidden"
						animate="visible"
						variants={{
							hidden: {},
							visible: {
								transition: reduceMotion ? { staggerChildren: 0 } : { staggerChildren: 0.08 },
							},
						}}
					>
						{links.map((link, i) => (
							<motion.a
								key={link.href}
								href={link.href}
								ref={el => {
									itemsRef.current[i] = el;
									if (i === 0) firstLinkRef.current = el;
								}}
								onClick={onClose}
								className="text-lg"
								variants={{
									hidden: { x: 24, opacity: 0 },
									visible: {
										x: 0,
										opacity: 1,
										transition: reduceMotion ? { duration: 0 } : { duration: 0.35, ease: easeOut },
									},
								}}
							>
								{link.label}
							</motion.a>
						))}
					</motion.nav>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MobileMenu;