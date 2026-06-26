import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import LocaleGate, { LegacyRedirect, LocaleNotFound, RootRedirect } from './components/LocaleGate'
import { ROUTE_SEGMENTS } from './i18n/routes'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ReferencesPage = lazy(() => import('./pages/ReferencesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

function PageFallback() {
  return <div className="min-h-[50vh] bg-background" aria-hidden="true" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        {ROUTE_SEGMENTS.filter((route) => route.segment).map((route) => (
          <Route
            key={route.segment}
            path={`/${route.segment}`}
            element={<LegacyRedirect />}
          />
        ))}

        <Route path="/:locale" element={<LocaleGate />}>
          <Route element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<PageFallback />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="a-propos"
              element={
                <Suspense fallback={<PageFallback />}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="services"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ServicesPage />
                </Suspense>
              }
            />
            <Route
              path="references"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ReferencesPage />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ContactPage />
                </Suspense>
              }
            />
            <Route path="*" element={<LocaleNotFound />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
