import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Play, ChevronDown, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const brands = [
  { name: 'Prime Hydration', image: 'https://via.placeholder.com/48?text=PH' },
  { name: 'Gymshark', image: 'https://via.placeholder.com/48?text=GS' },
  { name: 'MVMT', image: 'https://via.placeholder.com/48?text=MV' },
];

const categories = [
  { name: 'Visual Arts', emoji: '🖼' },
  { name: 'Fashion', emoji: '🛍' },
  { name: 'Technology', emoji: '🖥' },
  { name: 'Culinary', emoji: '🍽' },
  { name: 'Travel', emoji: '🗺' },
];

const videos = [
  { id: 1, thumbnail: '/assets/thumb1.png', category: 'Visual Arts', caption: "Exploring NYC's urban aesthetics. Old meets new in stunning cityscapes. What's your favorite urban view? #UrbanArt #NYCVibes", tiktokUrl: 'https://www.tiktok.com/drinkprime/video/7352922176179146016' },
  { id: 2, thumbnail: '/assets/thumb2.png', category: 'Fashion', caption: "Sustainable fashion is the future! From pineapple leather to ocean plastic, innovative fabrics are changing the game. #SustainableFashion #EcoFriendly", tiktokUrl: 'https://www.tiktok.com/@ladouglass/video/7394902239057333546' },
  { id: 3, thumbnail: '/assets/thumb3.png', category: 'Technology', caption: "Wearable tech is here! Smart rings, AR glasses - the line between tech and fashion blurs. Which gadget would you try? #WearableTech #FutureTech", tiktokUrl: 'https://www.tiktok.com/@mamadontbreak/video/7397821364989693214' },
  { id: 4, thumbnail: '/assets/thumb4.png', category: 'Culinary', caption: "East meets West on a plate! This sushi burger breaks all the rules. What's your favorite fusion dish? #FusionFood #CulinaryInnovation", tiktokUrl: 'https://www.tiktok.com/@nadina_ioana/video/7366324493087690017' },
  { id: 5, thumbnail: '/assets/thumb5.png', category: 'Travel', caption: "Discovered a hidden gem! This secret waterfall feels like a fairytale. Where's your favorite off-the-beaten-path spot? #TravelSecrets #HiddenGems", tiktokUrl: 'https://www.tiktok.com/@dropship/video/7248938514329488667' },
  { id: 6, thumbnail: '/assets/thumb6.png', category: 'Visual Arts', caption: "Digital art revolutionizes creativity! From AI-generated pieces to interactive installations, the future of art is here. Thoughts? #DigitalArt #AIArt", tiktokUrl: 'https://www.tiktok.com/@get_note2self/video/7141209532981611781' },
  { id: 7, thumbnail: '/assets/thumb7.png', category: 'Fashion', caption: "Turning trash into haute couture! This stunning dress is made from plastic bottles. What would you upcycle? #Upcycling #SustainableFashion", tiktokUrl: 'https://www.tiktok.com/drinkprime/video/7352922176179146016' },
];

const generateSubmissions = () => {
  return brands.flatMap(brand => {
    const shuffled = [...videos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8).map(video => ({
      ...video,
      brand: brand.name,
    }));
  });
};

const submissions = generateSubmissions();

const SidePanel = ({ isOpen, onClose, submission }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg z-50 overflow-y-auto transition-transform duration-300 ease-in-out transform"
         style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Video Details</h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="aspect-[9/16] w-full mb-4">
          <iframe
            src={`https://www.tiktok.com/embed/v2/${submission.tiktokUrl.split('/').pop()}`}
            style={{width: '100%', height: '100%'}}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        <h3 className="text-lg font-semibold mb-2">Full Caption</h3>
        <p className="text-base text-gray-800">{submission.caption}</p>
      </div>
    </div>
  );
};

