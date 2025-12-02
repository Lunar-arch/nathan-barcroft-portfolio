"use client";

import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap, isGsapAvailable } from '../../lib/gsapUtils';

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
	const overlayRef = useRef<HTMLDivElement | null>(null);
	const itemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
	const tlRef = useRef<gsap.core.Timeline | null>(null);
	const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
	// Track if we're using CSS fallback
	const usingCssFallback = useRef(!isGsapAvailable());

	useEffect(() => {
		const overlay = overlayRef.current;
		if (!overlay) return;

		const menuItems = itemsRef.current.filter(Boolean) as HTMLElement[];

		if (isGsapAvailable()) {
			// GSAP animation setup
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
			usingCssFallback.current = false;
		} else {
			// CSS fallback - set initial hidden state
			overlay.style.transform = 'translateX(100%)';
			overlay.style.opacity = '0';
			overlay.style.visibility = 'hidden';
			overlay.style.pointerEvents = 'none';
			overlay.style.transition = 'transform 0.35s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.35s cubic-bezier(0.33, 1, 0.68, 1), visibility 0.35s';
			
			menuItems.forEach((item, i) => {
				item.style.transform = 'translateX(24px)';
				item.style.opacity = '0';
				item.style.transition = `transform 0.35s cubic-bezier(0.33, 1, 0.68, 1) ${i * 0.08}s, opacity 0.35s cubic-bezier(0.33, 1, 0.68, 1) ${i * 0.08}s`;
			});
			usingCssFallback.current = true;
		}
	}, []);

	useEffect(() => {
		const overlay = overlayRef.current;
		const menuItems = itemsRef.current.filter(Boolean) as HTMLElement[];
		
		if (!usingCssFallback.current && tlRef.current) {
			// GSAP animation
			if (open) tlRef.current.play();
			else tlRef.current.reverse();
		} else if (overlay) {
			// CSS fallback animation
			if (open) {
				overlay.style.transform = 'translateX(0)';
				overlay.style.opacity = '1';
				overlay.style.visibility = 'visible';
				overlay.style.pointerEvents = 'auto';
				
				menuItems.forEach((item) => {
					item.style.transform = 'translateX(0)';
					item.style.opacity = '1';
				});
			} else {
				overlay.style.transform = 'translateX(100%)';
				overlay.style.opacity = '0';
				overlay.style.visibility = 'hidden';
				overlay.style.pointerEvents = 'none';
				
				menuItems.forEach((item) => {
					item.style.transform = 'translateX(24px)';
					item.style.opacity = '0';
				});
			}
		}
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