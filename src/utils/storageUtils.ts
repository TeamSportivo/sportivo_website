
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

// Function to fetch images from a specific folder in Firebase Storage
export const fetchImagesFromFolder = async (folderPath: string): Promise<{src: string; alt: string; category?: string}[]> => {
  try {
    const storageRef = ref(storage, folderPath);
    const result = await listAll(storageRef);
    
    const imagePromises = result.items.map(async (item) => {
      const url = await getDownloadURL(item);
      // Extract file name to use as alt text
      const fileName = item.name.split('.')[0];
      // Extract category from path if it exists
      const pathParts = item.fullPath.split('/');
      const category = pathParts.length > 1 ? pathParts[pathParts.length - 2] : undefined;
      
      return {
        src: url,
        alt: fileName.replace(/_/g, ' '),
        category
      };
    });
    
    return await Promise.all(imagePromises);
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
