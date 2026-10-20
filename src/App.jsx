import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import LessonPlayer from './pages/LessonPlayer'
import Blog from './pages/Blog'
import BlogArticle from './pages/BlogArticle'
import Categories from './pages/Categories'
import Instructors from './pages/Instructors'
import InstructorProfile from './pages/InstructorProfile'
import Pricing from './pages/Pricing'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { Login, SignUp, ForgotPassword } from './pages/Auth'
import SearchResults from './pages/SearchResults'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import BecomeInstructor from './pages/BecomeInstructor'
import { Terms, Privacy } from './pages/Legal'
import NotFound from './pages/NotFound'
import Overview from './pages/dashboard/Overview'
import MyCourses from './pages/dashboard/MyCourses'
import Certificates from './pages/dashboard/Certificates'
import Wishlist from './pages/dashboard/Wishlist'
import Purchases from './pages/dashboard/Purchases'
import ProfileSettings from './pages/dashboard/ProfileSettings'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogArticle />} />
        <Route path="categories" element={<Categories />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="instructors/:id" element={<InstructorProfile />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="become-instructor" element={<BecomeInstructor />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="learn/:courseId/:lessonId?" element={<LessonPlayer />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}
