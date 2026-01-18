import { useGetBlogById } from "../hooks/useBlogs";
import { Skeleton } from "./ui/skeleton";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button"; // Assuming you might want a back button on mobile

interface BlogDetailProps {
    blogId: string | null;
    onBack: () => void;
}

export const BlogDetail = ({ blogId, onBack }: BlogDetailProps) => {
    const { data: blog, isLoading, error } = useGetBlogById(blogId);

    if (!blogId) {
        return (
            <div className="flex flex-col h-full items-center justify-center p-8 text-muted-foreground animate-in fade-in duration-500">
                <div className="h-40 w-40 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                    <div className="h-32 w-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                        <Calendar className="h-12 w-12 text-primary/40" />
                    </div>
                </div>
                <h3 className="text-xl font-medium text-foreground/80">Select a story to start reading</h3>
                <p className="text-sm mt-2 text-muted-foreground/60">Choose from the latest updates in the sidebar</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-6 p-8 max-w-4xl mx-auto w-full animate-pulse">
                <Skeleton className="h-[350px] w-full rounded-2xl" />
                <div className="space-y-3">
                    <Skeleton className="h-10 w-3/4 rounded-lg" />
                    <Skeleton className="h-4 w-1/4 rounded-full" />
                </div>
                <div className="space-y-2 pt-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="flex h-full items-center justify-center p-6 text-destructive animate-in zoom-in-95">
                <div className="text-center space-y-2">
                    <p className="text-lg font-medium">Unable to load story</p>
                    <p className="text-sm opacity-80">Please check your connection or try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-background animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="relative h-[400px] w-full group">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="absolute top-4 left-4 z-50 md:hidden bg-background/50 backdrop-blur-md hover:bg-background/80"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 max-w-4xl mx-auto w-full right-0">
                    <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        {blog.category.map((cat) => (
                            <span key={cat} className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/20 text-primary-foreground text-xs font-bold rounded-full shadow-sm">
                                {cat}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        {blog.title}
                    </h1>
                    <div className="flex items-center gap-2 text-foreground/80 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="mx-2">•</span>
                        <span>5 min read</span>
                    </div>
                </div>
            </div>

            <div className="p-8 max-w-3xl mx-auto pb-20">
                <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed font-serif italic border-l-4 border-primary pl-6 py-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                    {blog.description}
                </p>

                <div className="prose prose-lg dark:prose-invert max-w-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    <p className="whitespace-pre-line leading-8 text-justify text-foreground/90 font-light tracking-wide">
                        {blog.content}
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center border border-border">
                            {blog.authorProfile ? (
                                <img src={blog.authorProfile} alt={blog.authorName || "Author"} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-xs font-bold text-primary">{blog.authorName ? blog.authorName.charAt(0) : "C"}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-foreground">{blog.authorName || "CA Monk Team"}</span>
                            <span className="text-xs text-muted-foreground">{blog.authorRole || "Contributor"}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="hover:text-primary">Share</Button>
                        <Button variant="ghost" size="sm" className="hover:text-primary">Save</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
