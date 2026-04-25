import { createFileRoute } from '@tanstack/react-router'
import { ArticleEditor } from '@/pages/ArticleEditor'

export const Route = createFileRoute('/article/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ArticleEditor />
}
