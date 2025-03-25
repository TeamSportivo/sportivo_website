import { storage } from '@/lib/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export const fetchImagesFromFolder = async (folderPath: string): Promise<{ [key: string]: string }> => {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);
    
    const imageUrls: { [key: string]: string } = {};
    
    // Get download URLs for all images
    await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item);
        // Extract the filename without extension as the key
        const key = item.name.split('.')[0];
        imageUrls[key] = url;
      })
    );
    
    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from folder:', error);
    throw error;
  }
}; 