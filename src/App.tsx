import { useState } from 'react'
import { BlogList } from './components/BlogList'
import { BlogDetail } from './components/BlogDetail'
import { CreateBlogForm } from './components/CreateBlogForm'
import { Button } from './components/ui/button'
import { PlusCircle, BookOpen, Search, Bell } from 'lucide-react'
import { Input } from './components/ui/input'

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleCreateSuccess = () => {
    setIsCreating(false)
    setSelectedBlogId(null)
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <header className="flex h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary animate-pulse" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            BlogSpace
          </h1>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-center max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blogs..."
              className="w-full bg-background/50 pl-9 focus-visible:ring-primary/20 transition-all hover:bg-background/80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            onClick={() => {
              setIsCreating(true)
              setSelectedBlogId(null)
            }}
            size="sm"
            className="shadow-lg hover:shadow-primary/25 transition-all hover:scale-105"
            variant={isCreating ? "secondary" : "default"}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Blog
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Panel - Blog List */}
        <aside
          className={`
                border-r border-border bg-card/30 flex flex-col backdrop-blur-sm transition-all duration-300
                ${selectedBlogId ? 'hidden md:flex md:w-1/3 min-w-[320px] max-w-[480px]' : 'w-full md:w-1/3 min-w-[320px] max-w-[480px]'}
            `}
        >
          <div className="p-4 pt-6">
            <h2 className="text-lg font-semibold mb-2 px-2">Recent Stories</h2>
          </div>
          <BlogList
            onSelectBlog={(id) => {
              setSelectedBlogId(id)
              setIsCreating(false)
            }}
            selectedBlogId={selectedBlogId}
            searchQuery={searchQuery}
          />
        </aside>

        {/* Right Panel - Content */}
        <main
          className={`
                flex-1 bg-background h-full overflow-hidden relative
                ${!selectedBlogId && !isCreating ? 'hidden md:block' : 'w-full'}
            `}
        >
          {isCreating ? (
            <div className="h-full overflow-y-auto p-4 md:p-8 flex items-start justify-center animate-in fade-in zoom-in-95 duration-300">
              <CreateBlogForm
                onSuccess={handleCreateSuccess}
                onCancel={() => setIsCreating(false)}
              />
            </div>
          ) : (
            <BlogDetail
              blogId={selectedBlogId}
              onBack={() => setSelectedBlogId(null)}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
