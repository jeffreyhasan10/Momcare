
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

/**
 * Upload a file to Supabase storage
 * @param file The file to upload
 * @param bucket The bucket to upload to
 * @param path Optional path within the bucket
 * @returns The file URL if successful, null otherwise
 */
export async function uploadToStorage(file: File, bucket: string, path: string = "") {
  try {
    if (!file) return null;
    
    // Generate a unique file name to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }

    // Get public URL for the file
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
    
    return publicUrl;
  } catch (error: any) {
    console.error('Error in uploadToStorage:', error);
    toast({
      title: 'Upload failed',
      description: error.message || 'An unknown error occurred',
      variant: 'destructive',
    });
    return null;
  }
}

/**
 * Delete a file from Supabase storage
 * @param bucket The storage bucket
 * @param path The file path to delete
 * @returns true if successful, false otherwise
 */
export async function deleteFromStorage(bucket: string, path: string) {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      console.error('Error deleting file:', error);
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
    
    return true;
  } catch (error: any) {
    console.error('Error in deleteFromStorage:', error);
    toast({
      title: 'Delete failed',
      description: error.message || 'An unknown error occurred',
      variant: 'destructive',
    });
    return false;
  }
}
