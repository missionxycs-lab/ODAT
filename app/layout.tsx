import type { Metadata } from "next";
import { Inter, Krub } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const krub = Krub({
	variable: "--font-krub",
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "One Day at a Time",
	description: "For SG Snapshot",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} ${krub.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					disableTransitionOnChange
				>
					<ConvexClientProvider>{children}</ConvexClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ConvexProvider client={convex}>
          {children}
        </ConvexProvider>
      </body>
    </html>
  );
}
