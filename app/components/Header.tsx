"use client";

import type { RefObject } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

type HeaderProps = {
	mobileOpen: boolean;
	onToggleMobileMenu: () => void;
	menuToggleRef?: RefObject<HTMLButtonElement | null>;
};

const Header = ({ mobileOpen, onToggleMobileMenu, menuToggleRef }: HeaderProps) => {
	return (
		<div tabIndex={-1} className="fixed top-0 inset-x-0 z-70 h-20 bg-linear-to-b from-background from-[1rem] to-transparent p-4 md:px-6 flex flex-row justify-center">
			<header id="site-header" className="max-w-12 w-full h-full rounded-full bg-background-secondary/50 backdrop-blur-xs flex flex-row py-2 px-6 border border-foreground-secondary/30" role="banner">
				<div className="w-full h-full flex flex-row items-center justify-between">
					<div className="flex items-center">
						<span className="font-semibold opacity-0 text-foreground">     {/* opacity 0 for intro animation */}
							<Link href="/" aria-label="Nathan Barcroft - Home" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
								Nathan Barcroft
							</Link>
						</span>
					</div>

					<nav aria-label="Primary" className="hidden sm:flex h-full flex-row items-center gap-4 text-foreground" role="navigation">
						<a href="#projects" className="hover:underline">Works</a>
						<a href="#about" className="hover:underline">About</a>
						<a href="#contact" className="hover:underline">Contact</a>
					</nav>

					<div className="sm:hidden opacity-0">    {/* opacity 0 for intro animation */}
						<button
							ref={menuToggleRef}
							aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={mobileOpen}
							onClick={onToggleMobileMenu}
							className="p-2 rounded-md text-foreground/90 hover:bg-background/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
						>
							{mobileOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Header;