import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import AdminPanel from "@/views/AdminPanel";
import CategoryView from "@/views/CategoryView";
import VersionView from "@/views/VersionView";
import ModView from "@/views/ModView";
import CategoryEditView from "@/views/CategoryEditView";
import VersionEditView from "@/views/VersionEditView";
import ModEditView from "@/views/ModEditView";
import AddModView from "@/views/AddModView";
import PrivacyView from "@/views/PrivacyView";

const routes = [
    {path: '/', name: 'home', component: HomeView},
    {path: '/login', name: 'login', component: LoginView},
    {path: '/adminpanel', name: 'adminpanel', component: AdminPanel},
    {path: '/category', name: 'category', component: CategoryView},
    {path: '/category/:id', name: 'category_edit', component: CategoryEditView},
    {path: '/version', name: 'version', component: VersionView},
    {path: '/version/:id', name: 'version_edit', component: VersionEditView},
    {path: '/mod', name: 'mod', component: ModView},
    {path: '/mod/:id', name: 'mod_edit', component: ModEditView},
    {path: '/addmod', name: 'mod_add', component: AddModView},
    {path: '/privacy-policy', name: 'privacy', component: PrivacyView},

    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
