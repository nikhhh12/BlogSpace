import { useGetBlogs } from "../hooks/useBlogs";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { cn } from "../lib/utils";
import { ChevronRight } from "lucide-react";

interface BlogListProps {
    onSelectBlog: (id: string) => void;
    selectedBlogId: string | null;
    searchQuery?: string;
}

export const BlogList = ({ onSelectBlog, selectedBlogId, searchQuery = "" }: BlogListProps) => {
    const { data: blogs, isLoading, error } = useGetBlogs();

    // Filter blogs based on search query
    const filteredBlogs = blogs?.filter((blog) => {
        const query = searchQuery.toLowerCase();
        return (
            blog.title.toLowerCase().includes(query) ||
            blog.category.some((cat) => cat.toLowerCase().includes(query))
        );
    });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 p-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-28 w-full rounded-xl bg-card/50" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 m-4 rounded-lg bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 text-center">
                Unable to load recent stories.
            </div>
        );
    }

    if (filteredBlogs?.length === 0) {
        return (
            <div className="p-8 text-center text-muted-foreground text-sm">
                No stories found matching "{searchQuery}"
            </div>
        );
    }

    return (
        <div className="flex flex-col px-3 pb-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            {/* Removed local header as it's now in SideBar container in App.tsx OR we can keep it for cleaner component separation. 
          The previous analysis showed 'Recent Stories' in App.tsx sidebar container. I will stick to just the list items here. 
      */}
            <div className="space-y-3">
                {filteredBlogs?.map((blog, index) => (
                    <Card
                        key={blog.id}
                        className={cn(
                            "group cursor-pointer transition-all duration-300 border-transparent hover:border-primary/20 hover:shadow-xl relative overflow-hidden",
                            "bg-card/50 hover:bg-card hover:-translate-y-1",
                            selectedBlogId === blog.id
                                ? "bg-background border-l-4 border-l-primary shadow-md scale-[1.02] ring-1 ring-primary/5"
                                : ""
                        )}
                        onClick={() => onSelectBlog(blog.id)}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
                            selectedBlogId === blog.id && "opacity-100"
                        )} />

                        <CardHeader className="p-4 relative z-10">
                            <div className="flex justify-between items-start gap-2">
                                <div className="flex flex-col gap-1.5 flex-1 min-w-0"> {/* min-w-0 is CRITICAL for truncation inside flex items */}
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {blog.category.slice(0, 1).map((cat) => (
                                            <span
                                                key={cat}
                                                className="text-[10px] uppercase tracking-wider font-bold text-primary/70"
                                            >
                                                {cat}
                                            </span>
                                        ))}
                                        <span className="text-[10px] text-muted-foreground">• {new Date(blog.date).toLocaleDateString()}</span>
                                    </div>

                                    <CardTitle className="text-base font-bold leading-tight break-words line-clamp-2 w-full pr-2 text-foreground/90 group-hover:text-primary transition-colors">
                                        {blog.title}
                                    </CardTitle>

                                    <CardDescription className="line-clamp-2 text-xs text-muted-foreground/80 font-normal">
                                        {blog.description}
                                    </CardDescription>
                                </div>

                                {selectedBlogId === blog.id && (
                                    <ChevronRight className="h-4 w-4 text-primary animate-in slide-in-from-left-2 fade-in duration-300 self-center" />
                                )}
                            </div>
                        </CardHeader>
                    </Card>
                ))}
                {/* Empty state spacer at bottom */}
                <div className="h-10" />
            </div>
        </div>
    );
};