const VideoCard = ({ submission }) => {
  const [showReadMore, setShowReadMore] = useState(false);
  const captionRef = useRef(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (captionRef.current) {
      setShowReadMore(captionRef.current.scrollHeight > captionRef.current.clientHeight);
    }
  }, [submission.caption]);

  const handleVideoClick = () => {
    setIsSheetOpen(true);
  };

  return (
    <Card className="overflow-hidden w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 max-w-xs mx-auto">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <div 
            className="p-3 pb-0"
            onClick={handleVideoClick}
          >
            <div className="aspect-[9/16] bg-gray-100 relative rounded-lg overflow-hidden cursor-pointer">
              <img 
                src={submission.thumbnail} 
                alt={`Thumbnail for video`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-black fill-current" />
                </div>
              </div>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side="right" className="!w-[1200px] !max-w-[100vw] p-0 overflow-y-auto">
          <div className="flex h-full">
            <div className="w-[400px] p-6">
              <div className="bg-gray-200 w-full rounded-lg" style={{ aspectRatio: '9/16' }}>WIP</div>
            </div>
            <div className="w-[400px] p-6">
              <div className="bg-gray-200 w-full rounded-lg" style={{ aspectRatio: '9/16' }}>WIP</div>
            </div>
            <div className="w-[400px] p-6">
              <div className="bg-gray-200 w-full rounded-lg" style={{ aspectRatio: '9/16' }}>WIP</div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="p-3 bg-gray-50">
        <div className="relative">
          <p
            ref={captionRef}
            className="text-sm font-medium text-gray-800 max-h-[3.6em] overflow-hidden text-left"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {submission.caption}
          </p>
          {showReadMore && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-[2.4em] bg-gradient-to-t from-gray-50 to-transparent"
              style={{
                background: 'linear-gradient(to top, rgba(249, 250, 251, 1) 0%, rgba(249, 250, 251, 0.8) 50%, rgba(249, 250, 251, 0) 100%)',
              }}
            ></div>
          )}
        </div>
        {showReadMore && (
          <div className="flex justify-center mt-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-3 py-1 text-xs -mt-5 z-50 font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-0"
              onClick={() => setIsSheetOpen(true)}
            >
              Read more
              <ChevronDown className="ml-1 w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};




const BrandPill = ({ brand, isSelected, onClick }) => (
  <button
    onClick={() => onClick(brand.name)}
    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-base font-medium transition-colors duration-300 ${
      isSelected ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    <img src={brand.image} alt={brand.name} className="w-6 h-6 rounded-lg object-cover" />
    <span>{brand.name}</span>
  </button>
);

const BrandRow = ({ brand, videos }) => (
  <div className="mb-8">
    <div className="flex items-center space-x-3 mb-4">
      <img src={brand.image} alt={brand.name} className="w-8 h-8 rounded-lg object-cover" />
      <h2 className="text-xl font-semibold text-gray-800">{brand.name}</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="w-full">
          <VideoCard submission={video} />
        </div>
      ))}
    </div>
  </div>
);

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const filteredSubmissions = submissions.filter(submission => 
    (!selectedCategory || submission.category === selectedCategory) &&
    (!selectedBrand || submission.brand === selectedBrand)
  );

  const groupedSubmissions = brands.reduce((acc, brand) => {
    acc[brand.name] = filteredSubmissions.filter(sub => sub.brand === brand.name);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <aside className="w-64 bg-white shadow-md p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setSelectedCategory('')}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                selectedCategory === '' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  selectedCategory === category.name ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category.emoji} {category.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-8 rounded-lg p-4 overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            <BrandPill
              brand={{ name: 'All Brands', image: 'https://via.placeholder.com/48?text=All' }}
              isSelected={selectedBrand === ''}
              onClick={() => setSelectedBrand('')}
            />
            {brands.map((brand) => (
              <BrandPill
                key={brand.name}
                brand={brand}
                isSelected={selectedBrand === brand.name}
                onClick={setSelectedBrand}
              />
            ))}
          </div>
        </div>

        {brands.map((brand) => (
          groupedSubmissions[brand.name].length > 0 && (
            <BrandRow key={brand.name} brand={brand} videos={groupedSubmissions[brand.name]} />
          )
        ))}
        {Object.values(groupedSubmissions).every(arr => arr.length === 0) && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">No content found for the selected category and brand.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Homepage;