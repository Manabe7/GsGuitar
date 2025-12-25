import Carousel from "@/components/ui/carousel";
import guitar1 from '../img/gibson-1968-les-paul-custom/gibson-1968-les paul-custom-01.png';
import guitar2 from '../img/gibson-1968-les-paul-custom/gibson-1968-les paul-custom-02.png';
import guitar3 from '../img/gibson-1968-les-paul-custom/gibson-1968-les paul-custom-03.png';
import guitar4 from '../img/gibson-1968-les-paul-custom/gibson-1968-les paul-custom-04.png';    
import guitar5 from '../img/gibson-1968-les-paul-custom/gibson-1968-les paul-custom-05.png';
interface CarouselProps {
        src: string;
    }
    const slideData: CarouselProps[] = [
    {
      src: guitar1,
    },
    {
      src: guitar2,
    },
    {
      src: guitar3,
    },
    {
      src: guitar4,
    },
    {
        src: guitar5,
    }
  ];
export function CarouselDemo() {
    
    return (
        <div>
            <div className="relative overflow-hidden w-full h-full py-20">
            <Carousel slides={slideData} />
            </div>
        </div>
    );
}

export default slideData;
