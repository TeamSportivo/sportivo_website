import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { fetchImagesFromFolder } from '@/utils/storageUtils';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<{src: string; alt: string; category: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  
  const categories = ['All', 'Chess', 'Badminton', 'Cricket', 'Football', 'Handball', 'Flash events'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        let fetchedImages = [];
        
        if (activeCategory === 'All') {
          // First, fetch images from the main gallery folder
          const mainGalleryImages = await fetchImagesFromFolder('images/gallery');
          
          // Then fetch images from all category folders
          const categoryPromises = categories
            .filter(cat => cat !== 'All')
            .map(category => fetchImagesFromFolder(`images/gallery/${category.toLowerCase()}`));
          
          const categoryResults = await Promise.all(categoryPromises);
          const categoryImages = categoryResults.flat();
          
          // Combine main gallery images with category images
          fetchedImages = [...mainGalleryImages, ...categoryImages];
        } else {
          // Fetch images from specific category folder
          fetchedImages = await fetchImagesFromFolder(`images/gallery/${activeCategory.toLowerCase()}`);
        }
        
        // Add category to each image if not already present
        const processedImages = fetchedImages.map(img => ({
          ...img,
          category: img.category || activeCategory
        }));
        
        setImages(processedImages);
      } catch (error) {
        console.error("Failed to load gallery images:", error);
        toast.error("Failed to load images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
    setShowAll(false); // Reset showAll when category changes
  }, [activeCategory]); // Reload images when category changes
  
  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category.toLowerCase() === activeCategory.toLowerCase());

  const displayedImages = showAll ? filteredImages : filteredImages.slice(0, 8);

  return (
    <div className="pt-20">
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-8">Our Gallery</h1>
          <p className="text-base md:text-lg text-gray-600 text-center max-w-2xl mx-auto mb-8 md:mb-12">
            Capturing the moments of dedication, triumph, and teamwork that define Team Sportivo.
          </p>
          
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="w-full overflow-x-auto pb-4 -mx-2 sm:-mx-4 px-2 sm:px-4">
              <ToggleGroup 
                type="single" 
                value={activeCategory} 
                onValueChange={(value) => value && setActiveCategory(value)}
                className="flex flex-nowrap justify-start md:justify-center gap-2 min-w-max"
              >
                {categories.map((category) => (
                  <ToggleGroupItem 
                    key={category} 
                    value={category} 
                    variant="outline" 
                    className="px-3 md:px-4 py-2 rounded-full whitespace-nowrap text-sm md:text-base"
                  >
                    {category}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
                {displayedImages.map((image, index) => (
                  <div 
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer relative group"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {filteredImages.length > 8 && !showAll && (
                <div className="flex justify-center mt-8 md:mt-12">
                  <Button 
                    variant="outline" 
                    className="group text-sm md:text-base"
                    onClick={() => setShowAll(true)}
                  >
                    View All Images
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </Button>
                </div>
              )}

              {showAll && filteredImages.length > 8 && (
                <div className="flex justify-center mt-8 md:mt-12">
                  <Button 
                    variant="outline" 
                    className="group text-sm md:text-base"
                    onClick={() => setShowAll(false)}
                  >
                    Show Less
                    <ChevronDown className="ml-2 h-4 w-4 rotate-180 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </div>
              )}
            </>
          )}
          
          {filteredImages.length === 0 && !loading && (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-500 text-base md:text-lg">No images found for this category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4" onClick={() => setSelectedImage(null)}>
          <button 
            className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white hover:text-gray-300 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X size={24} className="md:w-8 md:h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged view"
            className="max-h-[85vh] max-w-[95vw] md:max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
