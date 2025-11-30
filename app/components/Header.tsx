const Header = () => {
	return (
		<div tabIndex={-1} className="fixed top-0 inset-x-0 z-70 h-20 bg-linear-to-b from-background from-[1rem] to-transparent p-4 md:px-6 flex flex-row justify-center">
				<header id="site-header" className="max-w-12 w-full h-full rounded-full bg-background-secondary/50 backdrop-blur-xs flex flex-row py-2 px-6 border border-foreground-secondary/30" role="banner">
								<div className="opacity-0 w-full h-full flex flex-row items-center ">
										<h1 className="font-semibold text-foreground">
											<a href="/" aria-label="Home">Nathan Barcroft</a>
										</h1>
								</div>
					<div className="opacity-0 h-full flex flex-row items-center">
						<nav aria-label="Primary" className="h-full flex flex-row items-center gap-4 text-foreground" role="navigation">
							<a href="#projects" className="hover:underline">Works</a>
							<a href="#about" className="hover:underline">About</a>
							<a href="#contact" className="hover:underline">Contact</a>
						</nav>
					</div>
				</header>
			</div>
	);
}

export default Header;