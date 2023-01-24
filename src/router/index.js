import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorsViews from '../views/AuthorsViews.vue'
import BookForm from '../views/BookForm.vue'
import BooksView from '../views/BooksView.vue'
import AuthorView from '../views/AuthorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsViews
    },
    {
      path: '/book-form',
      name: 'book-form',
      component: BookForm
    },
    {
      path: '/book-edit/:id',
      name: 'book-edit',
      component: BookForm
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView
    },
    {
      path: '/author/:id',
      name: 'author',
      component: AuthorView,
    },
    {
      path: '/author-fail',
      name: 'author-fail',
      component: AuthorView
    },
    {
      path: '/author-books/:id',
      name: 'author-books',
      component: BooksView
    }

  ]
})

export default router
