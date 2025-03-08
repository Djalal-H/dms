"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function DocumentCreationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState(null);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    console.log("Uploaded File:", file);
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>Document Creation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="file">Upload File</Label>
            <Input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Document
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
