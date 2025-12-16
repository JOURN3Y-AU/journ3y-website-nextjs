export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Landing pages have no navbar or footer for conversion optimization
  return <>{children}</>
}
