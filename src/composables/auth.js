import { useCookies } from '@vueuse/integrations/useCookies'
const cookies = useCookies()

export function setToken(token) {
  cookies.set('admin-token', token)
}

export function getToken() {
  return cookies.get('admin-token')
}

export function removeToken() {
  cookies.remove('admin-token')
}