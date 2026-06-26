import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './Sections'
import Seo from './Seo'
import TranslatedOutlet from './TranslatedOutlet'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo />
      <Navbar />
      <main className="flex-1">
        <TranslatedOutlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
