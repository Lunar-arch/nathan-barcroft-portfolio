"use client";

import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

type MobileMenuProps = {
	open: boolean;
	onClose: () => void;
	triggerRef?: RefObject<HTMLButtonElement>;
};

const links = [
	{ href: '#projects', label: 'Works' },
	{ href: '#about', label: 'About' },
	{ href: '#contact', label: 'Contact' },
];

const dialogId = 'mobile-menu-dialog';
const labelId = 'mobile-menu-heading';

const MobileMenu = ({ open, onClose, triggerRef }: MobileMenuProps) => {
	const overlayRef = useRef<HTMLDivElement | null>(null);
	const itemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
	const tlRef = useRef<gsap.core.Timeline | null>(null);
	const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

	useEffect(() => {
		const overlay = overlayRef.current;
		if (!overlay) return;

		const menuItems = itemsRef.current.filter(Boolean) as HTMLElement[];

		gsap.set(overlay, { xPercent: 100, autoAlpha: 0, pointerEvents: 'none' });

		const tl = gsap.timeline({ paused: true });
		tl.to(overlay, { xPercent: 0, autoAlpha: 1, pointerEvents: 'auto', duration: 0.35, ease: 'power3.out' })
			.fromTo(
				menuItems,
				{ x: 24, autoAlpha: 0 },
				{ x: 0, autoAlpha: 1, stagger: 0.08, duration: 0.35, ease: 'power3.out' },
				'<'
			);

		tlRef.current = tl;
	}, []);

	useEffect(() => {
		const tl = tlRef.current;
		if (!tl) return;
		if (open) tl.play();
		else tl.reverse();
	}, [open]);

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
		<div
			ref={overlayRef}
			id={dialogId}
			className="sm:hidden fixed inset-0 bg-accent/75 backdrop-blur-sm z-60 p-6 flex flex-col pt-20 opacity-0 invisible pointer-events-none"
			role="dialog"
			aria-modal="true"
			aria-hidden={!open}
			aria-labelledby={labelId}
			tabIndex={-1}
		>
			<div className="flex items-center justify-between mb-6">
				<p id={labelId} className="sr-only">
					Mobile navigation menu
				</p>
				<button
					type="button"
					className="rounded-md p-2 text-foreground/90 hover:bg-background/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
					onClick={onClose}
				>
					<span className="sr-only">Close navigation menu</span>
					<X size={18} aria-hidden="true" />
				</button>
			</div>

			<nav className="flex flex-col gap-4 mt-2" aria-label="Primary mobile navigation">
				{links.map((link, i) => (
					<a
						key={link.href}
						href={link.href}
						ref={el => {
							itemsRef.current[i] = el;
							if (i === 0) firstLinkRef.current = el;
						}}
						onClick={onClose}
						className="text-lg opacity-0"
					>
						{link.label}
					</a>
				))}
			</nav>
		</div>
	);
};

export default MobileMenu;