import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gpt Wars",
    description: "A Debate Between Character"
}
export default function RootLayout ({ children }: Readonly<{children: React.ReactNode}>) {
    return <html>
        <body className="h-screen w-screen max-w-screen max-h-screen bg-slate-600">
            {children}
        </body>
    </html>
}