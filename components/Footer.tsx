import Link from "next/link";

export function Footer() {
	return (
		<footer className="w-full py-6 border-t border-border bg-background">
			<div className="container mx-auto px-4 text-center">
				<p className="text-sm text-muted-foreground">
					App developed by Archer Chua and Chan Ming Hui for Youth Corps Singapore
				</p>
			</div>
		</footer>
	);
}
