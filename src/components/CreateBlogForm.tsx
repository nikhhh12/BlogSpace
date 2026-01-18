import { useState } from "react";
import { useCreateBlog } from "../hooks/useBlogs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Loader2 } from "lucide-react";

interface CreateBlogFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export const CreateBlogForm = ({ onSuccess, onCancel }: CreateBlogFormProps) => {
    const mutation = useCreateBlog();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        coverImage: "",
        category: "",
        authorName: "",
        authorRole: "",
        authorProfile: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Split categories by comma and trim
        const categories = formData.category.split(",").map((c) => c.trim()).filter(Boolean);

        mutation.mutate(
            {
                title: formData.title,
                description: formData.description,
                content: formData.content,
                coverImage: formData.coverImage || "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg", // Default image
                category: categories.length > 0 ? categories : ["GENERAL"],
                date: new Date().toISOString(),
                authorName: formData.authorName || "CA Monk Team",
                authorRole: formData.authorRole,
                authorProfile: formData.authorProfile,
            },
            {
                onSuccess: () => {
                    onSuccess();
                },
            }
        );
    };

    return (
        <Card className="w-full max-w-2xl mx-auto border-none shadow-none">
            <CardHeader>
                <CardTitle>Create New Blog</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="authorName">Author Name</Label>
                            <Input
                                id="authorName"
                                value={formData.authorName}
                                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                                placeholder="e.g. John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="authorRole">Author Role</Label>
                            <Input
                                id="authorRole"
                                value={formData.authorRole}
                                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                                placeholder="e.g. Senior Editor"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="authorProfile">Author Profile Image URL</Label>
                        <Input
                            id="authorProfile"
                            value={formData.authorProfile}
                            onChange={(e) => setFormData({ ...formData, authorProfile: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter blog title"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Categories (comma separated)</Label>
                        <Input
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="TECH, LIFESTYLE"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Cover Image URL</Label>
                        <Input
                            id="image"
                            value={formData.coverImage}
                            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Short Description</Label>
                        <Textarea
                            id="description"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief summary of the blog..."
                            rows={2}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            required
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your blog content here..."
                            className="min-h-[200px]"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={mutation.isPending}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Publish Blog
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};
